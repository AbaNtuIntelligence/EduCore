import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const { pathname } = request.nextUrl;

  // Admin routes that need protection
  const isAdminPath = pathname.startsWith('/admin');
  
  // Allow login page (to avoid redirect loop)
  const isLoginPage = pathname === '/admin/login';
  
  // Allow API auth routes
  const isAuthApi = pathname.startsWith('/api/auth');

  // If not authenticated and trying to access admin (except login page)
  if (isAdminPath && !token && !isLoginPage && !isAuthApi) {
    console.log('🔒 Redirecting to login - No token found');
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page, redirect to admin
  if (isLoginPage && token) {
    console.log('✅ Already authenticated, redirecting to admin');
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  // If authenticated but trying to access admin API without token
  if (isAdminPath && !token && isAuthApi) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
