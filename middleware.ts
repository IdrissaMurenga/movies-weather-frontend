// middleware.ts
export { auth as middleware } from "./libs/auth";

// Run middleware on all routes except static/assets
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
