"use client";
import { useState } from "react";
import { D } from "@/lib/tokens";
import { IMAP_PROVIDERS } from "@/lib/data";

const Label = ({children}:any) => (
  <div style={{fontSize:10,fontWeight:700,color:D.textSecondary,textTransform:"uppercase",letterSpacing:1.2,marginBottom:7}}>{children}</div>
);

export default function IntegrationsPage() {
  const [modal, setModal]         = useState<string|null>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [imported, setImported]   = useState<string[]>([]);
  const [toast, setToast]         = useState("");

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(""),2500); };

  const connect = async () => {
    setConnecting(true);
    await new Promise(r=>setTimeout(r,1600));
    setConnected(prev=>[...prev,modal!]);
    setConnecting(false); setModal(null);
    showToast("Connected successfully ✓");
  };

  const p = modal ? IMAP_PROVIDERS.find(x=>x.id===modal) : null;

  return (
    <div style={{padding:"32px 36px",maxWidth:860,color:D.textPrimary}}>
      {toast&&<div style={{position:"fixed",top:16,right:16,zIndex:9999,background:D.success,color:"#fff",padding:"9px 16px",borderRadius:9,fontSize:13,fontWeight:700}}>{toast}</div>}

      <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,fontFamily:"'Instrument Serif',serif"}}>Integrations 🔌</h2>
      <p style={{margin:"0 0 22px",fontSize:14,color:D.textBody}}>Connect your email inboxes. BLIQK classifies everything automatically.</p>

      <div style={{background:D.accentBg,border:`1px solid ${D.accentBorder}`,borderRadius:14,padding:"14px 18px",marginBottom:22,display:"flex",gap:12,alignItems:"center"}}>
        <span style={{fontSize:22}}>🤖</span>
        <div>
          <div style={{fontWeight:700,fontSize:13,color:D.accent}}>AI classification on all sources</div>
          <div style={{fontSize:12,color:D.textBody,marginTop:2}}>Rule classifier runs first (free). Claude AI only for ambiguous messages. Results cached automatically.</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {IMAP_PROVIDERS.map((prov,i)=>{
          const isConnected = connected.includes(prov.id) || prov.id==="capture";
          return(
            <div key={i} style={{background:D.card,borderRadius:16,padding:20,border:`1.5px solid ${isConnected?prov.color+"40":D.border}`,transition:"all 0.2s",boxShadow:isConnected?`0 4px 16px ${prov.color}18`:"none"}}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=prov.color+"50"}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=isConnected?prov.color+"40":D.border}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:42,height:42,borderRadius:12,background:`${prov.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{prov.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:D.textPrimary}}>{prov.name}</div>
                  <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:99,background:isConnected?"rgba(0,214,143,0.15)":"rgba(255,122,47,0.12)",color:isConnected?D.success:"#FF7A2F"}}>
                    {isConnected?"✓ Connected":"Mock Mode"}
                  </span>
                </div>
              </div>
              <p style={{fontSize:12,color:D.textBody,lineHeight:1.6,margin:"0 0 14px"}}>
                {prov.id==="capture"?"Manually paste any message. Works without any setup.":`Connect your ${prov.name} inbox via IMAP. Secure, encrypted connection.`}
              </p>
              <div style={{display:"flex",gap:8}}>
                {prov.id!=="capture"&&(
                  <button onClick={()=>setModal(prov.id)}
                    style={{flex:1,padding:"8px",borderRadius:8,border:"none",background:`${prov.color}18`,color:prov.color,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                    {isConnected?"⚙️ Settings":"🔗 Connect"}
                  </button>
                )}
                {!isConnected&&(
                  <button onClick={()=>{setImported(p=>[...p,prov.id]);showToast("Mock imported ✓");}}
                    style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${D.border}`,background:"transparent",color:imported.includes(prov.id)?D.success:D.textSecondary,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                    {imported.includes(prov.id)?"✅ Imported":"▶ Mock Import"}
                  </button>
                )}
                {isConnected&&prov.id!=="capture"&&<button style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${D.border}`,background:"transparent",color:D.success,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓ Active</button>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal&&p&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setModal(null)}>
          <div style={{background:D.card,borderRadius:20,padding:"30px",width:440,border:`1px solid ${D.border}`,boxShadow:"0 40px 80px rgba(0,0,0,0.5)"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${p.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{p.icon}</div>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:D.textPrimary}}>Connect {p.name}</div>
                <div style={{fontSize:12,color:D.textBody}}>Enter your IMAP credentials</div>
              </div>
            </div>
            {p.tip&&<div style={{background:`${p.color}0E`,border:`1px solid ${p.color}25`,borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:D.textBody,lineHeight:1.6}}>💡 <strong style={{color:D.textPrimary}}>Setup tip:</strong> {p.tip}</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              {[{l:"Email address",p:"you@company.com",t:"email",col:"1/-1"},{l:"Password / App Password",p:"••••••••",t:"password",col:"1/-1"},{l:"IMAP Server",p:p.host||"imap.host.com",t:"text",col:"auto"},{l:"Port",p:p.port,t:"text",col:"auto"}].map((f,i)=>(
                <div key={i} style={{gridColumn:f.col}}>
                  <Label>{f.l}</Label>
                  <input type={f.t} defaultValue={f.t==="text"?f.p:""} placeholder={f.p} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${D.border}`,background:"rgba(255,255,255,0.04)",color:D.textPrimary,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box" as const}}/>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,color:D.textSecondary,marginBottom:18,lineHeight:1.6}}>🔒 Encrypted with AES-256-GCM. We never store your password in plain text.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setModal(null)} style={{padding:"11px",borderRadius:10,border:`1px solid ${D.border}`,background:"transparent",color:D.textSecondary,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              <button onClick={connect} disabled={connecting} style={{padding:"11px",borderRadius:10,border:"none",background:connecting?D.surface:`linear-gradient(135deg,${p.color},${p.color}CC)`,color:connecting?D.textTertiary:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 14px ${p.color}30`}}>
                {connecting?"⟳ Connecting...":` Connect ${p.name}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
