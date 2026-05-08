"use client";
import { useState } from "react";

const MESSAGES = [
  {
    id: 1, from: "Pedro Sánchez", email: "pedro@construyemas.cl",
    subject: "URGENT: Invoice #4521 unresolved — calling my lawyer today",
    body: "I have been waiting 3 weeks for a response about invoice #4521. I paid $1,200 and the service was never delivered correctly. If I don't receive a response TODAY, I will escalate this to my attorney and leave a review on Google.",
    category: "legal_risk", priority: "critical", score: 97, confidence: 95,
    time: "25 min ago", aiUsed: false, status: "unread",
    action: "Respond within 2 hours. Escalate to management. Document everything.",
    reason: "Explicit legal threat + third contact attempt + review threat.",
    alerts: ["Legal threat", "Review threat", "Third contact"],
  },
  {
    id: 2, from: "Valentina Cruz", email: "vale@modavt.com",
    subject: "Annual plan discount? + referrals",
    body: "Hi! We have been using your service for 3 months and the results have been incredible. I wanted to ask if you offer a discount for paying the full year upfront. Also, do you have a referral program? I have two business owner friends who might be interested.",
    category: "hot_lead", priority: "high", score: 88, confidence: 91,
    time: "1h ago", aiUsed: false, status: "unread",
    action: "Call today. Offer 20% annual discount + referral program.",
    reason: "Happy active customer + upgrade intent + 3 potential referrals.",
    alerts: ["Upsell opportunity", "3 potential referrals"],
  },
  {
    id: 3, from: "Rodrigo Paz", email: "rpaz@techsol.cl",
    subject: "Critical error — lost data before investor presentation",
    body: "Good afternoon. Today when trying to export the monthly report, the system returned an error and it appears that the records from the last week were lost. This is critical for us as we have a presentation tomorrow with investors. Please I need urgent help.",
    category: "complaint", priority: "critical", score: 92, confidence: 88,
    time: "2h ago", aiUsed: true, status: "unread",
    action: "Immediate technical support. Recover data. Offer service credit.",
    reason: "Critical technical error + investor presentation tomorrow + high churn risk.",
    alerts: ["Data loss reported", "Investor presentation", "High churn risk"],
  },
  {
    id: 4, from: "Camila Rojas", email: "camila@startup.io",
    subject: "Question about Salesforce integration",
    body: "Hello team, we are evaluating tools and I was wondering if you have native integration with Salesforce. We are a 25-person startup and would be handling about 500 emails per month.",
    category: "warm_lead", priority: "medium", score: 65, confidence: 82,
    time: "3h ago", aiUsed: false, status: "read",
    action: "Reply with integration roadmap. Schedule a demo.",
    reason: "Qualified lead with purchase intent. Appropriate company size.",
    alerts: [],
  },
];

const P_COLOR: Record<string, string> = { critical: "#FF1744", high: "#FF6D00", medium: "#FFD600", low: "#00C853" };
const C_COLOR: Record<string, string> = { legal_risk: "#FF1744", complaint: "#FF6D00", hot_lead: "#00C853", warm_lead: "#00B0FF", normal: "#8C8CB4" };
const C_LABEL: Record<string, string> = { legal_risk: "⚖️ Legal Risk", complaint: "😤 Complaint", hot_lead: "🔥 Hot Lead", warm_lead: "⚡ Warm Lead", normal: "📨 Normal" };
const FILTERS = [
  { id: "all",       label: "All"         },
  { id: "critical",  label: "🚨 Critical" },
  { id: "complaints",label: "😤 Complaints"},
  { id: "hot_leads", label: "🔥 Hot Leads" },
  { id: "unread",    label: "● Unread"    },
];

