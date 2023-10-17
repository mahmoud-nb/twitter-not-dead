import createMiddleware from 'next-intl/middleware';

export const defaultLocale = 'en'
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale
});
 
export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};