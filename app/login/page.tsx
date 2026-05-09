"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSettings, THEMES, ThemeId } from "@/lib/settings-context";
import { NATURE_IMG } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const { t, fs, s, language, setLanguage, theme, setTheme } = useSettings();
  const [email,    setEmail]    = useState("founder@bliqk.ai");
  const [password, setPassword] = useState("demo1234");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const isDark = ["midnight","forest","obsidian"].includes(theme);

  const login = async () => {
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));
    if (email && password.length >= 4) { router.push("/app"); }
    else { setError(language==="en"?"Check your credentials.":"Verifica tus credenciales."); setLoading(false); }
  };

  const inp: React.CSSProperties = {
    width:"100%", padding:"11px 14px", borderRadius:10,
    border:`1px solid ${t.inputBorder}`, background:t.inputBg,
    color:t.textPrimary, fontSize:fs.base, outline:"none",
    fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.2s",
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Nature photo */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <img src={NATURE_IMG} alt="nature" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.68) saturate(1.1)" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(9,11,20,0.6),rgba(79,127,255,0.1))" }}/>
        <div style={{ position:"absolute", bottom:52, left:52, right:52 }}>
          <div style={{ fontSize:32, fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:"#fff", lineHeight:1.25, marginBottom:12, textShadow:"0 2px 24px rgba(0,0,0,0.5)" }}>
            "{s.tagline}"
          </div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", letterSpacing:1 }}>BLIQK · AI email triage</div>
        </div>
        <div style={{ position:"absolute", bottom:14, right:18, fontSize:10, color:"rgba(255,255,255,0.3)" }}>Photo: Unsplash</div>
      </div>

      {/* Form */}
      <div style={{ width:460, background:t.bg, display:"flex", flexDirection:"column", justifyContent:"center", padding:"52px 52px", position:"relative" }}>
        {/* Controls */}
        <div style={{ position:"absolute", top:20, right:20, display:"flex", gap:6 }}>
          <button onClick={() => setLanguage(language==="en"?"es":"en")}
            style={{ padding:"5px 10px", borderRadius:8, border:`1px solid ${t.border}`, background:t.card, color:t.accent, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            {language==="en"?"🇲🇽 ES":"🇺🇸 EN"}
          </button>
          <button onClick={() => setTheme(isDark?"dawn":"midnight")}
            style={{ width:32, height:32, borderRadius:8, border:`1px solid ${t.border}`, background:t.card, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {isDark?"☀️":"🌙"}
          </button>
        </div>

        {/* Logo */}
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:8 }}>
            <div style={{ width:36, height:36, borderRadius:11, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:`0 6px 20px ${t.accent}40` }}>⚡</div>
            <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:24, color:t.accent }}>BLIQK</span>
          </div>
          <div style={{ fontSize:fs.sm, color:t.textBody }}>{s.welcomeBack}</div>
        </div>

        {/* Fields */}
        {[
          { label:s.emailField,    value:email,    set:setEmail,    type:"email" },
          { label:s.passwordField, value:password, set:setPassword, type:"password" },
        ].map((f,i) => (
          <div key={i} style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1, marginBottom:7 }}>{f.label}</div>
            <input type={f.type} value={f.value} onChange={e=>f.set(e.target.value)}
              onKeyDown={e => e.key==="Enter" && login()}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor=t.accent}
              onBlur={e  => (e.target as HTMLInputElement).style.borderColor=t.inputBorder}
              style={inp}/>
          </div>
        ))}

        {error && <div style={{ background:`${t.danger}15`, border:`1px solid ${t.danger}30`, borderRadius:8, padding:"8px 12px", marginBottom:14, fontSize:13, color:t.danger }}>{error}</div>}

        <button onClick={login} disabled={loading}
          style={{ width:"100%", padding:13, border:"none", borderRadius:12, background:loading?t.surface:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:loading?t.textTertiary:"#fff", fontSize:fs.base, fontWeight:700, cursor:loading?"default":"pointer", fontFamily:"inherit", boxShadow:loading?"none":`0 8px 28px ${t.accent}38`, transition:"all 0.2s", marginBottom:18 }}>
          {loading ? s.signingIn : `⚡ ${s.signIn}`}
        </button>

        <div style={{ textAlign:"center", fontSize:12, color:t.textSecondary }}>{s.demoHint}</div>

        {/* Theme picker */}
        <div style={{ marginTop:28, borderTop:`1px solid ${t.border}`, paddingTop:18 }}>
          <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1, marginBottom:10 }}>{s.themeLabel}</div>
          <div style={{ display:"flex", gap:8 }}>
            {(Object.keys(THEMES) as ThemeId[]).map(id => (
              <button key={id} onClick={() => setTheme(id)} title={language==="en"?THEMES[id].name:THEMES[id].nameEs}
                style={{ width:30, height:30, borderRadius:9, border:`2px solid ${theme===id?THEMES[id].accent:t.border}`, background:THEMES[id].bg, cursor:"pointer", position:"relative", transition:"transform 0.15s", transform:theme===id?"scale(1.18)":"scale(1)" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:THEMES[id].accent, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => router.push("/onboarding")}
          style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", background:"transparent", border:"none", color:t.textSecondary, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
          {s.backToDemo}
        </button>
      </div>
    </div>
  );
}
