import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

export type ContactConfirmationEmailProps = {
  customerName: string;
  reference: string;
  logoSrc?: string;
};

const COMPANY_NAME = process.env.COMPANY_NAME ?? "RCW";
const FALLBACK_LOGO = "https://rcw-eta.vercel.app/logox.png";

const IG_GRADIENT =
  "linear-gradient(90deg, #833AB4 0%, #C13584 25%, #E1306C 50%, #FD1D1D 75%, #FCAF45 100%)";

export default function ContactConfirmationEmail({
  customerName,
  reference,
  logoSrc,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>We've got your message — reference {reference}</Preview>
      <Body style={main}>
        <Container style={outer}>
          <div
            style={{
              height: 6,
              background: IG_GRADIENT,
              borderRadius: "16px 16px 0 0",
            }}
          />
          <Container style={container}>
            <Img
              src={logoSrc ?? FALLBACK_LOGO}
              width="40"
              height="40"
              alt={COMPANY_NAME}
              style={{ borderRadius: "50%", marginBottom: 16 }}
            />

            <Heading style={heading}>Thanks, {customerName}.</Heading>

            <Text style={bodyLine}>
              We've got your message and will get back to you within a day.
            </Text>

            <Text style={referenceBox}>
              Reference: <strong>{reference}</strong>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              This confirms your enquiry was received by {COMPANY_NAME}. If you
              didn't submit this, you can safely ignore this email.
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f2ee",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "40px 0",
};

const outer = {
  margin: "0 auto",
  maxWidth: "480px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const container = { padding: "28px 32px 32px" };

const heading = {
  fontSize: "21px",
  fontWeight: 700,
  color: "#111111",
  margin: "0 0 12px",
};

const bodyLine = {
  fontSize: "14px",
  color: "#333333",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const referenceBox = {
  fontSize: "13px",
  color: "#111111",
  background: "#f4f2ee",
  borderRadius: "8px",
  padding: "10px 14px",
  margin: "0 0 8px",
};

const hr = { borderColor: "#f0f0f0", margin: "20px 0" };

const footer = {
  fontSize: "12px",
  color: "#999999",
  lineHeight: "1.5",
  margin: "0",
};
