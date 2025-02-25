import { NextRequest, NextResponse } from 'next/server';
import { checkPermission } from './app/actions/permissionAction';
import { auth, signOut } from '~/auth';

const publicRoutes = ['/', '/forgot-password'];
const protectedGlobalRoute = ['/dashboard', '/profile', '/api/auth/session'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();
  console.log({ middleware: session });
  let response = NextResponse.next();

  if (session?.error) {
    await signOut({ redirect: false });
    response = NextResponse.redirect(
      new URL(`/?ref=${request.nextUrl.pathname}`, request.url)
    );
    response.cookies.delete('permissionData');
    return response;
  }

  if (session) {
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
