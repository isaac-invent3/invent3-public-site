import { NextRequest, NextResponse } from 'next/server';
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

const SECRET = process.env.NEXTAUTH_SECRET;
export const TOKEN_REFRESH_BUFFER_SECONDS = 60; // 5 minutes
export const SESSION_SECURE =
  process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https://');
export const SESSION_COOKIE = SESSION_SECURE
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';
export const SESSION_TIMEOUT = 1800; // 30 Mins

function isSigninPath(pathname: string): boolean {
  // Matches `/signin` and `/tenant-name/signin`
  return /\/signin$/.test(pathname);
}

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

export function signOut(
  request: NextRequest,
  tenantName: string | undefined
): NextResponse {
  console.log('Signing out');

  const pathname = request.nextUrl.pathname;
  const redirectPath = tenantName ? `/${tenantName}/signin` : `/signin`;
  const url = new URL(redirectPath, request.url);

  // Prevent redirect loop when already on /signin
  if (isSigninPath(pathname) || request.nextUrl.searchParams.has('ref')) {
    return NextResponse.next();
  }

  // Encode the ref (path + search)
  const segments = pathname.split('/').filter(Boolean);
  const remainingPath = segments.slice(1).join('/');
  const actualPath = tenantName ? remainingPath : pathname;

  let refValue = actualPath;
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  if ([...searchParams].length > 0) {
    refValue += `?${searchParams.toString()}`;
  }
  url.searchParams.set('ref', encodeURIComponent(refValue));

  return clearCookiesAndRedirect(request, url);
}

export function forceSignOut(
  request: NextRequest,
  tenantName: string | undefined
): NextResponse {
  console.log('Force signing out');
  const redirectPath = tenantName ? `/${tenantName}/signin` : `/signin`;
  const url = new URL(redirectPath, request.url);
  return clearCookiesAndRedirect(request, url);
}

function clearCookiesAndRedirect(request: NextRequest, url: URL): NextResponse {
  request.cookies.delete(SESSION_COOKIE);

  const response = NextResponse.redirect(url);
  response.cookies.set(SESSION_COOKIE, '', {
    value: '',
    maxAge: -1,
    path: '/',
  });
  response.cookies.set('permissionData', '', {
    value: '',
    maxAge: -1,
    path: '/',
  });
  request.cookies.delete(SESSION_COOKIE);
  return response;
}

