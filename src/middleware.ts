import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // If the user is trying to access any admin page other than the login page
  if (pathname.startsWith('/admin/') && pathname !== '/admin') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const session = JSON.parse(sessionCookie.value);
      if (!session.isLoggedIn || session.expires < Date.now()) {
        // Clear the invalid cookie
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.cookies.delete('session');
        return response;
      }
    } catch (error) {
      // If the cookie is malformed, treat as unauthenticated
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  // If the user is logged in, redirect them from the login page to the dashboard
  if (pathname === '/admin' && sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session.isLoggedIn && session.expires >= Date.now()) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      // Malformed cookie, let them proceed to login page to re-authenticate
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
