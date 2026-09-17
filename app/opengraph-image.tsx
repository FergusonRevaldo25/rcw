import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RCW — Custom Websites for Local Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#DAD5D2",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 96,
          height: 96,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, #833AB4 0%, #E1306C 40%, #F77737 70%, #FCAF45 100%)",
          color: "white",
          fontSize: 56,
          fontWeight: 800,
          marginBottom: 32,
        }}
      >
        R
      </div>
      <div style={{ fontSize: 64, fontWeight: 800, color: "#14100F" }}>RCW</div>
      <div style={{ fontSize: 28, color: "#6B6461", marginTop: 16 }}>
        Custom Websites for Local Businesses
      </div>
    </div>,
    { ...size },
  );
}
