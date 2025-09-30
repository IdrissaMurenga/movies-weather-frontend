import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

// getting backend graphql uri
const GRAPHQL_URI = process.env.GRAPHQL_URI!;

export async function POST(req: NextRequest) {
    try {

        // parse the request body
        const body = await req.json();

        // check the signup mutation
        const isSignupMutation = 
            body.query?.toLowerCase().includes('mutation signup') || 
            body.operationName?.toLowerCase() === 'signup';

        let token: string | undefined;

        // if the request is not for signup, verify the user
        if (!isSignupMutation) {
            const session = await auth();
            
            // if no session show unauthorize message
            if (!session) {
                return NextResponse.json(
                    { errors: [{ message: "Unauthorized access" }] },
                    { status: 401 }
                );
            }

            // get token from session
            token = session.apiToken;
        }

        // make the request to the GraphQL server
        const response = await fetch(GRAPHQL_URI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
            cache: "no-store",
            body: JSON.stringify(body),
        });

        // parse JSON response
        const json = await response.json();

        // return response status and JSON content type
        return NextResponse.json(json, { 
            status: response.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Route handler error:', error);
        return NextResponse.json(
            { errors: [{ message: "Internal server error" }] },
            { status: 500 }
        );
    }
}