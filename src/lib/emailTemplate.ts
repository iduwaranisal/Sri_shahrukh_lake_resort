/**
 * Premium HTML & Plain-text Email Template for Sri Shahrukh Lake Resort
 * Designed to match the luxury Obsidian Emerald & Champagne Gold resort identity.
 */

export interface EmailBookingDetails {
  name: string;
  email: string;
  phone?: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  specialRequests?: string;
  type?: "booking" | "inquiry";
}

function escapeHtml(text: string = ""): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateBookingEmailHtml(details: EmailBookingDetails): string {
  const safeName = escapeHtml(details.name);
  const safeEmail = escapeHtml(details.email);
  const safePhone = details.phone ? escapeHtml(details.phone) : "";
  const safeVilla = escapeHtml(details.villa || "Homestay Stay");
  const safeCheckIn = escapeHtml(details.checkIn);
  const safeCheckOut = escapeHtml(details.checkOut);
  const safeGuests = escapeHtml(details.guests);
  const safeRequests = details.specialRequests ? escapeHtml(details.specialRequests) : "";

  // Sanitize phone for direct WhatsApp link (e.g. 0757273416 -> 94757273416)
  let cleanPhone = safePhone.replace(/[^0-9]/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "94" + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith("94") && cleanPhone.length > 8) {
    cleanPhone = "94" + cleanPhone;
  }

  const destinationEmail = "lakeresortsrishahrukh@gmail.com";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Request - Sri Shahrukh Lake Resort</title>
  <style>
    body {
      margin: 0;
      padding: 32px 16px;
      background-color: #f3efe6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #132722;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(10, 24, 21, 0.12);
      border-top: 4px solid #d4af37;
    }
    .header {
      background-color: #0a1815;
      padding: 32px 24px;
      text-align: center;
    }
    .brand-title {
      margin: 0;
      font-size: 21px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #d4af37;
      font-family: Georgia, serif;
    }
    .brand-subtitle {
      margin: 8px 0 0;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #e5c97d;
      font-weight: 500;
    }
    .content {
      padding: 32px 28px;
    }
    .badge-pill {
      display: inline-block;
      background-color: #eaf8f0;
      color: #15803d;
      border: 1px solid #bbf7d0;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      margin-bottom: 22px;
    }
    .badge-pill::before {
      content: "•";
      margin-right: 6px;
      font-size: 14px;
    }
    .table-details {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .table-details td {
      padding: 13px 10px;
      border-bottom: 1px solid #f2ede4;
      font-size: 14px;
      vertical-align: middle;
    }
    .table-details tr:last-child td {
      border-bottom: none;
    }
    .col-label {
      width: 36%;
      font-weight: 600;
      color: #55605b;
      font-size: 13px;
    }
    .col-value {
      color: #0a1815;
      font-weight: 600;
      font-size: 14px;
    }
    .highlight-room {
      color: #8c6d1f;
      background-color: #faf5ea;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid #f0e1c2;
      display: inline-block;
    }
    .gold-link {
      color: #8c6d1f;
      text-decoration: none;
      font-weight: 600;
    }
    .gold-link:hover {
      text-decoration: underline;
    }
    .requests-container {
      margin: 22px 0;
      background-color: #faf8f5;
      border-left: 3px solid #d4af37;
      padding: 14px 16px;
      border-radius: 0 6px 6px 0;
    }
    .requests-title {
      margin: 0 0 6px 0;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #55605b;
    }
    .requests-text {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      color: #243530;
      white-space: pre-wrap;
    }
    .actions-row {
      text-align: center;
      margin: 32px 0 10px;
    }
    .btn-primary {
      display: inline-block;
      background-color: #0a1815;
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 26px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 6px;
      border: 1px solid #d4af37;
      box-shadow: 0 4px 12px rgba(10, 24, 21, 0.2);
      margin: 4px;
    }
    .btn-whatsapp {
      display: inline-block;
      background-color: #25D366;
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 22px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
      margin: 4px;
    }
    .footer {
      background-color: #faf8f5;
      padding: 22px 24px;
      text-align: center;
      font-size: 11px;
      color: #6a7974;
      border-top: 1px solid #ebe5da;
      line-height: 1.6;
    }
    .footer a {
      color: #1e3a8a;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="brand-title">Sri Shahrukh Lake Resort</h1>
      <p class="brand-subtitle">Direct Homestay & Safari Booking Inquiry</p>
    </div>

    <div class="content">
      <div style="text-align: left;">
        <span class="badge-pill">New Booking Request</span>
      </div>

      <table class="table-details">
        <tr>
          <td class="col-label">Guest Name</td>
          <td class="col-value">${safeName}</td>
        </tr>
        <tr>
          <td class="col-label">Guest Email</td>
          <td class="col-value">
            <a href="mailto:${safeEmail}" class="gold-link">${safeEmail}</a>
          </td>
        </tr>
        ${safePhone ? `
        <tr>
          <td class="col-label">Phone / WhatsApp</td>
          <td class="col-value">${safePhone}</td>
        </tr>
        ` : ""}
        <tr>
          <td class="col-label">Selected Room</td>
          <td class="col-value">
            <span class="highlight-room">${safeVilla}</span>
          </td>
        </tr>
        <tr>
          <td class="col-label">Check-In Date</td>
          <td class="col-value">${safeCheckIn}</td>
        </tr>
        <tr>
          <td class="col-label">Check-Out Date</td>
          <td class="col-value">${safeCheckOut}</td>
        </tr>
        <tr>
          <td class="col-label">Number of Guests</td>
          <td class="col-value">${safeGuests}</td>
        </tr>
      </table>

      ${safeRequests ? `
      <div class="requests-container">
        <p class="requests-title">Special Requests & Safari Inquiries</p>
        <p class="requests-text">${safeRequests}</p>
      </div>
      ` : ""}

      <div class="actions-row">
        <a href="mailto:${safeEmail}?subject=Reservation%20Confirmation%20-%20Sri%20Shahrukh%20Lake%20Resort" class="btn-primary">
          REPLY TO GUEST (${safeEmail.toUpperCase()})
        </a>
        ${cleanPhone ? `
        <br style="display: none;" />
        <a href="https://wa.me/${cleanPhone}" class="btn-whatsapp" target="_blank" rel="noopener noreferrer">
          CHAT ON WHATSAPP
        </a>
        ` : ""}
      </div>
    </div>

    <div class="footer">
      Sri Shahrukh Lake Resort · 135/1 Suduwella Tikiri Udanapura, Tissamaharama, Sri Lanka<br/>
      Direct Phone: <a href="tel:+94776219245">+94 77 621 9245</a> · WhatsApp: 0757273416 · Email: <a href="mailto:${destinationEmail}">${destinationEmail}</a>
    </div>
  </div>
</body>
</html>`;
}

export function generateBookingEmailText(details: EmailBookingDetails): string {
  return `
=====================================================
NEW BOOKING REQUEST - SRI SHAHRUKH LAKE RESORT
=====================================================

Guest Details:
• Name: ${details.name}
• Email: ${details.email}
${details.phone ? `• Phone / WhatsApp: ${details.phone}\n` : ""}
Reservation Details:
• Room Category: ${details.villa || "Homestay Stay"}
• Check-In Date: ${details.checkIn}
• Check-Out Date: ${details.checkOut}
• Number of Guests: ${details.guests}

${details.specialRequests ? `Special Requests:\n${details.specialRequests}\n\n` : ""}
Submitted at: ${new Date().toLocaleString()}
-----------------------------------------------------
Sri Shahrukh Lake Resort · 135/1 Suduwella Tikiri Udanapura, Tissamaharama
Phone: +94 77 621 9245 · WhatsApp: 0757273416
`;
}
