import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  day: number;
  month: string;
  year: number;
  venue: string;
  city: string;
  country: string;
  piece: string;
  ticketUrl?: string;
}

const EventSchema = new Schema<IEvent>(
  {
    day: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: "" },
    piece: { type: String, default: "" },
    ticketUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event ?? mongoose.model<IEvent>("Event", EventSchema);
