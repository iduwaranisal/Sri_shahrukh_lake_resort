import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateBookingEmailHtml, generateBookingEmailText } from "@/lib/emailTemplate";

interface InquiryPayload {
  checkIn: string;
  checkOut: string;
  guests: string;
  villa: string;
  name: string;
  email: string;
  phone?: string;
  specialRequests?: string;
}

const DESTINATION_EMAIL = "lakeresortsrishahrukh@gmail.com";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: InquiryPayload = await req.json();
    const { checkIn, checkOut, guests, villa, name, email, phone, specialRequests } = body;

    // Validation
    if (!name || !email || !checkIn || !checkOut || !villa || !guests) {
      return NextResponse.json(
        { error: "Please complete all required fields (Name, Email, Dates, Room, and Guests)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Connect and save booking to MongoDB
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { Booking } = await import("@/models/Booking");
      await connectToDatabase();
      await Booking.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim(),
        checkIn,
        checkOut,
        guests,
        villa: villa || "Homestay Stay",
        specialRequests: specialRequests?.trim(),
        status: "pending",
      });
    } catch (dbErr) {
      console.error("[MongoDB Save Booking Error in API route]", dbErr);
    }

    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER || DESTINATION_EMAIL;
    const rawEmailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    // Strip any accidental spaces from Google 16-character App Passwords (e.g. "abcd efgh ijkl mnop")
    const emailPass = rawEmailPass ? rawEmailPass.replace(/\s+/g, "") : "";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;

    const bookingDetails = {
      name,
      email,
      phone,
      villa: villa || "Homestay Stay",
      checkIn,
      checkOut,
      guests,
      specialRequests,
      type: "inquiry" as const,
    };

    const emailSubject = `New Room Inquiry: ${villa || "Homestay Stay"} (${checkIn} to ${checkOut}) - ${name}`;
    const plainText = generateBookingEmailText(bookingDetails);
    const htmlContent = generateBookingEmailHtml(bookingDetails);

    // Check if email credentials are configured
    if (emailPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
        connectionTimeout: 10000, // 10s connection timeout for Vercel functions
        greetingTimeout: 5000,
        socketTimeout: 15000,
      });

      await transporter.sendMail({
        from: `"Sri Shahrukh Lake Resort Website" <${emailUser}>`,
        to: DESTINATION_EMAIL,
        replyTo: email,
        subject: emailSubject,
        text: plainText,
        html: htmlContent,
      });

      console.log(`[EMAIL SENT]: Direct inquiry from ${name} (${email}) successfully delivered to ${DESTINATION_EMAIL}`);
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been sent directly to Sri Shahrukh Lake Resort.",
      });
    } else {
      // Credentials not yet added to .env.local
      console.warn(
        `[INQUIRY RECORDED - ACTION REQUIRED]: Email credentials (EMAIL_PASS) are not yet configured in .env.local. Inquiry details: ${JSON.stringify({
          name,
          email,
          villa,
          checkIn,
          checkOut,
          guests,
          phone,
        })}`
      );

      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully. Note: configure EMAIL_PASS in .env.local for automatic Gmail inbox delivery.",
      });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[INQUIRY ERROR]:", err);
    return NextResponse.json(
      {
        error: "Failed to send inquiry email. Please try again or contact us directly on WhatsApp at 0757273416.",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}
