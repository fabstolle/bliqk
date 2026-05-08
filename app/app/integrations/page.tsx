"use client";
import { useState } from "react";

const INTEGRATIONS = [
  { name:"Gmail", icon:"📧", color:"#EA4335", status:"mock", desc:"Import emails from Gmail. Requires Google OAuth setup.", badge:"Mock Mode" },
  { name:"Outlook / Microsoft 365", icon:"📮", color:"#0078D4", status:"mock", desc:"Import emails from Outlook. Requires Microsoft Entra setup.", badge:"Mock Mode" },
  { name:"Smart Capture", icon:"✍️", color:"#00C853", status:"connected", desc:"Manually paste any message. Works without any setup.", badge:"Connected" },
  { name:"Webhook API", icon:"🔗", color:"#FF6D00", status:"soon", desc:"Receive messages from any source via HTTP webhook.", badge:"Coming Soon" },
];

export default function IntegrationsPage() {
  const [importing, setImporting] = useState<string | null>(null);
  const [imported, setImported] = useState<string[]>([]);

  const handleMockImport = async (name: string) => {
    setImporting(name);
    await new Promise(r => setTimeout(r, 1200));
    setImported(prev => [...prev, name]);
    setImporting(null);
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>Integrations 🔌</h2>
        <p style={{ margin: 0, fontSize: 13, color: "#4A5080" }}>Connect your email sources. Mock mode is active — works without real credentials.</p>
      </div>

      {/* AI Banner */}
      <div style={{ background: "rgba(79,127,255,0.06)", border: "1px solid rgba(79,127,255,0.15)", borderRadius: 14, padding: "14px 18px", marginBottom: 22, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 28 }}>🤖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#4F7FFF" }}>AI classification active on all imports</div>
          <div style={{ fontSize: 12, color: "#4A5080", marginTop: 2 }}>Rule classifier runs first (free). Claude AI only when confidence is low.</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {INTEGRATIONS.map((item, i) => (
          <div key={i} style={{ background: "#12152A", borderRadius: 16, padding: 20, border: "1px solid #1E2140", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = item.color + "40"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#1E2140"}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: item.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                    background: item.status === "connected" ? "rgba(0,200,83,0.15)" : item.status === "mock" ? "rgba(255,109,0,0.15)" : "rgba(79,127,255,0.15)",
                    color: item.status === "connected" ? "#00C853" : item.status === "mock" ? "#FF6D00" : "#4F7FFF",
                  }}>{item.badge}</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#4A5080", lineHeight: 1.6, margin: "0 0 16px" }}>{item.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {item.status === "mock" && (
                <button
                  onClick={() => handleMockImport(item.name)}
                  disabled={importing === item.name}
                  style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", background: imported.includes(item.name) ? "rgba(0,200,83,0.15)" : `${item.color}20`, color: imported.includes(item.name) ? "#00C853" : item.color, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {importing === item.name ? "⟳ Importing..." : imported.includes(item.name) ? "✅ Imported" : "▶ Mock Import"}
                </button>
              )}
              <button style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #2A2D4A", background: "transparent", color: "#4A5080", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                {item.status === "connected" ? "✓ Active" : item.status === "soon" ? "Coming Soon" : "Setup OAuth →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
