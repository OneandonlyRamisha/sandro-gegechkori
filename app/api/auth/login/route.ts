import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.username || !body.password) {
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 },
    );
  }

  if (body.username !== ADMIN_USERNAME || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ username: ADMIN_USERNAME, role: "admin" });
  return NextResponse.json({ token });
}
