import { NextRequest, NextResponse } from 'next/server';
import { checkPermission } from './app/actions/permissionAction';
import { encode, getToken, JWT } from 'next-auth/jwt';

const publicRoutes = ['/', '/signin', '/forgot-password'];
const protectedGlobalRoute = ['/dashboard', '/profile', '/user-settings'];
const SECRET = process.env.NEXTAUTH_SECRET;
export const TOKEN_REFRESH_BUFFER_SECONDS = 60; // 5 minutes
export const SESSION_SECURE =
  process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https://');
export const SESSION_COOKIE = SESSION_SECURE
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';
export const SESSION_TIMEOUT = 1800; // 30 Mins

export function shouldUpdateToken(token: JWT): boolean {
  const timeInSeconds = Math.floor(Date.now() / 1000);
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

function signOut(request: NextRequest) {
  console.log('signing out');
  request.cookies.delete(SESSION_COOKIE);
  request.cookies.delete('permissionData');
  const response = NextResponse.redirect(
    new URL(`/?ref=${request.nextUrl.pathname}`, request?.url)
  );
  response.cookies.delete(SESSION_COOKIE);
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
    signOut(request);
  }

  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  if (!SECRET) return signOut(request);

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

    // applySetCookie(request, response);

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
  matcher: ['/((?!api/|_next/|_static/|_vercel|fonts/|[\\w-]+\\.\\w+).*)'],
};
