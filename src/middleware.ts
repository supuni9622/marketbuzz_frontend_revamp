import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = ['/login']

export function middleware(request: NextRequest) {

  // Retrieve the token from cookies or query parameters
  const token = request.cookies.get('accessToken')?.value || request.nextUrl.searchParams.get('token') ||   '';
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  
  // Redirect unauthenticated users trying to access private routes
  if (!token && !isPublicRoute) {
    console.log('Redirecting because isnot public route');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users trying to access public routes
  if (token && isPublicRoute) {
    console.log('Redirecting to / because user is already authenticated');
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 




