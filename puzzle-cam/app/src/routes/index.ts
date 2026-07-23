import { createFileRoute } from '@tanstack/react-router'

import appHtml from '../assets/puzzle-cam.html?raw'

// Puzzle Cam is a self-contained HTML/JS app (camera + MediaPipe Hands).
// It is served verbatim as the home page via a server route handler —
// the same pattern as robots.txt / sitemap.xml.
export const Route = createFileRoute('/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const html = appHtml.replace(
          '</head>',
          `<link rel="canonical" href="${origin}/">\n` +
            `<meta property="og:url" content="${origin}/">\n` +
            '</head>',
        )
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
            // Security headers (aligned with lib/security-headers.server.ts,
            // adjusted for this app: camera access + MediaPipe assets from
            // cdn.jsdelivr.net, wasm execution, Google Fonts).
            'Content-Security-Policy':
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
              "img-src 'self' data: blob: https:; media-src 'self' blob: https:; " +
              "connect-src 'self' https:; worker-src 'self' blob:; " +
              "base-uri 'self'; form-action 'self'",
            'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(self), microphone=(), geolocation=()',
            'X-XSS-Protection': '0',
          },
        })
      },
    },
  },
})
