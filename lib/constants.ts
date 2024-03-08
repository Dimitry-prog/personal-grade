export const locales = ['en', 'ru'];

export const publicRoutes = ['/', '/info', '/contacts', '/auth/login', '/auth/register'];

export const publicPathnameRegex = RegExp(
  `^(/(${locales.join('|')}))?(${publicRoutes.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
  'i'
);
