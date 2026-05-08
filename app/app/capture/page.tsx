"use client";
import { useState } from "react";

const C_COLOR: Record<string, string> = { legal_risk:"#FF1744", complaint:"#FF6D00", hot_lead:"#00C853", warm_lead:"#00B0FF", normal:"#8C8CB4" };
const C_LABEL: Record<string, string> = { legal_risk:"⚖️ Legal Risk", complaint:"😤 Complaint", hot_lead:"🔥 Hot Lead", warm_lead:"⚡ Warm Lead", normal:"📨 Normal" };
const P_COLOR: Record<string, string> = { critical:"#FF1744", high:"#FF6D00", medium:"#FFD600", low:"#00C853" };

export default function CapturePage() {
  const [sender,  setSender]  = useState("");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [result,  setResult]  = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleClassify = async () => {
    if (!body.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderName: sender, senderEmail: sender, subject, bodyText: body }),
      });
      const data = await res.json();
      setResult(data.classification || data);
    } catch {
      setError("Error connecting. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: 700 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>Smart Capture ✍️</h2>
        <p style={{ margin: 0, fontSize: 13, color: "#4A5080" }}>Paste any email or message — BLIQK classifies it instantly.</p>
      </div>

      <div style={{ background: "#12152A", borderRadius: 16, padding: 24, border: "1px solid #1E2140", marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {[
            { label: "Sender", value: sender, set: setSender, placeholder: "email@company.com" },
            { label: "Subject", value: subject, set: setSubject, placeholder: "Message subject" },
          ].map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4A5080", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{f.label}</div>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #2A2D4A", background: "#0D0F1A", color: "#E8EAF6", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const }}/>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#4A5080", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Message Body</div>
        <textarea
          value={body} onChange={e => setBody(e.target.value)}
          placeholder="Paste the email content here..."
          style={{ width: "100%", height: 160, padding: 12, borderRadius: 8, border: "1px solid #2A2D4A", background: "#0D0F1A", color: "#E8EAF6", fontSize: 13, outline: "none", fontFamily: "inherit", resize: "vertical" as const, boxSizing: "border-box" as const }}
        />

        {error && (
          <div style={{ background: "rgba(255,23,68,0.1)", border: "1px solid rgba(255,23,68,0.2)", borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 12, color: "#FF1744" }}>{error}</div>
        )}

        <button onClick={handleClassify} disabled={loading || !body.trim()}
          style={{
            width: "100%", marginTop: 14, padding: 13, border: "none", borderRadius: 12,
            background: loading || !body.trim() ? "#1A1D30" : "linear-gradient(135deg,#4F7FFF,#00D4FF)",
            color: loading || !body.trim() ? "#3A4060" : "#fff",
            fontSize: 14, fontWeight: 800, cursor: loading || !body.trim() ? "default" : "pointer",
            fontFamily: "inherit", letterSpacing: 0.3,
            boxShadow: loading || !body.trim() ? "none" : "0 4px 16px rgba(79,127,255,0.3)",
            transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
          {loading ? "⟳ Classifying with BLIQK AI..." : "⚡ Classify & Save to Inbox"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ background: "rgba(79,127,255,0.05)", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(79,127,255,0.15)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4F7FFF", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>⚡ BLIQK Result</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 }}>
            {[
              { label: "Category", value: C_LABEL[result.category] || result.category, color: C_COLOR[result.category] },
              { label: "Priority", value: result.priority, color: P_COLOR[result.priority] },
              { label: "Score", value: `${result.score} / 100`, color: "#4F7FFF" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#12152A", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 10, color: "#3A4060", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#8B90A8", lineHeight: 1.7 }}>
            <strong style={{ color: "#00C853" }}>Action: </strong>{result.recommendedAction}<br/>
            <strong style={{ color: "#4F7FFF" }}>Reason: </strong>{result.reason}
          </div>
          {result.alerts?.length > 0 && (
            <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              {result.alerts.map((a: string, i: number) => (
                <span key={i} style={{ background: "rgba(255,23,68,0.1)", color: "#FF1744", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>⚠️ {a}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
