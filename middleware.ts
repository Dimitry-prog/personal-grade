import { NextRequest, NextResponse } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';

import { auth } from '@/lib/auth';
import {
  apiPrefix,
  authRoutes,
  locales,
  loginRedirect,
  publicPathnameRegex,
} from '@/lib/constants';

const I18nMiddleware = createI18nMiddleware({
  locales: locales,
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);
  const isAuthPage = authRoutes.includes(request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith(apiPrefix)) {
    return I18nMiddleware(request);
  }

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL(loginRedirect, request.nextUrl));
    }
    return I18nMiddleware(request);
  }

  if (!session && !isPublicPage) {
    return NextResponse.redirect(new URL(`/auth/login`, request.nextUrl));
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
