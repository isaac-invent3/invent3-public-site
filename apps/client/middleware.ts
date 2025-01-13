import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/forgot-password'];

// @ts-ignore
export default auth((request: NextRequest) => {
  // @ts-ignore
  const { auth } = request;
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!auth;
  if (isLoggedIn) {
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
  matcher: ['/', '/forgot-password', `/dashboard`, `/asset-management/:path*`],
};
