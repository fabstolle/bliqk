"use client";
import { useRouter } from "next/navigation";

const STATS = [
  { label: "Messages today",  value: "23",  icon: "📨", color: "#4F7FFF", bg: "#F0F6FF1A" },
  { label: "Critical",        value: "2",   icon: "🚨", color: "#FF1744", bg: "#FF17441A" },
  { label: "Hot leads",       value: "3",   icon: "🔥", color: "#FF6D00", bg: "#FF6D001A" },
  { label: "Actioned today",  value: "8",   icon: "✅", color: "#00C853", bg: "#00C8531A" },
];

const QUICK_ACTIONS = [
  { href: "/app/inbox",   icon: "📥", label: "Priority Inbox",   sub: "2 critical messages waiting"  },
  { href: "/app/capture", icon: "✍️", label: "Smart Capture",    sub: "Paste any email to classify"  },
  { href: "/app/integrations", icon: "🔌", label: "Integrations", sub: "Gmail · Outlook · Webhook" },
  { href: "/app/usage",   icon: "📊", label: "Usage & Costs",    sub: "AI calls · tokens · budget"   },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#E8EAF6" }}>
          Good morning 👋
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "#4A5080" }}>
          You have <strong style={{ color: "#FF1744" }}>2 critical messages</strong> waiting for action today.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            background: "#12152A", borderRadius: 16,
            padding: "18px 20px", border: "1px solid #1E2140",
            transition: "all 0.2s", cursor: "default",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 12 }}>
              {s.icon}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#4A5080", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#3A4060", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>
          QUICK ACTIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <button key={i} onClick={() => router.push(a.href)}
              style={{
                padding: "18px 20px", borderRadius: 16,
                border: "1px solid #1E2140", background: "#12152A",
                color: "#E8EAF6", cursor: "pointer", fontFamily: "inherit",
                textAlign: "left", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#4F7FFF"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(79,127,255,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#1E2140"; (e.currentTarget as HTMLButtonElement).style.background = "#12152A"; }}
            >
              <div style={{ fontSize: 22, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: "#4A5080" }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI status banner */}
      <div style={{
        background: "rgba(79,127,255,0.06)", border: "1px solid rgba(79,127,255,0.15)",
        borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C853", flexShrink: 0,
          boxShadow: "0 0 8px #00C853", animation: "pulse 2s infinite" }}/>
        <div style={{ fontSize: 13, color: "#6B7299" }}>
          <strong style={{ color: "#4F7FFF" }}>BLIQK AI is active</strong> — Rule classifier running. Claude AI on standby for ambiguous messages.
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
