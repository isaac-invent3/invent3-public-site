import { NextRequest, NextResponse } from 'next/server';
import { checkPermission } from './app/actions/permissionAction';
import { encode, getToken, JWT } from 'next-auth/jwt';
import { ROLE_IDS_ENUM } from './lib/utils/constants';
import { validateTenant } from './app/actions/validateTenantAction';

const publicRoutes = [
  '/',
  '/signin',
  '/forgot-password',
  '/about-us',
  '/contact-us',
  '/faq',
  '/features',
  '/leadership-team',
  '/sectors',
  '/the-invent3-advantage',
  '/how-we-work',
  '/solutions',
  '/built-for-all-industries',
  '/blog',
];
const protectedGlobalRoute = ['/dashboard'];
const protectedSuperAdminRoute = [''];
const protectedCMFAndClientAdminRoute = ['/facility-management'];

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

export async function refreshAccessToken(
  token: JWT,
  subdomain: string | null | undefined
): Promise<JWT> {
  const timeInSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    apiKey: token.apiKey,
  };
  console.log('updating');
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/api/Invent3Pro/refresh-tokens',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token.accessToken}`,
          ApiKey: `${token.apiKey}`,
          ...(subdomain ? { 'X-Tenant-ID': subdomain } : {}),
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

function signOut(request: NextRequest): NextResponse {
  console.log('signing out');

  const url = new URL('/signin', request.url);
  url.searchParams.set('ref', request.nextUrl.pathname);

  const response = NextResponse.redirect(url);

  // Clear auth/session cookies
  response.cookies.set(SESSION_COOKIE, '', {
    maxAge: 0,
    path: '/',
  });
  response.cookies.set('permissionData', '', {
    maxAge: 0,
    path: '/',
  });

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
    return response;
  }

  return signOut(request);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();
  const mainHost = request.nextUrl.host,
    currentHost = request.headers.get('host');
  const subdomain = currentHost?.split('.')[0];
  const hasSubdomain = mainHost !== currentHost ? subdomain : null;

  // Extract tenant from the first segment of the path
  const segments = pathname.split('/').filter(Boolean); // Remove empty parts

  const tenant = segments[0]; // First segment is the tenant name

  // Checks if tenant name is valid (Subdomain Approach)
  // if (hasSubdomain && subdomain) {
  //   const tenantData = await validateTenant({ tenantName: subdomain });

  //   if (!tenantData) {
  //     return NextResponse.rewrite(new URL('/404', request.url));
  //   }
  // }

  // Checks if tenant name is valid (relative path approach)
  const tenantData = await validateTenant({ tenantName: tenant });

  const remainingPath = segments.slice(1).join('/');

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
        const refreshedToken = await refreshAccessToken(
          token,
          // hasSubdomain ? subdomain : null
          tenantData ? tenant : null
        );
        if (refreshedToken.accessToken === token.accessToken) {
          console.error('Error refreshing token – tokens unchanged');
          return updateCookie(null, request, response);
        }

        const newSessionToken = await encode({
          secret: SECRET,
          token: refreshedToken,
          maxAge: SESSION_TIMEOUT,
          salt: SESSION_COOKIE,
        });

        return updateCookie(newSessionToken, request, response);
      } catch (error) {
        console.error('Error refreshing token: ', error);
        return updateCookie(null, request, response);
      }
    }

    // Redirect to tenant if token has a different tenant. Note: This is for only the relative path approach
    if (token.companySlug && token.companySlug !== tenant) {
      const url = new URL(`/${token.companySlug}/${pathname}`, request.url);
      url.search = request.nextUrl.search; // Preserve query string
      return NextResponse.redirect(url);
    }

    const checkPath = tenantData ? `/${remainingPath}` : pathname;

    // Don't check permission for protected global route or super admin route if the user is a super admin
    const formattedPath = `/${checkPath.split('/')?.[1] as string}`;
    if (
      protectedGlobalRoute.includes(formattedPath) ||
      (protectedSuperAdminRoute.includes(formattedPath) &&
        token.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) &&
        ((protectedCMFAndClientAdminRoute.includes(formattedPath) &&
          token.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN)) ||
          token.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)))
    ) {
      if (tenantData) {
        return NextResponse.rewrite(new URL(`${checkPath}`, request.url));
      }
      return NextResponse.next();
    }

    // Redirect to Dashboard for public routes
    if (publicRoutes.includes(checkPath)) {
      if (tenantData) {
        return NextResponse.redirect(
          new URL(`/${tenant}/dashboard`, request.url)
        );
      }
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }

    const permissionData = await checkPermission({ path: checkPath });
    if (
      !permissionData &&
      !(
        token.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) ||
        token.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
      )
    ) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Decide which response to return
    const responseToReturn = tenantData
      ? NextResponse.rewrite(new URL(`${checkPath}`, request.url))
      : NextResponse.next();

    // Set cookies on the correct response
    responseToReturn.cookies.set(
      'permissionData',
      JSON.stringify(permissionData?.permissionKeys)
    );

    return responseToReturn;
  }
  if (!token) {
    const checkPath = tenantData ? `/${remainingPath}` : pathname;
    const requestedPath = `/${checkPath.split('/')?.[1] as string}`;

    const allRoutes = [
      ...publicRoutes,
      ...protectedGlobalRoute,
      ...protectedSuperAdminRoute,
      '/dashboard',
      '/approval-flow',
      '/asset-management',
      '/maintenance',
      '/task-management',
      '/ticket-management',
      '/template-management',
      '/report-analytics',
      '/role-management',
      '/user-management',
      '/vendor-management',
      '/log-management',
      '/company-management',
      '/compliance',
      '/feedback',
      '/facility-management',
    ];

    if (tenantData) {
      if (remainingPath === 'signin') {
        const url = new URL(`/signin`, request.url);
        // Preserve original query parameters
        request.nextUrl.searchParams.forEach((value, key) => {
          url.searchParams.set(key, value);
        });
        return NextResponse.rewrite(url);
      }
    }

    // If public route, allow access
    if (publicRoutes.includes(requestedPath)) {
      return response;
    }

    // If route does not exist, return 404
    if (!allRoutes.includes(requestedPath)) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // If protected page, redirect to signin with ref (respect tenant)
    const redirectPath = tenantData ? `/${tenant}/signin` : `/signin`;
    const url = new URL(redirectPath, request.url);
    const actualPath = tenantData ? remainingPath : pathname;
    url.searchParams.set('ref', actualPath);
    // Preserve original query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    '/((?!api/|_next/|__next|_static/|_vercel|fonts/|[\\w-]+\\.\\w+).*)',
    '/',
    '/signin',
    '/forgot-password',
    '/dashboard/:path*',
    '/approval-flow/:path*',
    '/asset-management/:path*',
    '/maintenance/:path*',
    '/task-management/:path*',
    '/ticket-management/:path*',
    '/template-management/:path*',
    '/report-analytics/:path*',
    '/role-management/:path*',
    '/user-management/:path*',
    '/vendor-management/:path*',
    '/log-management/:path*',
    '/company-management/:path*',
    '/compliance/:path*',
    '/feedback/:path*',
    '/report-analytics/:path*',
    '/facility-management/:path*',
  ],
};
