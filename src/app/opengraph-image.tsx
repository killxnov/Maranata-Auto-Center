import { ImageResponse } from "next/og";
export const alt = "Maranata Auto Center, Sarandi, Porto Alegre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0c0e",
        color: "#fff",
        padding: "70px 85px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, letterSpacing: 6 }}>MARANATA AUTO CENTER</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 78,
          letterSpacing: -3,
          lineHeight: 1.08,
        }}
      >
        <span>Seu caminho.</span>
        <span>Nosso cuidado.</span>
        <span style={{ color: "#c5d2df" }}>Em cada detalhe.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #b62f36",
          paddingTop: 25,
          fontSize: 20,
        }}
      >
        <span>Nacionais e importados</span>
        <span>Atendimento em Porto Alegre</span>
      </div>
    </div>,
    size,
  );
}
