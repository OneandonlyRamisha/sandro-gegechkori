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

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EventSchema = new Schema<IEvent>(
  {
    day: { type: Number, required: true, min: 1, max: 31 },
    month: { type: String, required: true, enum: MONTHS },
    year: { type: Number, required: true, min: 2000, max: 2099 },
    venue: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true, maxlength: 100 },
    country: { type: String, default: "", maxlength: 100 },
    piece: { type: String, default: "", maxlength: 300 },
    ticketUrl: {
      type: String,
      default: "",
      validate: {
        validator: (v: string) => {
          if (v === "") return true;
          try {
            const url = new URL(v);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        },
        message: "ticketUrl must be a valid http/https URL or empty",
      },
    },
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event ?? mongoose.model<IEvent>("Event", EventSchema);
