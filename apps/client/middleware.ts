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

  // If protected page, redirect to signin with ref (respect tenant)
  const signoutPath = tenantName ? `/${tenantName}/signin` : `/signin`;

  // Get full path + query string
  const fullPathWithQuery = request.nextUrl.pathname + request.nextUrl.search;
  const encodedRef = encodeURIComponent(fullPathWithQuery);

  // Prevent redirect loop by NEVER using /signin as ref when already on /signin
  if (request.nextUrl.pathname === signoutPath) {
    return NextResponse.next();
  }

  // Build redirect URL
  const url = new URL(signoutPath, request.url);
  url.searchParams.set('ref', encodedRef);

  // Create redirect response
  const response = NextResponse.redirect(url);

  // Expire cookies
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

  const tenantName = tenantData ? tenant : undefined;

  if (!SECRET) return signOut(request, tenantName);

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
          return updateCookie(null, request, response, tenantName);
        }

        const newSessionToken = await encode({
          secret: SECRET,
          token: refreshedToken,
          maxAge: SESSION_TIMEOUT,
          salt: SESSION_COOKIE,
        });

        return updateCookie(newSessionToken, request, response, tenantName);
      } catch (error) {
        console.error('Error refreshing token: ', error);
        return updateCookie(null, request, response, tenantName);
      }
    }
    const checkPath = tenantData ? `/${remainingPath}` : pathname;

    // Don't check permission for protected global route or super admin route if the user is a super admin
    const formattedPath = `/${checkPath.split('/')?.[1] as string}`;

    // Redirect to tenant if token has a different tenant. Note: This is for only the relative path approach
    if (
      token.companySlug &&
      token.companySlug !== tenant &&
      formattedPath !== '/signin'
    ) {
      const url = new URL(`/${token.companySlug}/${pathname}`, request.url);
      url.search = request.nextUrl.search; // Preserve query string
      return NextResponse.redirect(url);
    }

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
    // If protected page, redirect to signin with ref (respect tenant)
    const signoutPath = tenantName ? `/${tenantName}/signin` : `/signin`;

    // Stop redirect loop
    if (formattedPath === '/signin') {
      const url = new URL(signoutPath, request.url);
      return NextResponse.rewrite(url);
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
    console.log({ permissionData });

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
