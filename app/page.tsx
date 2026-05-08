"use client";
import { useRouter } from "next/navigation";
import { D } from "@/lib/tokens";
import { INBOX_MESSAGES } from "@/lib/data";

export default function DashboardPage() {
  const router  = useRouter();
  const critical = INBOX_MESSAGES.filter(m=>m.priority==="critical").length;
  const unread   = INBOX_MESSAGES.filter(m=>m.unread).length;
  const hotLeads = INBOX_MESSAGES.filter(m=>m.category==="hot_lead").length;

  const STATS = [
    { label:"Messages today",  value:INBOX_MESSAGES.length.toString(), icon:"📨", color:D.accent   },
    { label:"Critical",        value:critical.toString(),               icon:"🚨", color:D.danger   },
    { label:"Hot leads",       value:hotLeads.toString(),              icon:"🔥", color:D.warning  },
    { label:"Actioned",        value:"8",                               icon:"✅", color:D.success  },
  ];

  const ACTIONS = [
    { href:"/app/inbox",        icon:"📥", label:"Priority Inbox",    sub:`${unread} unread · ${critical} critical` },
    { href:"/app/capture",      icon:"✍️", label:"Smart Capture",     sub:"Paste any email to classify" },
    { href:"/app/integrations", icon:"🔌", label:"Integrations",      sub:"Gmail · Outlook · Any IMAP" },
    { href:"/app/settings",     icon:"⚙️", label:"Settings",          sub:"Theme, language & more" },
  ];

  return (
    <div style={{ padding:"32px 36px", maxWidth:860, color:D.textPrimary }}>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ margin:"0 0 6px", fontSize:24, fontWeight:700, color:D.textPrimary, fontFamily:"'Instrument Serif',serif" }}>
          Good morning 👋
        </h2>
        {/* FIXED: textBody (#C8CCDF) instead of a dim blue */}
        <p style={{ margin:0, fontSize:14, color:D.textBody }}>
          You have <strong style={{ color:D.danger }}>{critical} critical messages</strong> waiting for action today.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ background:D.card, borderRadius:16, padding:"18px 20px", border:`1px solid ${D.border}`, transition:"all 0.2s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLDivElement).style.borderColor=s.color+"40";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="none";(e.currentTarget as HTMLDivElement).style.borderColor=D.border;}}>
            <div style={{ fontSize:20, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
            {/* FIXED: textSecondary */}
            <div style={{ fontSize:12, color:D.textSecondary, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom:14 }}>
        {/* FIXED: textSecondary */}
        <div style={{ fontSize:10, fontWeight:700, color:D.textSecondary, textTransform:"uppercase", letterSpacing:1.2, marginBottom:14 }}>
          Quick actions
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {ACTIONS.map((a,i) => (
            <button key={i} onClick={() => router.push(a.href)}
              style={{ padding:"18px 20px", borderRadius:16, border:`1px solid ${D.border}`, background:D.card, color:D.textPrimary, cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"all 0.2s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=D.accent;(e.currentTarget as HTMLButtonElement).style.background=D.accentBg;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=D.border;(e.currentTarget as HTMLButtonElement).style.background=D.card;}}>
              <div style={{ fontSize:22, marginBottom:8 }}>{a.icon}</div>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:3, color:D.textPrimary }}>{a.label}</div>
              {/* FIXED: textSecondary */}
              <div style={{ fontSize:12, color:D.textSecondary }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI status */}
      <div style={{ background:D.accentBg, border:`1px solid ${D.accentBorder}`, borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:D.success, flexShrink:0, boxShadow:`0 0 8px ${D.success}` }}/>
        {/* FIXED: textBody */}
        <div style={{ fontSize:13, color:D.textBody }}>
          <strong style={{ color:D.accent }}>BLIQK AI is active</strong> — Rule classifier running. Claude AI on standby for ambiguous messages.
        </div>
      </div>
    </div>
  );
}
