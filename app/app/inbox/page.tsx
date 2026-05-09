"use client";
import { useState } from "react";
import { useSettings } from "@/lib/settings-context";
import { INBOX_MSGS, PC, CC, CL_EN, CL_ES } from "@/lib/data";

export default function InboxPage() {
  const { t, fs, s, language } = useSettings();
  const [msgs,     setMsgs]     = useState(INBOX_MSGS);
  const [selected, setSelected] = useState<typeof INBOX_MSGS[0]|null>(null);
  const [filter,   setFilter]   = useState("all");
  const [aiReply,  setAiReply]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState("");

  const CL = language==="en" ? CL_EN : CL_ES;
  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(""),2500); };

  const filtered = msgs.filter(m => {
    if (filter==="all")      return true;
    if (filter==="critical") return m.priority==="critical";
    if (filter==="issues")   return ["complaint","legal_risk"].includes(m.cat);
    if (filter==="leads")    return ["hot_lead","warm_lead"].includes(m.cat);
    if (filter==="unread")   return m.unread;
    return true;
  });

  const FILTERS = [
    { id:"all",      l:s.all },
    { id:"critical", l:`🚨 ${s.critical}` },
    { id:"issues",   l:`😤 ${s.issues}` },
    { id:"leads",    l:`🔥 ${s.leads}` },
    { id:"unread",   l:`● ${s.unread}` },
  ];

  const genReply = async (msg: typeof INBOX_MSGS[0]) => {
    setLoading(true); setAiReply("");
    try {
      const res = await fetch("/api/messages/reply", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ subject:msg.sub, from:msg.from, category:msg.cat, priority:msg.priority, language }),
      });
      const data = await res.json();
      setAiReply(data.reply||"");
      showToast(s.copied);
    } catch { showToast("Error — check API key"); }
    setLoading(false);
  };

  const Pill = ({children,bg,color,size=10}:any) => (
    <span style={{background:bg,color,padding:"2px 8px",borderRadius:99,fontSize:size,fontWeight:700,display:"inline-flex",alignItems:"center",gap:3}}>{children}</span>
  );
  const Lbl = ({children}:any) => (
    <div style={{fontSize:10,fontWeight:700,color:t.textSecondary,textTransform:"uppercase" as const,letterSpacing:1.2,marginBottom:7}}>{children}</div>
  );

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden", position:"relative" }}>
      {toast && <div style={{ position:"fixed", top:16, right:16, zIndex:9999, background:t.success, color:"#fff", padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700, animation:"fadeUp 0.3s ease" }}>{toast}</div>}

      {/* List */}
      <div style={{ width:340, borderRight:`1px solid ${t.border}`, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ padding:"18px 16px 12px", borderBottom:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:t.textPrimary }}>{s.priorityInbox}</h2>
            <span style={{ fontSize:11, color:t.textSecondary, fontFamily:"monospace" }}>{filtered.length} {s.msgs}</span>
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                style={{ padding:"3px 10px", borderRadius:99, border:`1px solid ${filter===f.id?t.accent:t.border}`, background:filter===f.id?t.accentBg:"transparent", color:filter===f.id?t.accent:t.textSecondary, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                {f.l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto" }}>
          {filtered.map((msg,i) => (
            <div key={i}
              onClick={() => { setSelected(msg); setAiReply(""); setMsgs(p => p.map(m => m.id===msg.id?{...m,unread:false}:m)); }}
              style={{ padding:"12px 16px", borderBottom:`1px solid ${t.border}`, cursor:"pointer", borderLeft:`3px solid ${PC[msg.priority]}`, background:selected?.id===msg.id?t.accentBg:msg.unread?"rgba(255,255,255,0.015)":"transparent", transition:"background 0.15s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontWeight:msg.unread?700:500, fontSize:fs.sm, color:msg.unread?t.textPrimary:t.textSecondary }}>{msg.from}</span>
                <span style={{ fontSize:10, color:t.textSecondary, fontFamily:"monospace" }}>{msg.time}</span>
              </div>
              <div style={{ fontSize:12, color:t.textSecondary, marginBottom:7, overflow:"hidden", whiteSpace:"nowrap" as const, textOverflow:"ellipsis" }}>{msg.sub}</div>
              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                <Pill bg={`${CC[msg.cat]}18`} color={CC[msg.cat]}>{CL[msg.cat]}</Pill>
                <Pill bg={`${PC[msg.priority]}18`} color={PC[msg.priority]}>{msg.priority}</Pill>
                {msg.unread && <div style={{ width:6, height:6, borderRadius:"50%", background:t.accent, marginLeft:"auto" }}/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {!selected ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:8 }}>
            <div style={{ fontSize:40 }}>⚡</div>
            <div style={{ fontSize:15, fontWeight:600, color:t.textSecondary }}>{s.selectMsg}</div>
            <div style={{ fontSize:13, color:t.textSecondary }}>{s.bliqkShows}</div>
          </div>
        ) : (
          <div style={{ padding:"26px 28px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:14 }}>
              <h3 style={{ margin:0, fontSize:17, fontWeight:700, lineHeight:1.3, flex:1, color:t.textPrimary }}>{selected.sub}</h3>
              <button onClick={() => genReply(selected)} disabled={loading}
                style={{ padding:"8px 16px", borderRadius:9, border:"none", background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", flexShrink:0, boxShadow:`0 4px 14px ${t.accent}30` }}>
                {loading ? s.generating : s.genReply}
              </button>
            </div>

            <div style={{ display:"flex", gap:7, marginBottom:18, flexWrap:"wrap" }}>
              <Pill bg={`${CC[selected.cat]}18`} color={CC[selected.cat]} size={12}>{CL[selected.cat]}</Pill>
              <Pill bg={`${PC[selected.priority]}18`} color={PC[selected.priority]} size={12}>{selected.priority}</Pill>
              <Pill bg={t.accentBg} color={t.accent} size={11}>Score: {selected.score}</Pill>
            </div>

            <div style={{ background:t.card, borderRadius:12, padding:"12px 16px", marginBottom:14, border:`1px solid ${t.border}` }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div><Lbl>{s.fromLabel}</Lbl><div style={{ fontSize:12, color:t.textBody }}>{selected.from} · {selected.co}</div></div>
                <div><Lbl>{s.timeLabel}</Lbl><div style={{ fontSize:12, color:t.textBody }}>{selected.time} ago</div></div>
              </div>
            </div>

            <div style={{ background:t.accentBg, borderRadius:12, padding:"16px 18px", marginBottom:14, border:`1px solid ${t.accentBorder}` }}>
              <Lbl>{s.bliqkAnalysis}</Lbl>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div>
                  <Lbl>{s.recActionLabel}</Lbl>
                  <div style={{ background:`${t.success}12`, border:`1px solid ${t.success}30`, borderRadius:10, padding:"12px", fontSize:13, color:t.success, fontWeight:600, lineHeight:1.5 }}>{selected.action}</div>
                </div>
                <div>
                  <Lbl>{s.alertsLabel}</Lbl>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {selected.alerts.length > 0 ? selected.alerts.map((a,i) => (
                      <div key={i} style={{ background:`${t.danger}10`, border:`1px solid ${t.danger}25`, borderRadius:8, padding:"7px 11px", fontSize:12, color:t.danger, fontWeight:600 }}>⚠️ {a}</div>
                    )) : (
                      <div style={{ background:`${t.success}08`, border:`1px solid ${t.success}20`, borderRadius:8, padding:"7px 11px", fontSize:12, color:t.success, fontWeight:600 }}>✓ No flags</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {aiReply && (
              <div style={{ background:t.card, borderRadius:14, padding:"20px", border:`1px solid ${t.accentBorder}` }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>✍️</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:t.textPrimary }}>{s.aiDraft}</div>
                    <div style={{ fontSize:11, color:t.textSecondary }}>{s.reviewBefore}</div>
                  </div>
                </div>
                <div style={{ fontSize:13, lineHeight:1.85, color:t.textBody, whiteSpace:"pre-wrap" as const, borderTop:`1px solid ${t.border}`, paddingTop:14 }}>{aiReply}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:14 }}>
                  <button onClick={() => { navigator.clipboard?.writeText(aiReply); showToast(s.copied); }}
                    style={{ padding:10, borderRadius:8, border:`1px solid ${t.border}`, background:"transparent", color:t.accent, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{s.copy}</button>
                  <button style={{ padding:10, borderRadius:8, border:"none", background:`linear-gradient(135deg,${t.success},#00B4D8)`, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{s.approve}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
