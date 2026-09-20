"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Booking, type IBooking } from "@/models/Booking";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/app/actions/adminAuthActions";
import { generateBookingEmailHtml, generateBookingEmailText } from "@/lib/emailTemplate";

export interface CreateBookingInput {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  villa?: string;
  specialRequests?: string;
}

export interface SerializedBooking {
  id: string;
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
  createdAt: string;
}

const DESTINATION_EMAIL = "lakeresortsrishahrukh@gmail.com";

export async function createBooking(data: CreateBookingInput) {
  try {
    if (!data.name || !data.email || !data.checkIn || !data.checkOut || !data.guests) {
      return { success: false, error: "Please fill in all required fields." };
    }

    await connectToDatabase();

    const booking = await Booking.create({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      villa: data.villa || "Homestay Stay",
      specialRequests: data.specialRequests?.trim(),
      status: "pending",
    });

    // Send email notification asynchronously in background
    sendNotificationEmail(booking).catch((err) => {
      console.error("[Email Notification Error]", err);
    });

    revalidatePath("/admin");

    return {
      success: true,
      id: booking._id.toString(),
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Create Booking Error]", error);
    return { success: false, error: error.message || "Failed to create booking" };
  }
}

export async function getBookings(statusFilter?: string, search?: string) {
  try {
    const auth = await requireAdminAuth();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized", bookings: [] };
    }

    await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (statusFilter && statusFilter !== "all") {
      query.status = statusFilter;
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
        { phone: { $regex: term, $options: "i" } },
      ];
    }

    const docs = await Booking.find(query).sort({ createdAt: -1 }).lean();

    const bookings: SerializedBooking[] = docs.map((b) => ({
      id: b._id.toString(),
      name: b.name,
      email: b.email,
      phone: b.phone || "",
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      guests: b.guests,
      villa: b.villa || "Homestay Stay",
      specialRequests: b.specialRequests || "",
      status: b.status,
      adminNotes: b.adminNotes || "",
      createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
    }));

    return { success: true, bookings };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Get Bookings Error]", error);
    return { success: false, error: error.message || "Failed to fetch bookings", bookings: [] };
  }
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "completed" | "cancelled",
  adminNotes?: string
) {
  try {
    const auth = await requireAdminAuth();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized" };
    }

    await connectToDatabase();

    const updateFields: { status: string; adminNotes?: string } = { status };
    if (adminNotes !== undefined) {
      updateFields.adminNotes = adminNotes;
    }

    const updated = await Booking.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) {
      return { success: false, error: "Booking not found." };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update Booking Error]", error);
    return { success: false, error: error.message || "Failed to update booking" };
  }
}

export async function deleteBooking(id: string) {
  try {
    const auth = await requireAdminAuth();
    if (!auth.authorized) {
      return { success: false, error: auth.error || "Unauthorized" };
    }

    await connectToDatabase();
    await Booking.findByIdAndDelete(id);
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Delete Booking Error]", error);
    return { success: false, error: error.message || "Failed to delete booking" };
  }
}

async function sendNotificationEmail(booking: IBooking) {
  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER || DESTINATION_EMAIL;
  const rawEmailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const emailPass = rawEmailPass ? rawEmailPass.replace(/\s+/g, "") : "";
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;

  const bookingDetails = {
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    villa: booking.villa || "Homestay Stay",
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guests: booking.guests,
    specialRequests: booking.specialRequests,
    type: "booking" as const,
  };

  const emailSubject = `New Homestay Booking: ${booking.villa || "Homestay Stay"} (${booking.checkIn} to ${booking.checkOut}) - ${booking.name}`;
  const plainText = generateBookingEmailText(bookingDetails);
  const htmlContent = generateBookingEmailHtml(bookingDetails);

  if (!emailUser || !emailPass) {
    console.log("[DEV Email Simulated] Booking notification created:\n", plainText);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: emailUser, pass: emailPass },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: `"Sri Shahrukh Lake Resort" <${emailUser}>`,
    to: DESTINATION_EMAIL,
    replyTo: booking.email,
    subject: emailSubject,
    text: plainText,
    html: htmlContent,
  });
}
