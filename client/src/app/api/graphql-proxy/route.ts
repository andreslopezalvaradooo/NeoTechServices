import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
    process.env.GRAPHQL_URL_INTERNAL ?? "http://localhost:4000/graphql";

export async function POST(request: NextRequest) {
    const body = await request.text();

    // Leer cookies del browser y reenviarlas al backend
    const cookieHeader = request.headers.get("cookie") ?? "";

    const backendResponse = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 👇 Reenviar cookies al backend (server-to-server, sin restricción SameSite)
            cookie: cookieHeader,
        },
        body,
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, {
        status: backendResponse.status,
    });
}