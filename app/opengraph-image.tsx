import { ImageResponse } from "next/og";

export const alt = "Next Innovation | 沖縄発・多角経営企業";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 70% 20%, #0a2540 0%, #0a0a0a 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            color: "#38bdf8",
            fontWeight: 700,
          }}
        >
          OKINAWA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 900,
            marginTop: 12,
          }}
        >
          <span style={{ color: "white" }}>Next&nbsp;</span>
          <span style={{ color: "#00aaff" }}>Innovation</span>
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#e5e7eb",
            marginTop: 28,
            fontWeight: 700,
          }}
        >
          多角経営で、地域に新しい価値を。
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9ca3af",
            marginTop: 40,
          }}
        >
          清掃業 ・ キッチンカー ・ 経営コンサル ・ EC物販
        </div>
      </div>
    ),
    { ...size }
  );
}