export default function InboxPage() {
  const [selected, setSelected] = useState<typeof MESSAGES[0] | null>(null);
  const [filter,   setFilter]   = useState("all");
  const [reply,    setReply]    = useState("");
  const [loading,  setLoading]  = useState<string | null>(null);
  const [messages, setMessages] = useState(MESSAGES);

  const filtered = messages.filter((m) => {
    if (filter === "all")        return true;
    if (filter === "critical")   return m.priority === "critical";
    if (filter === "complaints") return ["complaint","legal_risk"].includes(m.category);
    if (filter === "hot_leads")  return m.category === "hot_lead";
    if (filter === "unread")     return m.status === "unread";
    return true;
  });

  const generateReply = async (msg: typeof MESSAGES[0]) => {
    setLoading("reply");
    setReply("");
    try {
      const res = await fetch("/api/messages/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: msg.subject, body: msg.body, category: msg.category, priority: msg.priority, from: msg.from }),
      });
      const data = await res.json();
      setReply(data.reply || "Unable to generate reply.");
    } catch {
      setReply("Error connecting to AI. Please try again.");
    }
    setLoading(null);
  };

  const reanalyze = async (msg: typeof MESSAGES[0]) => {
    setLoading("analyze");
    try {
      const res = await fetch("/api/messages/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: msg.subject, body: msg.body }),
      });
      const data = await res.json();
      if (data.result) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, ...data.result, aiUsed: true } : m));
        setSelected(prev => prev ? { ...prev, ...data.result, aiUsed: true } : prev);
      }
    } catch { /* silent */ }
    setLoading(null);
  };

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>

      {/* Message list */}
      <div style={{ width: 360, borderRight: "1px solid #1E2140", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 18px 14px", borderBottom: "1px solid #1E2140" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Priority Inbox</h2>
            <span style={{ fontSize: 11, color: "#3A4060", fontFamily: "monospace" }}>{filtered.length} messages</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: "4px 10px", borderRadius: 99, border: `1px solid ${filter === f.id ? "#4F7FFF" : "#2A2D4A"}`,
                background: filter === f.id ? "rgba(79,127,255,0.15)" : "transparent",
                color: filter === f.id ? "#4F7FFF" : "#4A5080",
                fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>{f.label}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.map(msg => (
            <div key={msg.id}
              onClick={() => { setSelected(msg); setReply(""); setMessages(p => p.map(m => m.id === msg.id ? { ...m, status: "read" } : m)); }}
              style={{
                padding: "14px 18px", borderBottom: "1px solid #1A1D30", cursor: "pointer",
                borderLeft: `3px solid ${P_COLOR[msg.priority]}`,
                background: selected?.id === msg.id ? "rgba(79,127,255,0.08)" : msg.status === "unread" ? "rgba(255,255,255,0.02)" : "transparent",
                transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: msg.status === "unread" ? 700 : 500, fontSize: 13, color: msg.status === "unread" ? "#E8EAF6" : "#8B90A8" }}>{msg.from}</span>
                <span style={{ fontSize: 10, color: "#3A4060", fontFamily: "monospace" }}>{msg.time}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8B90A8", marginBottom: 7, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{msg.subject}</div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span style={{ background: `${C_COLOR[msg.category]}18`, color: C_COLOR[msg.category], padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 }}>{C_LABEL[msg.category]}</span>
                <span style={{ background: `${P_COLOR[msg.priority]}18`, color: P_COLOR[msg.priority], padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 }}>{msg.priority}</span>
                {msg.aiUsed && <span style={{ background: "rgba(124,77,255,0.15)", color: "#7C4DFF", padding: "2px 6px", borderRadius: 99, fontSize: 9, fontWeight: 700 }}>AI</span>}
                {msg.status === "unread" && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4F7FFF", marginLeft: "auto" }}/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {!selected ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#2A2D4A", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 36 }}>⚡</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#3A3D60" }}>Select a message</div>
            <div style={{ fontSize: 12, color: "#2A2D4A" }}>BLIQK shows you what needs action first</div>
          </div>
        ) : (
          <div style={{ padding: "24px 28px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, lineHeight: 1.3, flex: 1 }}>{selected.subject}</h3>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => reanalyze(selected)} disabled={loading === "analyze"}
                  style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #2A2D4A", background: "transparent", color: "#7C4DFF", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {loading === "analyze" ? "⟳ Analyzing..." : "🤖 Re-analyze"}
                </button>
                <button onClick={() => generateReply(selected)} disabled={loading === "reply"}
                  style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#4F7FFF,#00D4FF)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(79,127,255,0.3)" }}>
                  {loading === "reply" ? "⟳ Generating..." : "✍️ Generate reply"}
                </button>
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              <span style={{ background: `${C_COLOR[selected.category]}18`, color: C_COLOR[selected.category], padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{C_LABEL[selected.category]}</span>
              <span style={{ background: `${P_COLOR[selected.priority]}18`, color: P_COLOR[selected.priority], padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{selected.priority}</span>
              {selected.aiUsed && <span style={{ background: "rgba(124,77,255,0.15)", color: "#7C4DFF", padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 }}>🤖 AI classified</span>}
              <span style={{ background: "rgba(79,127,255,0.1)", color: "#4F7FFF", padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>Score: {selected.score}</span>
            </div>

            {/* Sender */}
            <div style={{ background: "#12152A", borderRadius: 12, padding: "12px 16px", marginBottom: 14, border: "1px solid #1E2140" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>From</div><div style={{ fontSize: 12, color: "#8B90A8", fontFamily: "monospace" }}>{selected.from} &lt;{selected.email}&gt;</div></div>
                <div><div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Time</div><div style={{ fontSize: 12, color: "#8B90A8" }}>{selected.time}</div></div>
              </div>
            </div>

            {/* Body */}
            <div style={{ background: "#12152A", borderRadius: 12, padding: "16px 18px", marginBottom: 14, border: "1px solid #1E2140" }}>
              <div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Message</div>
              <div style={{ fontSize: 14, color: "#A0A4C0", lineHeight: 1.7, fontStyle: "italic" }}>"{selected.body}"</div>
            </div>

            {/* BLIQK Analysis */}
            <div style={{ background: "rgba(79,127,255,0.05)", borderRadius: 12, padding: "16px 18px", marginBottom: 14, border: "1px solid rgba(79,127,255,0.12)" }}>
              <div style={{ fontSize: 10, color: "#4F7FFF", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>⚡ BLIQK ANALYSIS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Recommended Action</div>
                  <div style={{ background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#00C853", fontWeight: 600, lineHeight: 1.5 }}>{selected.action}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Reason</div>
                  <div style={{ fontSize: 12, color: "#8B90A8", lineHeight: 1.6 }}>{selected.reason}</div>
                </div>
              </div>
              {selected.alerts.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Alerts</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selected.alerts.map((a, i) => (
                      <span key={i} style={{ background: "rgba(255,23,68,0.1)", color: "#FF1744", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>⚠️ {a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Reply */}
            {reply && (
              <div style={{ background: "#12152A", borderRadius: 16, padding: "20px", border: "1px solid rgba(79,127,255,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#4F7FFF,#00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✍️</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>AI Draft Reply</div>
                    <div style={{ fontSize: 11, color: "#3A4060" }}>Review before sending</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.85, color: "#A0A4C0", whiteSpace: "pre-wrap", borderTop: "1px solid #1E2140", paddingTop: 14 }}>{reply}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                  <button onClick={() => navigator.clipboard?.writeText(reply)}
                    style={{ padding: 10, borderRadius: 8, border: "1px solid #2A2D4A", background: "transparent", color: "#4F7FFF", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📋 Copy</button>
                  <button style={{ padding: 10, borderRadius: 8, border: "none", background: "linear-gradient(135deg,#00C853,#00E676)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✅ Approve draft</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
