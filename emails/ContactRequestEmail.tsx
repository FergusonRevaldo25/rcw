import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactRequestEmailProps = {
  subject: string;
  message: string;
  logoSrc?: string;
  mascotSrc?: string;
};

const COMPANY_NAME = process.env.COMPANY_NAME ?? "RCW";
const FALLBACK_LOGO = "https://rcw-eta.vercel.app/logox.png";

const IG_GRADIENT =
  "linear-gradient(90deg, #833AB4 0%, #C13584 25%, #E1306C 50%, #FD1D1D 75%, #FCAF45 100%)";

export default function ContactRequestEmail({
  subject,
  message,
  logoSrc,
  mascotSrc,
}: ContactRequestEmailProps) {
  const lines = message.split("\n");

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
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
            <table role="presentation" style={{ margin: "0 0 20px" }}>
              <tbody>
                <tr>
                  <td>
                    <div style={logoRing}>
                      <div style={logoRingInner}>
                        <Img
                          src={logoSrc ?? FALLBACK_LOGO}
                          width="45"
                          height="50"
                          alt={COMPANY_NAME}
                          style={logoImg}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ paddingLeft: 12, verticalAlign: "middle" }}>
                    <Text style={brand}>{COMPANY_NAME}</Text>
                    <Text style={brandSub}>New enquiry</Text>
                  </td>
                </tr>
              </tbody>
            </table>

            <Heading style={heading}>{subject}</Heading>

            <Section style={card}>
              {lines.map((line, i) =>
                line === "" ? (
                  <Hr key={i} style={hr} />
                ) : line.startsWith("---") ? (
                  <Text key={i} style={sectionLabel}>
                    {line.replace(/^---\s*|\s*---$/g, "")}
                  </Text>
                ) : (
                  <Text key={i} style={bodyLine}>
                    {line}
                  </Text>
                ),
              )}
            </Section>

            <Hr style={hr} />

            <table role="presentation" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  {mascotSrc && (
                    <td style={{ width: 48, verticalAlign: "bottom" }}>
                      <Img
                        src={mascotSrc}
                        width="44"
                        alt=""
                        style={{ display: "block" }}
                      />
                    </td>
                  )}
                  <td
                    style={{
                      verticalAlign: "middle",
                      paddingLeft: mascotSrc ? 10 : 0,
                    }}
                  >
                    <Text style={footer}>
                      Sent automatically from the {COMPANY_NAME} website contact
                      form. Reply directly to this email to get back to them.
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
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

const logoRing = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: IG_GRADIENT,
  padding: 2,
};

const logoRingInner = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const logoImg = { borderRadius: "50%", display: "block" };

const brand = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#111111",
  margin: "0",
  lineHeight: "1.3",
};
const brandSub = {
  fontSize: "12px",
  color: "#999999",
  margin: "0",
  lineHeight: "1.3",
};
const heading = {
  fontSize: "21px",
  fontWeight: 700,
  color: "#111111",
  margin: "4px 0 20px",
};
const card = { margin: "0" };
const bodyLine = {
  fontSize: "14px",
  color: "#333333",
  lineHeight: "1.6",
  margin: "0 0 4px",
};
const sectionLabel = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  color: "#E1306C",
  margin: "18px 0 6px",
};
const hr = { borderColor: "#f0f0f0", margin: "18px 0" };
const footer = {
  fontSize: "12px",
  color: "#999999",
  lineHeight: "1.5",
  margin: "0",
};