export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
  tenantName: string | undefined
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
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: 'lax',
    });
    console.log('cookies updated');
    return response;
  }
  request.cookies.delete(SESSION_COOKIE);
  return signOut(request, tenantName);
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

  // Checks if tenant name is valid (Subdomain Approach)
  // if (hasSubdomain && subdomain) {
  //   const tenantData = await validateTenant({ tenantName: subdomain });

  //   if (!tenantData) {
  //     return NextResponse.rewrite(new URL('/404', request.url));
  //   }
  // }

  // Normalize all route paths by removing leading/trailing slashes for comparison
  const normalizedAllRoutes = allRoutes.map((route) =>
    route.replace(/^\/|\/$/g, '')
  );

  // Get first segment from URL (e.g., /demo/dashboard → "demo")
  const tenant = segments[0];

  let tenantData;

  // Only validate if tenant is NOT part of the routes
  if (tenant && !normalizedAllRoutes.includes(tenant)) {
    tenantData = await validateTenant({ tenantName: tenant });
  }

  const remainingPath = segments.slice(1).join('/');

  if (!SECRET) return signOut(request, undefined);

  const token = await getToken({
    req: request,
    cookieName: SESSION_COOKIE,
    secret: SECRET,
    salt: SESSION_COOKIE,
  });

  let currentToken = token;

  const tenantName = currentToken?.companySlug || undefined;

  if (isSigninPath(pathname) || request.nextUrl.searchParams.has('ref')) {
    const isTenantValid =
      pathname === '/signin' ||
      tenant === tenantName || // Matches logged-in user's tenant
      Boolean(tenantData); // Found in DB

    if (isTenantValid) {
      return NextResponse.rewrite(new URL('/signin', request.url));
    } else {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  if (currentToken) {
    // Used to sign user out on client side failed refresh token
    if (currentToken?.error === 'RefreshAccessTokenError') {
      console.warn('Token refresh previously failed – forcing signout');
      return forceSignOut(request, tenantName);
    }

    if (shouldUpdateToken(currentToken)) {
      try {
        const refreshedToken = await refreshAccessToken(
          currentToken,
          tenantName
        );
        if (refreshedToken.accessToken === currentToken.accessToken) {
          console.error('Error refreshing token – tokens unchanged');
          return signOut(request, tenantName);
        }

        const newSessionToken = await encode({
          secret: SECRET,
          token: refreshedToken,
          maxAge: SESSION_TIMEOUT,
          salt: SESSION_COOKIE,
        });

        currentToken = refreshedToken;

        const checkPath =
          tenantName && tenant && !normalizedAllRoutes.includes(tenant)
            ? `/${tenantName}/${remainingPath}`
            : pathname;
        const url = new URL(checkPath, request.url); // e.g. /dashboard or /demo/dashboard

        url.search = request.nextUrl.search; // retain ?view=client_admin

        const newResponse = NextResponse.redirect(url);
        updateCookie(newSessionToken, request, newResponse, tenantName);
        request.cookies.set(SESSION_COOKIE, newSessionToken);

        return newResponse;
      } catch (error) {
        console.error('Error refreshing token: ', error);
        return signOut(request, tenantName);
      }
    }
    const checkPath =
      tenantName && tenant && !normalizedAllRoutes.includes(tenant)
        ? `/${remainingPath}`
        : pathname;

    // Don't check permission for protected global route or super admin route if the user is a super admin
    const formattedPath = `/${checkPath.split('/')?.[1] as string}`;

    // Redirect to tenant if token has a different tenant. Note: This is for only the relative path approach
    if (tenantName && tenantName !== tenant) {
      const url = new URL(
        `/${currentToken.companySlug}/${pathname}`,
        request.url
      );
      url.search = request.nextUrl.search; // Preserve query string
      return NextResponse.redirect(url);
    }

    if (
      protectedGlobalRoute.includes(formattedPath) ||
      (protectedSuperAdminRoute.includes(formattedPath) &&
        currentToken.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) &&
        ((protectedCMFAndClientAdminRoute.includes(formattedPath) &&
          currentToken.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN)) ||
          currentToken.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)))
    ) {
      if (tenantName) {
        return NextResponse.rewrite(new URL(`${checkPath}`, request.url));
      }
      return NextResponse.next();
    }
    // // If protected page, redirect to signin with ref (respect tenant)
    // const signoutPath = tenantName ? `/${tenantName}/signin` : `/signin`;

    // // Stop redirect loop
    // if (pathname.endsWith('/signin')) {
    //   return NextResponse.next();
    // }

    // Redirect to Dashboard for public routes
    if (publicRoutes.includes(checkPath)) {
      if (tenantData) {
        return NextResponse.redirect(
          new URL(`/${tenantName}/dashboard`, request.url)
        );
      }
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }

    // Check User Permission
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/check-permission`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: checkPath,
          accessToken: currentToken.accessToken,
          apiKey: currentToken.apiKey,
          companySlug: currentToken.companySlug,
          accessibleRoutes: currentToken.roleSystemModuleContextPermissions,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    const { hasPermission, permissionKeys } = await res.json();

    if (
      !hasPermission &&
      !(
        currentToken.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) ||
        currentToken.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
      )
    ) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Decide which response to return
    const responseToReturn = tenantName
      ? NextResponse.rewrite(new URL(`${checkPath}`, request.url))
      : NextResponse.next();

    // Set cookies on the correct response
    responseToReturn.cookies.set(
      'permissionData',
      JSON.stringify(permissionKeys)
    );

    return responseToReturn;
  }

  if (!currentToken) {
    const checkPath = tenantData ? `/${remainingPath}` : pathname;
    const requestedPath = `/${checkPath.split('/')?.[1] as string}`;

    if (tenantData) {
      if (remainingPath === '' || remainingPath === '/') {
        return NextResponse.redirect(new URL(`/${tenant}/signin`, request.url));
      }
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

    // Build the ref value: actualPath + search params
    let refValue = actualPath;
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);
    if ([...searchParams].length > 0) {
      refValue += `?${searchParams.toString()}`;
    }

    // Encode the ref value
    url.searchParams.set('ref', encodeURIComponent(refValue));

    // Preserve original query parameters (except ref)
    // request.nextUrl.searchParams.forEach((value, key) => {
    //   if (key !== 'ref') url.searchParams.set(key, value);
    // });

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    '/((?!api/|_next/|__next|_static/|_vercel|fonts/|\\.well-known/|[\\w-]+\\.\\w+).*)',
    '/',
    // '/signin',
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
