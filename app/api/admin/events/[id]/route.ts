import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(req);
  if (authError) {
    return NextResponse.json({ error: authError.error }, { status: authError.status });
  }

  const { id } = await params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }
  await connectDB();
  const event = await Event.findById(id);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ event });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }
  await connectDB();
  const event = await Event.findByIdAndUpdate(
    id,
    {
      day: Number(body.day),
      month: String(body.month),
      year: Number(body.year),
      venue: String(body.venue),
      city: String(body.city),
      country: body.country ? String(body.country) : "",
      piece: body.piece ? String(body.piece) : "",
      ticketUrl: body.ticketUrl ? String(body.ticketUrl) : "",
    },
    { new: true, runValidators: true }
  );
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ event });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(req);
  if (authError) {
    return NextResponse.json({ error: authError.error }, { status: authError.status });
  }

  const { id } = await params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }
  await connectDB();
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Event deleted" });
}
