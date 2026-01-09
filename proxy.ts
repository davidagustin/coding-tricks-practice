import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Security proxy that adds Content Security Policy and other security headers
 * to protect against XSS, clickjacking, and other common web vulnerabilities.
 *
 * Note: Monaco Editor requires 'unsafe-eval' and 'unsafe-inline' to function.
 * This is a known limitation of the editor's architecture.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy
  // Monaco Editor requires unsafe-eval and unsafe-inline for its TypeScript/JavaScript features
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Monaco
    "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind and Monaco
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'", // Prevent clickjacking
    "base-uri 'self'",
    "form-action 'self'",
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable unnecessary browser features
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=()'
  );

  // XSS Protection (legacy but still useful for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Strict Transport Security (HSTS) - enforce HTTPS
  // Only enable in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

// Apply proxy to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
