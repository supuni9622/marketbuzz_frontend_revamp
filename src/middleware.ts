import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/api/auth/clover/callback']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)

  // Check for auth token in cookies
  const authToken = request.cookies.get('auth-storage')
  const isAuthenticated = authToken && JSON.parse(authToken.value).state.token

  // Handle Clover OAuth callback
  if (pathname === '/api/auth/clover/callback') {
    return NextResponse.next()
  }

  // Redirect to login if accessing protected route without auth
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing login while authenticated
  if (isAuthenticated && pathname === '/login') {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 