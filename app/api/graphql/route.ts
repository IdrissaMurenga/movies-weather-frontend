import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

// getting backend graphql uri
const GRAPHQL_URI = process.env.GRAPHQL_URI!;

export async function POST(req: NextRequest) {

    // get user'session in server side
    const session = await auth();

    //check if theres user's session if not return an unauthorized response
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // get the token from user's session
    const token = (session as any).apiToken;

    // pass body straight through the actual GraphQL backend.
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