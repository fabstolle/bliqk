"use client";
import { useState } from "react";
import { useSettings } from "@/lib/settings-context";
import { PROVIDERS } from "@/lib/data";

export default function IntegrationsPage() {
  const { t, fs, s, language } = useSettings();
  const [modal,      setModal]      = useState<string|null>(null);
  const [connected,  setConnected]  = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [imported,   setImported]   = useState<string[]>([]);
  const [toast,      setToast]      = useState("");

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(""),2500); };
  const connect   = async () => { setConnecting(true); await new Promise(r=>setTimeout(r,1600)); setConnected(p=>[...p,modal!]); setConnecting(false); setModal(null); showToast(language==="en"?"Connected ✓":"Conectado ✓"); };
  const p = modal ? PROVIDERS.find(x=>x.id===modal) : null;

  return (
    <div style={{ padding:"32px 36px", maxWidth:860, color:t.textPrimary }}>
      {toast && <div style={{ position:"fixed", top:16, right:16, zIndex:9999, background:t.success, color:"#fff", padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700 }}>{toast}</div>}
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:700, fontFamily:"'Instrument Serif',serif" }}>{s.intTitle} 🔌</h2>
      <p style={{ margin:"0 0 22px", fontSize:fs.sm, color:t.textBody }}>{s.intSub}</p>
      <div style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`, borderRadius:14, padding:"14px 18px", marginBottom:22, display:"flex", gap:12, alignItems:"center" }}>
        <span style={{ fontSize:22 }}>🤖</span>
        <div>
          <div style={{ fontWeight:700, fontSize:fs.sm, color:t.accent }}>{s.aiOnAll}</div>
          <div style={{ fontSize:fs.xs, color:t.textBody, marginTop:2 }}>{s.aiOnAllSub}</div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {PROVIDERS.map((prov,i) => {
          const isConn = connected.includes(prov.id);
          return (
            <div key={i} style={{ background:t.card, borderRadius:16, padding:20, border:`1.5px solid ${isConn?prov.color+"40":t.border}`, transition:"all 0.2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.borderColor=prov.color+"50"}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.borderColor=isConn?prov.color+"40":t.border}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`${prov.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{prov.icon}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:fs.sm, color:t.textPrimary }}>{prov.name}</div>
                  <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:99, background:isConn?`${t.success}18`:"rgba(255,122,47,0.12)", color:isConn?t.success:"#FF7A2F" }}>
                    {isConn?`✓ ${s.connected}`:s.mockMode}
                  </span>
                </div>
              </div>
              <p style={{ fontSize:fs.xs, color:t.textBody, lineHeight:1.6, margin:"0 0 14px" }}>
                {language==="en"?`Connect ${prov.name} via IMAP for automatic classification.`:`Conecta ${prov.name} via IMAP para clasificación automática.`}
              </p>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setModal(prov.id)} style={{ flex:1, padding:"8px", borderRadius:8, border:"none", background:`${prov.color}18`, color:prov.color, fontSize:fs.xs, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  {isConn?"⚙️ ":""}{s.connectProvider}
                </button>
                {!isConn && (
                  <button onClick={()=>{setImported(p=>[...p,prov.id]);showToast(language==="en"?"Imported ✓":"Importado ✓");}}
                    style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${t.border}`, background:"transparent", color:imported.includes(prov.id)?t.success:t.textSecondary, fontSize:fs.xs, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    {imported.includes(prov.id)?s.imported:s.mockImport}
                  </button>
                )}
                {isConn && <button style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${t.border}`, background:"transparent", color:t.success, fontSize:fs.xs, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{s.active}</button>}
              </div>
            </div>
          );
        })}
      </div>

      {modal && p && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={()=>setModal(null)}>
          <div style={{ background:t.card, borderRadius:20, padding:"30px", width:440, border:`1px solid ${t.border}`, boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:42, height:42, borderRadius:12, background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{p.icon}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:15, color:t.textPrimary }}>{s.connectProvider} {p.name}</div>
                <div style={{ fontSize:12, color:t.textBody }}>{s.imapCreds}</div>
              </div>
            </div>
            <div style={{ background:`${p.color}0E`, border:`1px solid ${p.color}25`, borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:12, color:t.textBody, lineHeight:1.6 }}>
              💡 <strong style={{ color:t.textPrimary }}>{s.setupTipLabel}</strong> {language==="en"?p.tip_en:p.tip_es}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
              {[{l:language==="en"?"Email address":"Correo electrónico",p:"you@company.com",t:"email",c:"1/-1"},{l:language==="en"?"Password / App Password":"Contraseña / App Password",p:"••••••••",t:"password",c:"1/-1"},{l:"IMAP Server",p:p.host||"imap.host.com",t:"text",c:"auto"},{l:"Port",p:p.port,t:"text",c:"auto"}].map((f,i)=>(
                <div key={i} style={{ gridColumn:f.c }}>
                  <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:0.8, marginBottom:6 }}>{f.l}</div>
                  <input type={f.t} defaultValue={f.t==="text"?f.p:""} placeholder={f.p} style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:`1px solid ${t.inputBorder}`, background:t.inputBg, color:t.textPrimary, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const }}/>
                </div>
              ))}
            </div>
            <div style={{ fontSize:12, color:t.textSecondary, marginBottom:18, lineHeight:1.6 }}>🔒 {s.encNote}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <button onClick={()=>setModal(null)} style={{ padding:"11px", borderRadius:10, border:`1px solid ${t.border}`, background:"transparent", color:t.textSecondary, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{s.cancel}</button>
              <button onClick={connect} disabled={connecting} style={{ padding:"11px", borderRadius:10, border:"none", background:connecting?t.surface:`linear-gradient(135deg,${p.color},${p.color}CC)`, color:connecting?t.textTertiary:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                {connecting?"⟳ ...":`🔗 ${s.connectProvider} ${p.name}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
