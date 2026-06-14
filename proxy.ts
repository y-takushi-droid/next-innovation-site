import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const [user, pwd] = atob(authHeader.split(' ')[1]).split(':');
      const adminPassword = process.env.ADMIN_PASSWORD || 'nextinnovation2024';
      if (user === 'admin' && pwd === adminPassword) {
        return NextResponse.next();
      }
    }
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: '/admin/:path*' };
