import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text(); // pass through raw body

        const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL; // prefer server-only

        if (!API_URL) {
            return new Response(
                JSON.stringify({ errors: [{ message: "API_URL not set" }] }),
                { status: 500, headers: { "content-type": "application/json" } },
            );
        }

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                // forward Authorization header if your UI adds one (optional)
                authorization: req.headers.get("authorization") ?? "",
            },
            body,
            cache: "no-store",
        });

        // pass through response as-is
        const text = await res.text();
        return new Response(text, {
            status: res.status,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error('Route handler error:', error);
        return NextResponse.json(
            { errors: [{ message: "Internal server error" }] },
            { status: 500 }
        );
    }
}