"use client";
import { useRouter } from "next/navigation";
import { useSettings } from "@/lib/settings-context";
import { INBOX_MSGS } from "@/lib/data";

export default function DashboardPage() {
  const router   = useRouter();
  const { t, fs, s } = useSettings();
  const critical  = INBOX_MSGS.filter(m => m.priority==="critical").length;
  const unread    = INBOX_MSGS.filter(m => m.unread).length;
  const hotLeads  = INBOX_MSGS.filter(m => m.cat==="hot_lead").length;

  const STATS = [
    { label:s.messages, value:INBOX_MSGS.length.toString(), icon:"📨", color:t.accent  },
    { label:s.critical, value:critical.toString(),          icon:"🚨", color:t.danger  },
    { label:s.leads,    value:hotLeads.toString(),          icon:"🔥", color:t.warning },
    { label:"Actioned", value:"8",                          icon:"✅", color:t.success },
  ];

  const ACTIONS = [
    { href:"/app/inbox",        icon:"📥", label:s.priorityInbox,  sub:`${unread} ${s.unread} · ${critical} ${s.critical}` },
    { href:"/app/capture",      icon:"✍️", label:s.capture,        sub:"Paste any email to classify" },
    { href:"/app/integrations", icon:"🔌", label:s.integrations,   sub:"Gmail · Outlook · Any IMAP" },
    { href:"/app/settings",     icon:"⚙️", label:s.settings,       sub:"Theme, language & more" },
  ];

  return (
    <div style={{ padding:"32px 36px", maxWidth:860, color:t.textPrimary }}>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ margin:"0 0 6px", fontSize:24, fontWeight:700, fontFamily:"'Instrument Serif',serif", color:t.textPrimary }}>{s.goodMorning} 👋</h2>
        <p style={{ margin:0, fontSize:fs.sm, color:t.textBody }}>
          You have <strong style={{ color:t.danger }}>{critical} {s.criticalWaiting}</strong>
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ background:t.card, borderRadius:16, padding:"18px 20px", border:`1px solid ${t.border}`, transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor=s.color+"40"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform="none"; (e.currentTarget as HTMLDivElement).style.borderColor=t.border; }}>
            <div style={{ fontSize:20, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:12, color:t.textSecondary, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1.2, marginBottom:14 }}>{s.quickActions}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:20 }}>
        {ACTIONS.map((a,i) => (
          <button key={i} onClick={() => router.push(a.href)}
            style={{ padding:"18px 20px", borderRadius:16, border:`1px solid ${t.border}`, background:t.card, color:t.textPrimary, cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=t.accent; (e.currentTarget as HTMLButtonElement).style.background=t.accentBg; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=t.border; (e.currentTarget as HTMLButtonElement).style.background=t.card; }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{a.icon}</div>
            <div style={{ fontSize:fs.base, fontWeight:700, marginBottom:3, color:t.textPrimary }}>{a.label}</div>
            <div style={{ fontSize:fs.sm, color:t.textSecondary }}>{a.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`, borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:t.success, boxShadow:`0 0 8px ${t.success}`, flexShrink:0 }}/>
        <div style={{ fontSize:fs.sm, color:t.textBody }}>
          <strong style={{ color:t.accent }}>{s.aiActive}</strong> — {s.aiActiveDesc}
        </div>
      </div>
    </div>
  );
}
