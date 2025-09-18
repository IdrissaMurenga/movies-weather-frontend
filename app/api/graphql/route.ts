import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

const GRAPHQL_URI = process.env.GRAPHQL_URI!;

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = (session as any).apiToken;
    const body = await req.json();

    const upstream = await fetch(GRAPHQL_URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        body: JSON.stringify(body),
    });

    const json = await upstream.json();
    return NextResponse.json(json, { status: upstream.status });
}