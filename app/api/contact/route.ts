import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Bitte fülle alle Felder aus." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: "sissi.asen@gmail.com",
      subject: "Neue Anfrage über deine Website",
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("E-Mail-Fehler:", error);

    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}