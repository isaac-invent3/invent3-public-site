import { NextRequest, NextResponse } from 'next/server';
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/server/web/spec-extension/cookies';
import { checkPermission } from './app/actions/permissionAction';
import { signOut } from '~/auth';
import { encode, getToken, JWT } from 'next-auth/jwt';

const publicRoutes = ['/', '/forgot-password'];
const protectedGlobalRoute = ['/dashboard', '/profile', '/api/auth/session'];
const SECRET = process.env.NEXTAUTH_SECRET;
export const TOKEN_REFRESH_BUFFER_SECONDS = 300; // 5 minutes
export const SESSION_SECURE =
  process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https://');
export const SESSION_COOKIE = SESSION_SECURE
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';
export const SESSION_TIMEOUT = 1800; // 30 Mins

export function shouldUpdateToken(token: JWT): boolean {
  const timeInSeconds = Math.floor(Date.now() / 1000);
  console.log({
    timeInSeconds,
    buffer: token.accessTokenExpires - TOKEN_REFRESH_BUFFER_SECONDS,
    shouldUpdate:
      timeInSeconds >= token.accessTokenExpires - TOKEN_REFRESH_BUFFER_SECONDS,
  });
  return (
    timeInSeconds >= token.accessTokenExpires - TOKEN_REFRESH_BUFFER_SECONDS
  );
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const timeInSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    apiKey: token.apiKey,
  };
  console.log('updating');
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/Invent3Pro/refresh-tokens',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token.accessToken}`,
          ApiKey: `${token.apiKey}`,
        },
        body: JSON.stringify(payload),
        method: 'POST',
      }
    );

    const newTokens = await response?.json();

    if (!response?.ok) {
      return token;
    }
    return {
      ...token,
      accessToken: newTokens.data.accessToken,
      refreshToken: newTokens.data.refreshToken,
      sessionId: newTokens.data.sessionId,
      accessTokenExpires: timeInSeconds + newTokens.data.expiresIn,
      exp: timeInSeconds + newTokens.data.expiresIn,
      error: '',
    };
  } catch (e) {
    console.error(e);
  }

  return token;
}

async function handleSignOut(request: NextRequest, response: NextResponse) {
  await signOut({ redirect: false });
  response = NextResponse.redirect(
    new URL(`/?ref=${request.nextUrl.pathname}`, request.url)
  );
  response.cookies.delete('permissionData');
  return response;
}

export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse
): NextResponse<unknown> {
  console.log('updating cookies');
  /*
   * BASIC IDEA:
   *
   * 1. Set request cookies for the incoming getServerSession to read new session
   * 2. Updated request cookie can only be passed to server if it's passed down here after setting its updates
   * 3. Set response cookies to send back to browser
   */

  if (sessionToken) {
    request.cookies.set(SESSION_COOKIE, sessionToken);
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: 'lax',
    });
    console.log('cookies updated');
  } else {
    console.log('signout called');
    handleSignOut(request, response);
  }

  return response;
}
/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
function applySetCookie(req: NextRequest, res: NextResponse) {
  console.log('applying set cookie');
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers);

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const session = await auth();
  let response = NextResponse.next();

  if (!SECRET) return await handleSignOut(request, response);

  const token = await getToken({
    req: request,
    cookieName: SESSION_COOKIE,
    secret: SECRET,
    salt: SESSION_COOKIE,
  });

  if (token) {
    if (shouldUpdateToken(token)) {
      try {
        const refreshedToken = await refreshAccessToken(token);
        if (token === refreshedToken) {
          console.error('Error refreshing token');
          return updateCookie(null, request, response);
        }

        const newSessionToken = await encode({
          secret: SECRET,
          token: refreshedToken,
          maxAge: SESSION_TIMEOUT,
          salt: SESSION_COOKIE,
        });

        response = updateCookie(newSessionToken, request, response);
      } catch (error) {
        console.error('Error refreshing token: ', error);

        return updateCookie(null, request, response);
      }
    }

    applySetCookie(request, response);

    // Don't check permission for protected global route
    if (protectedGlobalRoute.includes(pathname)) {
      return NextResponse.next();
    }

    const permissionData = await checkPermission({ path: pathname });

    // if (!permissionData) {
    //   return NextResponse.rewrite(new URL('/404', request.url));
    // }
    response.cookies.set(
      'permissionData',
      JSON.stringify(permissionData?.permissionKeys)
    );

    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
    return response;
  }

  if (publicRoutes.includes(pathname)) {
    return response;
  }
  return NextResponse.redirect(
    new URL(`/?ref=${request.nextUrl.pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};
