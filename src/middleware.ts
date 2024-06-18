import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const pathname = request.nextUrl.pathname

  if (pathname.includes('/auth') && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (pathname === '/app' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/login')))
  }

  if (pathname === '/pesquisa' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/login')))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
