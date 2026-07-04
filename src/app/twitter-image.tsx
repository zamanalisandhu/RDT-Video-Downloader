import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RDT Video Downloader — Save Reddit Videos with Sound";
export const size = { width: 1200, height: 628 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #162235 0%, #0A1628 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div 
          style={{ 
            fontSize: 44, 
            fontWeight: 700, 
            color: "#ff4500", 
            marginBottom: 16 
          }}
        >
          RDT
        </div>
        <div 
          style={{ 
            fontSize: 56, 
            fontWeight: 700, 
            textAlign: "center", 
            lineHeight: 1.1, 
            marginBottom: 20 
          }}
        >
          Reddit Video Downloader
        </div>
        <div 
          style={{ 
            fontSize: 28, 
            color: "#B0B8C0", 
            textAlign: "center" 
          }}
        >
          Download Reddit videos with sound in HD
        </div>
      </div>
    ),
    { ...size }
  );
}
