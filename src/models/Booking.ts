import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  villa: string;
  specialRequests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: String, required: true, default: "2 Guests" },
    villa: { type: String, required: true, default: "Homestay Stay" },
    specialRequests: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
