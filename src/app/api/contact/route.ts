import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";

const REASON_LABELS: Record<string, string> = {
  "event-booking": "Event or Booking Questions",
  feedback: "Feedback",
  general: "General Inquiry",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, reason, message } = body;

    // Basic validation
    if (!name || !phone || !email || !reason || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;

    if (!apiKey || !domain) {
      console.error("Mailgun credentials not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({ username: "api", key: apiKey });

    const reasonLabel = REASON_LABELS[reason] || reason;

    await mg.messages.create(domain, {
      from: `The Well Website <noreply@${domain}>`,
      to: "thewell.lakeland@gmail.com",
      subject: `New Contact Form: ${reasonLabel} — ${name}`,
      text: [
        `New contact form submission from The Well website`,
        ``,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Reason: ${reasonLabel}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      "h:Reply-To": email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
