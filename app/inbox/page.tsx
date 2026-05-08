"use client";
import { useState } from "react";
import { D } from "@/lib/tokens";
import { INBOX_MESSAGES, PRIORITY_COLOR, CATEGORY_COLOR, CATEGORY_LABEL } from "@/lib/data";

const Pill = ({children,bg,color,size=10}:any) => (
  <span style={{background:bg,color,padding:"2px 8px",borderRadius:99,fontSize:size,fontWeight:700,display:"inline-flex",alignItems:"center",gap:3}}>{children}</span>
);
const Label = ({children}:any) => (
  <div style={{fontSize:10,fontWeight:700,color:D.textSecondary,textTransform:"uppercase",letterSpacing:1.2,marginBottom:7}}>{children}</div>
);

const FILTERS = [
  {id:"all",      l:"All"},
  {id:"critical", l:"🚨 Critical"},
  {id:"issues",   l:"😤 Issues"},
  {id:"leads",    l:"🔥 Leads"},
  {id:"unread",   l:"● Unread"},
];

export default function InboxPage() {
  const [messages, setMessages] = useState(INBOX_MESSAGES);
  const [selected, setSelected] = useState<typeof INBOX_MESSAGES[0]|null>(null);
  const [filter,   setFilter]   = useState("all");
  const [aiReply,  setAiReply]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState("");

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(""),2500); };

  const filtered = messages.filter(m => {
    if (filter==="all")      return true;
    if (filter==="critical") return m.priority==="critical";
    if (filter==="issues")   return ["complaint","legal_risk"].includes(m.category);
    if (filter==="leads")    return ["hot_lead","warm_lead"].includes(m.category);
    if (filter==="unread")   return m.unread;
    return true;
  });

  const generateReply = async (msg: typeof INBOX_MESSAGES[0]) => {
    setLoading(true); setAiReply("");
    try {
      const res = await fetch("/api/messages/reply", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ subject:msg.sub, from:msg.from, category:msg.category, priority:msg.priority }),
      });
      const data = await res.json();
      setAiReply(data.reply||"");
      showToast("Draft generated ✓");
    } catch { showToast("Error — check API key"); }
    setLoading(false);
  };

  return (
    <div style={{display:"flex",height:"100%",overflow:"hidden",position:"relative"}}>
      {toast&&<div style={{position:"fixed",top:16,right:16,zIndex:9999,background:D.success,color:"#fff",padding:"9px 16px",borderRadius:9,fontSize:13,fontWeight:700,animation:"fadeUp 0.3s ease"}}>{toast}</div>}

      {/* ── List ── */}
      <div style={{width:340,borderRight:`1px solid ${D.border}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"18px 16px 12px",borderBottom:`1px solid ${D.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <h2 style={{margin:0,fontSize:17,fontWeight:700,color:D.textPrimary}}>Priority Inbox</h2>
            {/* FIXED: textSecondary */}
            <span style={{fontSize:11,color:D.textSecondary,fontFamily:"monospace"}}>{filtered.length} msgs</span>
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {FILTERS.map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)}
                style={{padding:"3px 10px",borderRadius:99,border:`1px solid ${filter===f.id?D.accent:D.border}`,background:filter===f.id?D.accentBg:"transparent",color:filter===f.id?D.accent:D.textSecondary,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {f.l}
              </button>
            ))}
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto"}}>
          {filtered.map((msg,i)=>(
            <div key={i} onClick={()=>{setSelected(msg);setAiReply("");setMessages(p=>p.map(m=>m.id===msg.id?{...m,unread:false}:m));}}
              style={{padding:"12px 16px",borderBottom:`1px solid ${D.border}`,cursor:"pointer",borderLeft:`3px solid ${PRIORITY_COLOR[msg.priority]}`,background:selected?.id===msg.id?D.accentBg:msg.unread?"rgba(255,255,255,0.015)":"transparent",transition:"background 0.15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontWeight:msg.unread?700:500,fontSize:13,color:msg.unread?D.textPrimary:D.textSecondary}}>{msg.from}</span>
                {/* FIXED: textSecondary instead of textTertiary */}
                <span style={{fontSize:10,color:D.textSecondary,fontFamily:"monospace"}}>{msg.time}</span>
              </div>
              {/* FIXED: textSecondary */}
              <div style={{fontSize:12,color:D.textSecondary,marginBottom:7,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{msg.sub}</div>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                <Pill bg={`${CATEGORY_COLOR[msg.category]}18`} color={CATEGORY_COLOR[msg.category]}>{CATEGORY_LABEL[msg.category]}</Pill>
                <Pill bg={`${PRIORITY_COLOR[msg.priority]}18`} color={PRIORITY_COLOR[msg.priority]}>{msg.priority}</Pill>
                {msg.unread&&<div style={{width:6,height:6,borderRadius:"50%",background:D.accent,marginLeft:"auto"}}/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail ── */}
      <div style={{flex:1,overflowY:"auto"}}>
        {!selected ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:10}}>
            <div style={{fontSize:40}}>⚡</div>
            <div style={{fontSize:15,fontWeight:600,color:D.textSecondary}}>Select a message</div>
            <div style={{fontSize:13,color:D.textSecondary}}>BLIQK shows you what needs action first</div>
          </div>
        ) : (
          <div style={{padding:"26px 28px"}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:14}}>
              <h3 style={{margin:0,fontSize:17,fontWeight:700,lineHeight:1.3,flex:1,color:D.textPrimary}}>{selected.sub}</h3>
              <button onClick={()=>generateReply(selected)} disabled={loading}
                style={{padding:"8px 16px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#4F7FFF,#00D4FF)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0,boxShadow:"0 4px 14px rgba(79,127,255,0.3)"}}>
                {loading?"⟳ Generating...":"✍️ Generate reply"}
              </button>
            </div>

            {/* Badges */}
            <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
              <Pill bg={`${CATEGORY_COLOR[selected.category]}18`} color={CATEGORY_COLOR[selected.category]} size={12}>{CATEGORY_LABEL[selected.category]}</Pill>
              <Pill bg={`${PRIORITY_COLOR[selected.priority]}18`} color={PRIORITY_COLOR[selected.priority]} size={12}>{selected.priority}</Pill>
              <Pill bg={D.accentBg} color={D.accent} size={11}>Score: {selected.score}</Pill>
            </div>

            {/* Meta */}
            <div style={{background:D.card,borderRadius:12,padding:"12px 16px",marginBottom:14,border:`1px solid ${D.border}`}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><Label>From</Label><div style={{fontSize:12,color:D.textBody}}>{selected.from} · {selected.co}</div></div>
                <div><Label>Received</Label><div style={{fontSize:12,color:D.textBody}}>{selected.time} ago</div></div>
              </div>
            </div>

            {/* Analysis */}
            <div style={{background:D.accentBg,borderRadius:12,padding:"16px 18px",marginBottom:14,border:`1px solid ${D.accentBorder}`}}>
              <Label>⚡ BLIQK Analysis</Label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <Label>Recommended action</Label>
                  <div style={{background:"rgba(0,214,143,0.08)",border:"1px solid rgba(0,214,143,0.2)",borderRadius:10,padding:"12px",fontSize:13,color:D.success,fontWeight:600,lineHeight:1.5}}>{selected.action}</div>
                </div>
                <div>
                  <Label>Flags</Label>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {selected.alerts.length>0?selected.alerts.map((a:string,i:number)=>(
                      <div key={i} style={{background:"rgba(255,61,90,0.08)",border:"1px solid rgba(255,61,90,0.18)",borderRadius:8,padding:"7px 11px",fontSize:12,color:D.danger,fontWeight:600}}>⚠️ {a}</div>
                    )):<div style={{background:"rgba(0,214,143,0.06)",border:"1px solid rgba(0,214,143,0.15)",borderRadius:8,padding:"7px 11px",fontSize:12,color:D.success,fontWeight:600}}>✓ No flags</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* AI reply */}
            {aiReply&&(
              <div style={{background:D.card,borderRadius:14,padding:"20px",border:`1px solid ${D.accentBorder}`}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#4F7FFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✍️</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:D.textPrimary}}>AI Draft Reply</div>
                    {/* FIXED: textSecondary */}
                    <div style={{fontSize:11,color:D.textSecondary}}>Review before sending</div>
                  </div>
                </div>
                <div style={{fontSize:13,lineHeight:1.85,color:D.textBody,whiteSpace:"pre-wrap",borderTop:`1px solid ${D.border}`,paddingTop:14}}>{aiReply}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
                  <button onClick={()=>{navigator.clipboard?.writeText(aiReply);showToast("Copied ✓");}} style={{padding:10,borderRadius:8,border:`1px solid ${D.border}`,background:"transparent",color:D.accent,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy</button>
                  <button style={{padding:10,borderRadius:8,border:"none",background:"linear-gradient(135deg,#00D68F,#00B4D8)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✅ Approve</button>
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
