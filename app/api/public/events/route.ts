import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";

export async function GET() {
  await connectDB();
  const events = await Event.find().sort({ year: 1, day: 1 });
  return NextResponse.json({ events });
}
