import { auth } from '~/auth';
import { NextRequest, NextResponse } from 'next/server';
import { checkPermission } from './app/actions/permissionAction';

const publicRoutes = ['/', '/forgot-password'];
const protectedGlobalRoute = ['/', '/dashboard', '/profile'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  if (session) {
    // Don't check permission for protected global route
    if (protectedGlobalRoute.includes(pathname)) {
      return NextResponse.next();
    }

    const permissionData = await checkPermission({ path: pathname });

    // if (!permissionData) {
    //   return NextResponse.rewrite(new URL('/404', request.url));
    // }
    let response: NextResponse;
    response = NextResponse.next();
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
    return NextResponse.next();
  }
  return NextResponse.redirect(
    new URL(`/?ref=${request.nextUrl.pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/',
    '/forgot-password',
    '/dashboard',
    '/asset-management/:path*',
    '/maintenance/:path*',
    '/task-management/:path*',
    '/ticket-management/:path*',
    '/template-management/:path*',
    '/profile/:path*',
    '/report-analytics/:path*',
    '/role-management/:path*',
    '/user-management/:path*',
    '/vendor-management/:path*',
    '/log-management/:path*',
  ],
};
