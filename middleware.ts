import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const { pathname } = request.nextUrl;

  // Check if trying to access admin pages
  const isAdminPath = pathname.startsWith('/admin');
  
  // Allow login page (to avoid redirect loop)
  const isLoginPage = pathname === '/admin/login';

  // If not authenticated and trying to access admin
  if (isAdminPath && !token && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page, redirect to admin
  if (isLoginPage && token) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
