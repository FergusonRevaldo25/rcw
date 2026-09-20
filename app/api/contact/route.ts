import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactRequestEmail from "@/emails/ContactRequestEmail";
import ContactConfirmationEmail from "@/emails/ContactConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "revaldo.ferguson01@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rcwonline.co.za";

type ContactBody = {
  subject: string;
  message: string;
  replyTo?: string;
  customerName?: string;
  honeypot?: string;
};

function isValid(data: Partial<ContactBody>): data is ContactBody {
  return (
    typeof data.subject === "string" &&
    data.subject.trim().length > 0 &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  );
}

function publicUrl(publicPath: string): string {
  const encodedPath = publicPath.split("/").map(encodeURIComponent).join("/");
  return `${SITE_URL}/${encodedPath}`;
}

function generateReference(): string {
  return `RCW-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot — bots fill hidden fields, real users never see this one.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const replyTo =
    body.replyTo && body.replyTo.includes("@") ? body.replyTo : undefined;

  const logoUrl = publicUrl("logox.png");
  const mascotUrl = publicUrl("mascot (5).png");
  const reference = generateReference();

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo,
      subject: `${body.subject} [${reference}]`,
      react: ContactRequestEmail({
        subject: body.subject,
        message: body.message,
        logoSrc: logoUrl,
        mascotSrc: mascotUrl,
      }),
      text: body.message,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 },
      );
    }

    if (replyTo) {
      const { error: confirmError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: replyTo,
        subject: `We've got your message — ${reference}`,
        react: ContactConfirmationEmail({
          customerName: body.customerName?.trim() || "there",
          reference,
          logoSrc: logoUrl,
        }),
      });

      if (confirmError) {
        console.error("Confirmation email failed (non-fatal):", confirmError);
      }
    }

    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
