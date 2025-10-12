// middleware.ts
export { auth as middleware } from "./libs/auth";

// Run middleware on all routes except static/assets
export const config = {
    matcher: ["/dashboard/:path*",],
};
