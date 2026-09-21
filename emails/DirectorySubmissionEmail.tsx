import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export type DirectorySubmissionEmailProps = {
  devName: string;
  studioName?: string;
  url: string;
  screenshotUrl: string;
  category: string;
  tagline: string;
  contact: string;
};

export default function DirectorySubmissionEmail({
  devName,
  studioName,
  url,
  screenshotUrl,
  category,
  tagline,
  contact,
}: DirectorySubmissionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New directory submission from {devName}</Preview>
      <Body
        style={{
          backgroundColor: "#f4f2ee",
          padding: "40px 0",
          fontFamily: "sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 32,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <Heading style={{ fontSize: 20, margin: "0 0 20px" }}>
            New directory submission
          </Heading>
          <Text>
            <strong>Name:</strong> {devName}
          </Text>
          {studioName && (
            <Text>
              <strong>Studio:</strong> {studioName}
            </Text>
          )}
          <Text>
            <strong>Project URL:</strong> {url}
          </Text>
          <Text>
            <strong>Screenshot:</strong> {screenshotUrl}
          </Text>
          <Text>
            <strong>Category:</strong> {category}
          </Text>
          <Text>
            <strong>Tagline:</strong> {tagline}
          </Text>
          <Text>
            <strong>Contact:</strong> {contact}
          </Text>
          <Hr style={{ margin: "20px 0" }} />
          <Text style={{ fontSize: 12, color: "#999" }}>
            Review the link and screenshot, then add an approved entry to
            app/directory/page.tsx's ENTRIES array.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
