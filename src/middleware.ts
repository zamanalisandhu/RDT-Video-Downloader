import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Middleware for Next.js 15
 *
 * Automatically detects and strips unwanted query parameters (e.g., tracking/spam parameter `w`)
 * from incoming requests across all page routes and issues a permanent 301 redirect.
 *
 * Features:
 * - 301 Permanent Redirect for SEO consolidation & duplicate URL prevention.
 * - Preserves pathname, hash, and all other legitimate query parameters.
 * - Ultra-fast zero-allocation bypass when `w` is not present.
 * - Excludes API routes, `_next` static files, images, fonts, and assets via matcher.
 */

// List of unwanted query parameters to remove
const UNWANTED_QUERY_PARAMS = ['w'];

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Fast check: If no unwanted query parameter exists, immediately continue the request
  const hasUnwantedParam = UNWANTED_QUERY_PARAMS.some((param) =>
    searchParams.has(param)
  );

  if (!hasUnwantedParam) {
    return NextResponse.next();
  }

  // Clone URL object to mutate query parameters safely
  const url = request.nextUrl.clone();

  // Remove all unwanted parameters while keeping valid ones intact
  for (const param of UNWANTED_QUERY_PARAMS) {
    url.searchParams.delete(param);
  }

  // 301 Moved Permanently redirect to the cleaned URL
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api (API routes)
     * - _next/static (static assets)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap*.xml
     * - Common static file extensions (.png, .jpg, .svg, .css, .js, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
