import { ImageResponse } from "next/og";

// Placeholder iOS home-screen icon — replace with real church logo art.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B2A4A",
          color: "#F5A623",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          borderRadius: 36,
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}
