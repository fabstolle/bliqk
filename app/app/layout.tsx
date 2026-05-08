"use client";
import { useRouter, usePathname } from "next/navigation";

const NAV = [
  { href: "/app",               icon: "🏠", label: "Dashboard"    },
  { href: "/app/inbox",         icon: "📥", label: "Inbox"        },
  { href: "/app/capture",       icon: "✍️", label: "Smart Capture" },
  { href: "/app/integrations",  icon: "🔌", label: "Integrations" },
  { href: "/app/usage",         icon: "📊", label: "Usage & Costs" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path   = usePathname();

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0D0F1A", color: "#E8EAF6", fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

      {/* ── Sidebar ── */}
      <div style={{ width: 224, background: "#0A0C16", borderRight: "1px solid #1E2140", display: "flex", flexDirection: "column", flexShrink: 0 }}>

        {/* Logo */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid #1E2140" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg,#4F7FFF,#00D4FF)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, boxShadow: "0 4px 12px rgba(79,127,255,0.4)",
            }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5, lineHeight: 1,
                background: "linear-gradient(135deg,#4F7FFF,#00D4FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>BLIQK</div>
              <div style={{ fontSize: 9, color: "#3A4060", letterSpacing: 0.5, marginTop: 1 }}>
                SEE WHAT NEEDS ACTION
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "10px 8px" }}>
          {NAV.map((item) => {
            const active = path === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 10, border: "none",
                  cursor: "pointer", fontFamily: "inherit",
                  fontSize: 13, fontWeight: 600, marginBottom: 2,
                  transition: "all 0.15s",
                  background: active ? "rgba(79,127,255,0.15)" : "transparent",
                  color:      active ? "#4F7FFF" : "#5A6080",
                  borderLeft: `2px solid ${active ? "#4F7FFF" : "transparent"}`,
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1E2140" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg,#4F7FFF,#7C4DFF)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 800, color: "#fff",
            }}>F</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#C0C4E0" }}>Founder</div>
              <div style={{ fontSize: 10, color: "#3A4060" }}>founder@bliqk.ai</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}
