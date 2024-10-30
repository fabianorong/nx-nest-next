import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to /auth/signin and all static assets
  if (
    pathname.startsWith('/auth/signin') || // Allow /auth/signin
    pathname.startsWith('/auth/signup') || // Allow /auth/signin
    pathname.startsWith('/_next') || // Allow Next.js assets
    pathname.startsWith('/static') || // Allow custom static assets
    pathname.startsWith('/favicon.ico') // Allow favicon
  ) {
    return NextResponse.next();
  }

  const session = await getSession();

  // Redirect to /auth/signin if not logged in
  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  return NextResponse.next();
}

// Protect all routes except /auth/signin and static assets
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|auth/signin|auth/signup).*)'],
};
