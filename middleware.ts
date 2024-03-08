import { createI18nMiddleware } from 'next-international/middleware';

import { auth } from '@/lib/auth';
import { locales, publicPathnameRegex } from '@/lib/constants';

const I18nMiddleware = createI18nMiddleware({
  locales: locales,
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export const middleware = auth((req) => {
  const isLoggedIn = !!req.auth?.user;

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isLoggedIn) {
    return Response.redirect(new URL('/profile', req.nextUrl));
  } else if (isPublicPage || isLoggedIn) {
    return I18nMiddleware(req);
  } else {
    let callbackUrl = req.nextUrl.pathname;

    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
