import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { error: "JSON parse failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 400 }
    );
  }

  const { password } = body;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  try {
    const token = await createSessionToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Token creation failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
