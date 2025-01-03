import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const merchantId = searchParams.get('merchant_id')

    if (!code || !merchantId) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // TODO: Exchange code for access token
    // 1. Make request to Clover API to exchange code for token
    // 2. Get merchant information
    // 3. Store token and merchant info in auth store
    // 4. Redirect to dashboard

    // For now, just redirect to dashboard
    // In production, you would:
    // 1. Make API call to Clover
    // 2. Set cookies with auth info
    // 3. Then redirect
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Clover OAuth callback error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
} 