import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

    const emailSubject = `New Room Inquiry: ${name} (${checkIn} to ${checkOut})`;

    const plainText = `
=====================================================
NEW ROOM INQUIRY - SRI SHAHRUKH LAKE RESORT
=====================================================

Guest Details:
• Name: ${name}
• Email: ${email}
${phone ? `• Phone / WhatsApp: ${phone}\n` : ""}
Reservation Details:
• Room Category: ${villa}
• Check-In Date: ${checkIn}
• Check-Out Date: ${checkOut}
• Number of Guests: ${guests}

${specialRequests ? `Special Requests & Inquiries:\n${specialRequests}\n\n` : ""}
To reply directly to this guest, hit Reply or email ${email}.
=====================================================
Sri Shahrukh Lake Resort · 135/1 Suduwella Tikiri Udanapura, Tissamaharama
Direct Phone: +94 77 621 9245 · WhatsApp: 0757273416
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f0e8; margin: 0; padding: 24px; color: #132722; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border-top: 5px solid #d4af37; }
    .header { background: #0a1815; padding: 28px 24px; text-align: center; }
    .brand { margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; color: #d4af37; font-weight: 300; }
    .subhead { margin: 6px 0 0; font-size: 11px; color: #e5c97d; letter-spacing: 1.5px; text-transform: uppercase; }
    .body-content { padding: 32px 28px; }
    .pill { display: inline-block; background: #ebf5ee; color: #166534; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 12px; margin-bottom: 20px; }
    .grid-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .grid-table td { padding: 12px 10px; border-bottom: 1px solid #f2ede4; font-size: 14px; }
    .grid-table td.lbl { font-weight: 600; color: #55605b; width: 34%; }
    .grid-table td.val { color: #0a1815; font-weight: 500; }
    .notes-box { background: #faf8f5; border-left: 3px solid #d4af37; padding: 14px 16px; margin: 18px 0; font-size: 14px; color: #2d3748; line-height: 1.6; border-radius: 0 4px 4px 0; }
    .cta-row { text-align: center; margin: 30px 0 10px; }
    .btn { display: inline-block; background: #0a1815; color: #faf8f5 !important; text-decoration: none; padding: 13px 28px; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
    .footer { background: #faf8f5; padding: 18px 24px; text-align: center; font-size: 11px; color: #718096; border-top: 1px solid #eee; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="brand">Sri Shahrukh Lake Resort</h1>
      <p class="subhead">Direct Homestay & Safari Booking Inquiry</p>
    </div>
    <div class="body-content">
      <span class="pill">● New Booking Request</span>

      <table class="grid-table">
        <tr>
          <td class="lbl">Guest Name</td>
          <td class="val"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Guest Email</td>
          <td class="val"><a href="mailto:${email}" style="color: #8c6d1f; text-decoration: none; font-weight: 600;">${email}</a></td>
        </tr>
        ${phone ? `<tr><td class="lbl">Phone / WhatsApp</td><td class="val"><strong>${phone}</strong></td></tr>` : ""}
        <tr>
          <td class="lbl">Selected Room</td>
          <td class="val"><strong style="color: #8c6d1f;">${villa}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Check-In Date</td>
          <td class="val"><strong>${checkIn}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Check-Out Date</td>
          <td class="val"><strong>${checkOut}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Number of Guests</td>
          <td class="val"><strong>${guests}</strong></td>
        </tr>
      </table>

      ${specialRequests ? `
        <p style="font-weight: 600; margin-bottom: 6px; color: #55605b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Special Requests & Safari Inquiries:</p>
        <div class="notes-box">${specialRequests.replace(/\n/g, '<br/>')}</div>
      ` : ""}

      <div class="cta-row">
        <a href="mailto:${email}?subject=Booking%20Confirmation%20-%20Sri%20Shahrukh%20Lake%20Resort" class="btn">
          Reply to Guest (${email})
        </a>
      </div>
    </div>
    <div class="footer">
      Sri Shahrukh Lake Resort · 135/1 Suduwella Tikiri Udanapura, Tissamaharama, Sri Lanka<br/>
      Direct Phone: +94 77 621 9245 · WhatsApp: 0757273416 · Email: ${DESTINATION_EMAIL}
    </div>
  </div>
</body>
</html>
`;

    // Check if email credentials are configured
    if (emailPass) {
      const transporter = smtpHost
        ? nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
          })
        : nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailUser,
              pass: emailPass,
            },
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
