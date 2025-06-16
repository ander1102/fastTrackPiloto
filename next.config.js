/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  async rewrites() {
    return {
      fallback: [{ source: "/:path*", destination: "/_404/:path*" }],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Max-Age",
            value: "240",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value:
              "require-corp; report-to='https://test-admin.efevoopay.com/';",
          },
          {
            key: "Cross-Origin-Embedder-Policy-Report-Only",
            value:
              "require-corp; report-to='https://test-admin.efevoopay.com/';",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value:
              "same-origin; report-to='https://test-admin.efevoopay.com/';",
          },
          {
            key: "Cross-Origin-Opener-Policy-Report-Only",
            value:
              "same-origin; report-to='https://test-admin.efevoopay.com/';",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin;",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' 'unsafe-inline' https: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss:; script-src-elem 'self' 'unsafe-inline' https: wss:; script-src-attr 'self' 'unsafe-inline' https: wss:; style-src 'self' 'unsafe-inline' https: wss:; style-src-elem * 'unsafe-inline' https: wss:; style-src-attr 'self' 'unsafe-inline' https: wss:; img-src 'self' data: https: wss:; font-src 'self' data: https: wss:; connect-src 'self' https: wss:; media-src 'self'; object-src 'none'; child-src 'self' https: wss: data:; frame-src 'self' https: wss: data:; worker-src *; frame-ancestors 'self' https: wss: data:; form-action 'self' https: wss:; upgrade-insecure-requests; block-all-mixed-content; base-uri 'self' https: wss:; manifest-src 'self';",
          },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(), accelerometer=(self), ambient-light-sensor=(self), autoplay=(), battery=(), camera=(), cross-origin-isolated=(self), display-capture=(self), document-domain=(self), encrypted-media=(self), execution-while-not-rendered=(self), execution-while-out-of-viewport=(self), fullscreen=(self), gyroscope=(), keyboard-map=(self), magnetometer=(), microphone=(), midi=(), navigation-override=(self), payment=(self), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(self), sync-xhr=(self), usb=(), web-share=(self), xr-spatial-tracking=(self), clipboard-read=(self), clipboard-write=(self), gamepad=(), speaker-selection=(), conversion-measurement=(self), focus-without-user-activation=(self), hid=(self), idle-detection=(self), interest-cohort=(self), serial=(self), sync-script=(self), trust-token-redemption=(self), window-placement=(self), vertical-scroll=(self)",
          },
          {
            key: "Max-Forwards",
            value: "10",
          },
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "ETag",
            value: "",
          },
          {
            key: "Set-Cookie",
            value:
              "__Secure-=ksvN3P52XKvuGVXVqhp9JPZPp3tmAG3Ks5LFdNYN4jUFLJn6yBCy5DcSW5Xg4cc3; max-age=10800; SameSite=Lax; Secure; HttpOnly",
          },
          {
            key: "Expect-CT",
            value:
              "enforce, max-age=300, report-uri='https://test-admin.efevoopay.com/'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
