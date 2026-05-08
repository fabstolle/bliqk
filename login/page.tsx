"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { D } from "@/lib/tokens";
import { NATURE_IMAGES } from "@/lib/data";

const IMG = NATURE_IMAGES[0];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("founder@bliqk.ai");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async () => {
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));
    if (email && password.length >= 4) {
      router.push("/app");
    } else {
      setError("Check your credentials and try again.");
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = {
    width:"100%", padding:"11px 14px", borderRadius:10,
    border:`1px solid ${D.border}`, background:"rgba(255,255,255,0.04)",
    color:D.textPrimary, fontSize:14, outline:"none",
    fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.2s",
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif" }}>

      {/* ── Nature photo (left) ── */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <img
          src={IMG} alt="nature"
          style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.68) saturate(1.1)" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(9,11,20,0.6),rgba(79,127,255,0.1))" }}/>
        {/* Quote */}
        <div style={{ position:"absolute", bottom:52, left:52, right:52 }}>
          <div style={{ fontSize:32, fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:"#fff", fontWeight:400, lineHeight:1.25, marginBottom:12, textShadow:"0 2px 24px rgba(0,0,0,0.5)" }}>
            "See what needs action now."
          </div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", letterSpacing:1 }}>
            BLIQK — AI email triage for growing businesses
          </div>
        </div>
        <div style={{ position:"absolute", bottom:14, right:18, fontSize:10, color:"rgba(255,255,255,0.3)" }}>Photo: Unsplash</div>
      </div>

      {/* ── Login form (right) ── */}
      <div style={{ width:460, background:D.bg, display:"flex", flexDirection:"column", justifyContent:"center", padding:"52px 56px", position:"relative" }}>

        {/* Logo */}
        <div style={{ position:"absolute", top:24, left:32, display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚡</div>
          <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, color:D.accent }}>BLIQK</span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom:40 }}>
          <h2 style={{ margin:"0 0 8px", fontSize:28, fontWeight:400, fontFamily:"'Instrument Serif',serif", color:D.textPrimary, letterSpacing:-0.5 }}>
            Welcome back.
          </h2>
          {/* FIXED: was D.textTertiary (#6B7394) — now D.textBody (#C8CCDF) */}
          <div style={{ fontSize:14, color:D.textBody }}>Sign in to your workspace</div>
        </div>

        {/* Email */}
        <div style={{ marginBottom:16 }}>
          {/* FIXED: was D.textTertiary — now D.textSecondary (#9BA3C0) */}
          <div style={{ fontSize:11, fontWeight:700, color:D.textSecondary, textTransform:"uppercase", letterSpacing:1, marginBottom:7 }}>
            Email address
          </div>
          <input
            type="email" value={email}
            onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleLogin()}
            onFocus={e=>(e.target as HTMLInputElement).style.borderColor=D.accent}
            onBlur={e=>(e.target as HTMLInputElement).style.borderColor=D.border}
            style={inp}/>
        </div>

        {/* Password */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:11, fontWeight:700, color:D.textSecondary, textTransform:"uppercase", letterSpacing:1, marginBottom:7 }}>
            Password
          </div>
          <input
            type="password" value={password}
            onChange={e=>setPassword(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleLogin()}
            onFocus={e=>(e.target as HTMLInputElement).style.borderColor=D.accent}
            onBlur={e=>(e.target as HTMLInputElement).style.borderColor=D.border}
            style={inp}/>
        </div>

        {error && (
          <div style={{ background:"rgba(255,61,90,0.1)", border:"1px solid rgba(255,61,90,0.2)", borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:13, color:D.danger }}>{error}</div>
        )}

        <button
          onClick={handleLogin} disabled={loading}
          style={{ width:"100%", padding:14, border:"none", borderRadius:12, background:loading?"rgba(255,255,255,0.06)":"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:loading?D.textTertiary:"#fff", fontSize:15, fontWeight:700, cursor:loading?"default":"pointer", fontFamily:"inherit", boxShadow:loading?"none":"0 8px 28px rgba(79,127,255,0.38)", transition:"all 0.2s", marginBottom:20 }}>
          {loading ? "Signing in..." : "⚡ Sign in"}
        </button>

        {/* FIXED: demo text — was D.textTertiary, now D.textSecondary */}
        <div style={{ textAlign:"center", fontSize:12, color:D.textSecondary }}>
          Demo: founder@bliqk.ai / demo1234
        </div>

        {/* Back link */}
        <button
          onClick={()=>router.push("/onboarding")}
          style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", background:"transparent", border:"none", color:D.textSecondary, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
          ← Back to demo
        </button>
      </div>

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
