"use client";
import { useState } from "react";
import { D } from "@/lib/tokens";

const Label = ({children}:any) => (
  <div style={{fontSize:10,fontWeight:700,color:D.textSecondary,textTransform:"uppercase",letterSpacing:1.2,marginBottom:7}}>{children}</div>
);

export default function CapturePage() {
  const [sender,  setSender]  = useState("");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [result,  setResult]  = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState("");

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(""),2500); };

  const classify = async () => {
    if (!body.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({senderName:sender,senderEmail:sender,subject,bodyText:body})});
      const data = await res.json();
      setResult(data.classification);
      showToast("Classified & saved ✓");
    } catch { showToast("Error"); }
    setLoading(false);
  };

  const inp:React.CSSProperties = {width:"100%",padding:"10px 12px",borderRadius:9,border:`1px solid ${D.border}`,background:"rgba(255,255,255,0.04)",color:D.textPrimary,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};

  return (
    <div style={{padding:"32px 36px",maxWidth:700,color:D.textPrimary}}>
      {toast&&<div style={{position:"fixed",top:16,right:16,zIndex:9999,background:D.success,color:"#fff",padding:"9px 16px",borderRadius:9,fontSize:13,fontWeight:700}}>{toast}</div>}
      <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,fontFamily:"'Instrument Serif',serif"}}>Smart Capture ✍️</h2>
      <p style={{margin:"0 0 24px",fontSize:14,color:D.textBody}}>Paste any email — BLIQK classifies it instantly.</p>
      <div style={{background:D.card,borderRadius:16,padding:24,border:`1px solid ${D.border}`,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div><Label>Sender</Label><input value={sender} onChange={e=>setSender(e.target.value)} placeholder="email@company.com" style={inp}/></div>
          <div><Label>Subject</Label><input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Message subject" style={inp}/></div>
        </div>
        <Label>Message body</Label>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Paste the email content here..."
          style={{...inp,height:160,resize:"vertical" as const}}/>
        <button onClick={classify} disabled={loading||!body.trim()}
          style={{width:"100%",marginTop:14,padding:13,border:"none",borderRadius:12,background:loading||!body.trim()?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#4F7FFF,#00D4FF)",color:loading||!body.trim()?D.textTertiary:"#fff",fontSize:14,fontWeight:700,cursor:loading||!body.trim()?"default":"pointer",fontFamily:"inherit",boxShadow:loading?"none":"0 4px 16px rgba(79,127,255,0.3)"}}>
          {loading?"⟳ Classifying...":"⚡ Classify & Save to Inbox"}
        </button>
      </div>
      {result&&(
        <div style={{background:D.accentBg,borderRadius:16,padding:"20px 22px",border:`1px solid ${D.accentBorder}`}}>
          <Label>⚡ BLIQK Result</Label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
            {[{k:"Category",v:result.category,c:result.color||D.accent},{k:"Priority",v:result.priority,c:D.textPrimary},{k:"Score",v:`${result.score}/100`,c:D.accent}].map((s,i)=>(
              <div key={i} style={{background:D.card,borderRadius:10,padding:12,border:`1px solid ${D.border}`}}>
                <Label>{s.k}</Label>
                <div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:13,color:D.textBody,lineHeight:1.7}}>
            <strong style={{color:D.success}}>Action: </strong>{result.recommendedAction}<br/>
            <strong style={{color:D.accent}}>Reason: </strong>{result.reason}
          </div>
        </div>
      )}
    </div>
  );
}
