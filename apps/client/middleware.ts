import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';
// import { doesRoleHaveAccessToURL } from './lib/utils/roleAccess';
import { UserPermission } from './types/next-auth';

const publicRoutes = ['/', '/forgot-password'];

// @ts-ignore
export default auth((request: NextRequest) => {
  // @ts-ignore
  const { auth } = request as {
    auth: { user: { role: string; roleRoutePermissions: UserPermission[] } };
  };
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!auth;
  if (isLoggedIn) {
    // if (
    //   !doesRoleHaveAccessToURL(auth.user.roleRoutePermissions ?? [], pathname)
    // ) {
    //   return NextResponse.rewrite(new URL('/404', request.url));
    // }
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(
    new URL(`/?ref=${request.nextUrl.pathname}`, request.url)
  );
});

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
  ],
};
