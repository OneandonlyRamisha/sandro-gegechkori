import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) {
    return NextResponse.json({ error: authError.error }, { status: authError.status });
  }

  await connectDB();
  const events = await Event.find().sort({ year: 1, day: 1 });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) {
    return NextResponse.json({ error: authError.error }, { status: authError.status });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { venue, city } = body;
  if (!venue || !city) {
    return NextResponse.json({ error: "venue and city are required" }, { status: 400 });
  }

  await connectDB();
  const event = await Event.create({
    day: Number(body.day),
    month: String(body.month),
    year: Number(body.year),
    venue: String(body.venue),
    city: String(body.city),
    country: body.country ? String(body.country) : "",
    piece: body.piece ? String(body.piece) : "",
    ticketUrl: body.ticketUrl ? String(body.ticketUrl) : "",
  });
  return NextResponse.json({ event }, { status: 201 });
}
