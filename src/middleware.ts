import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  // List of paths that don't require authentication
  const publicPaths = [
    '/', 
    '/login', 
    '/signup', 
    '/api/auth/login', 
    '/api/auth/signup',
    '/api/test',
    '/book',
    '/track',
    '/pricing',
    '/about',
    '/contact'
  ];

  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // For client-side requests to protected routes, we'll handle auth in the component
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401 }
    );
  }

  try {
    const verifiedToken = await verifyAuth(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user', JSON.stringify(verifiedToken));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401 }
    );
  }
} 