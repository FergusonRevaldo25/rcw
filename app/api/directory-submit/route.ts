import { NextResponse } from "next/server";
import { Resend } from "resend";
import DirectorySubmissionEmail from "@/emails/DirectorySubmissionEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "you@your-domain.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function isValidSubmission(data: Record<string, unknown>) {
  const required = ["devName", "url", "screenshotUrl", "tagline", "contact"];
  return required.every(
    (key) =>
      typeof data[key] === "string" && (data[key] as string).trim().length > 0,
  );
}

export async function POST(request: Request) {
  const data = await request.json();

  if (data.rcw_hp_field) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidSubmission(data)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New directory submission — ${data.devName}`,
      react: DirectorySubmissionEmail({
        devName: data.devName,
        studioName: data.studioName,
        url: data.url,
        screenshotUrl: data.screenshotUrl,
        category: data.category,
        tagline: data.tagline,
        contact: data.contact,
      }),
    });

    if (error) {
      console.error("Resend error (directory):", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Directory submission email failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
