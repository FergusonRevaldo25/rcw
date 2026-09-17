import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactRequestEmail from "../../emails/ContactRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "you@your-domain.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

// The deployed site — images in the email are referenced as real URLs here,
// not embedded as base64. Base64-embedding a ~900KB PNG inflates the email
// past Gmail's ~102KB clip threshold, which truncates the HTML mid-tag and
// dumps the raw base64 string as visible text. Real image URLs avoid that
// entirely, load faster, and are what email clients actually expect.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rcw-eta.vercel.app";

type ContactBody = {
  subject: string;
  message: string;
  replyTo?: string;
};

function isValid(data: Partial<ContactBody>): data is ContactBody {
  return (
    typeof data.subject === "string" &&
    data.subject.trim().length > 0 &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  );
}

// Builds a full, properly-encoded URL for a file in /public. Handles
// spaces/parentheses in filenames (like "mascot (5).png") correctly —
// though renaming that file to something like "mascot-5.png" is worth
// doing anyway, since spaces in URLs are fragile across some email clients.
function publicUrl(publicPath: string): string {
  const encodedPath = publicPath.split("/").map(encodeURIComponent).join("/");
  return `${SITE_URL}/${encodedPath}`;
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const replyTo =
    body.replyTo && body.replyTo.includes("@") ? body.replyTo : undefined;

  const logoUrl = publicUrl("logo.png");
  const mascotUrl = publicUrl("mascot (5).png");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo,
      subject: body.subject,
      react: ContactRequestEmail({
        subject: body.subject,
        message: body.message,
        logoSrc: logoUrl,
        mascotSrc: mascotUrl,
      }),
      // Explicit plain-text fallback, built from the same message rather
      // than letting Resend auto-derive one from the React tree. Good
      // practice for deliverability regardless of the image fix above.
      text: body.message,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
