import { ImageResponse } from "next/og";

// Placeholder favicon: navy square with the yellow "W" monogram.
// TODO: replace with the church's real logo favicon files before launch.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}
