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

  // TEMP DEBUG — remove once this is sorted. Confirms the key is actually
  // present at runtime (never logs the real value, just whether it exists
  // and how long it is, which is enough to catch "empty" or "truncated").
  console.log(
    "DEBUG: RESEND_API_KEY present?",
    Boolean(process.env.RESEND_API_KEY),
  );
  console.log(
    "DEBUG: RESEND_API_KEY length:",
    process.env.RESEND_API_KEY?.length ?? 0,
  );
  console.log("DEBUG: FROM_EMAIL resolved to:", FROM_EMAIL);
  console.log("DEBUG: OWNER_EMAIL resolved to:", OWNER_EMAIL);
  console.log("DEBUG: honeypot value:", JSON.stringify(body.honeypot));

  // Honeypot — bots fill hidden fields, real users never see this one.
  if (body.honeypot) {
    console.log("DEBUG: honeypot triggered, exiting early");
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
    const notificationResult = await resend.emails.send({
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

    // TEMP DEBUG — this is the important one. Full raw response from
    // Resend, not just the destructured error field.
    console.log(
      "DEBUG: Full Resend notification result:",
      JSON.stringify(notificationResult),
    );

    const { error } = notificationResult;

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 },
      );
    }

    if (replyTo) {
      const confirmationResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: replyTo,
        subject: `We've got your message — ${reference}`,
        react: ContactConfirmationEmail({
          customerName: body.customerName?.trim() || "there",
          reference,
          logoSrc: logoUrl,
        }),
      });

      // TEMP DEBUG
      console.log(
        "DEBUG: Full Resend confirmation result:",
        JSON.stringify(confirmationResult),
      );

      if (confirmationResult.error) {
        console.error(
          "Confirmation email failed (non-fatal):",
          confirmationResult.error,
        );
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
