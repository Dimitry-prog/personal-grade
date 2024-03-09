export const locales = ['en', 'ru'];

export const publicRoutes = [
  '/',
  '/info',
  '/contacts',
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/api/auth',
];

export const authRoutes = ['/auth/login', '/auth/register'];

export const apiPrefix = '/api/auth';

export const publicPathnameRegex = RegExp(
  `^(/(${locales.join('|')}))?(${publicRoutes.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
  'i'
);

export const loginRedirect = '/profile';
