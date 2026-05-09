"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings, THEMES, ThemeId } from "@/lib/settings-context";
import { SAMPLE_EMAILS, PROVIDERS } from "@/lib/data";

// ── shared mini components ────────────────────────────────────────────────────
const Pill = ({ children, bg, color, size=11 }: any) => (
  <span style={{ background:bg, color, padding:"2px 9px", borderRadius:99, fontSize:size, fontWeight:700, display:"inline-flex", alignItems:"center", gap:3 }}>{children}</span>
);

const ScoreRing = ({ score, color }: { score:number; color:string }) => {
  const r=25, circ=2*Math.PI*r, fill=(score/100)*circ;
  return (
    <div style={{ position:"relative", width:60, height:60, flexShrink:0 }}>
      <svg width={60} height={60} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={30} cy={30} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5}/>
        <circle cx={30} cy={30} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition:"stroke-dasharray 1s ease" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:15, fontWeight:800, color, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:8, color:"rgba(255,255,255,0.35)", marginTop:1 }}>score</span>
      </div>
    </div>
  );
};

// ── page ──────────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const { t, fs, s, language, setLanguage, theme, setTheme } = useSettings();
  const [step,          setStep]          = useState(0);
  const [sampleIdx,     setSampleIdx]     = useState(0);
  const [analyzing,     setAnalyzing]     = useState(false);
  const [analyzed,      setAnalyzed]      = useState(false);
  const [scoreCount,    setScoreCount]    = useState(0);
  const [customText,    setCustomText]    = useState("");
  const [customResult,  setCustomResult]  = useState<any>(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [connectPick,   setConnectPick]   = useState<string|null>(null);
  const [animIn,        setAnimIn]        = useState(false);

  useEffect(() => { setTimeout(() => setAnimIn(true), 80); }, []);

  const isDark = ["midnight","forest","obsidian"].includes(theme);
  const sample = SAMPLE_EMAILS[sampleIdx];
  const r      = sample.result;

  const runAnalysis = () => {
    setAnalyzing(true); setAnalyzed(false); setScoreCount(0);
    setTimeout(() => {
      setAnalyzed(true); setAnalyzing(false);
      let n = 0;
      const timer = setInterval(() => { n = Math.min(n+3, r.score); setScoreCount(n); if (n >= r.score) clearInterval(timer); }, 16);
    }, 2000);
  };

  const runCustom = async () => {
    if (!customText.trim()) return;
    setCustomLoading(true); setCustomResult(null);
    try {
      const res = await fetch("/api/capture", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ bodyText: customText }) });
      const data = await res.json();
      setCustomResult(data.classification);
    } catch {
      setCustomResult({ score:30, color:"#6B7394", recommendedAction: language==="en"?"Review when available.":"Revisar cuando sea posible.", reason: language==="en"?"Could not classify.":"No se pudo clasificar.", alerts:[] });
    }
    setCustomLoading(false);
  };

  const STEPS = [s.step1, s.step2, s.step3, s.step4];

  // ── NAV BAR ───────────────────────────────────────────────────────────────
  const NavBar = () => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:52, opacity:animIn?1:0, transition:"all 0.5s ease" }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
        <div style={{ width:34, height:34, borderRadius:9, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, boxShadow:`0 4px 16px ${t.accent}40` }}>⚡</div>
        <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:22, color:t.accent }}>BLIQK</span>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {/* Theme dots */}
        <div style={{ display:"flex", gap:5 }}>
          {(Object.keys(THEMES) as ThemeId[]).map(id => (
            <button key={id} onClick={() => setTheme(id)}
              title={language==="en" ? THEMES[id].name : THEMES[id].nameEs}
              style={{ width:22, height:22, borderRadius:6, border:`2px solid ${theme===id?THEMES[id].accent:t.border}`, background:THEMES[id].bg, cursor:"pointer", position:"relative", transition:"transform 0.15s", transform:theme===id?"scale(1.25)":"scale(1)" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:THEMES[id].accent, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
            </button>
          ))}
        </div>
        {/* Language */}
        <button onClick={() => setLanguage(language==="en"?"es":"en")}
          style={{ padding:"5px 10px", borderRadius:8, border:`1px solid ${t.border}`, background:t.card, color:t.accent, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          {language==="en"?"🇲🇽 ES":"🇺🇸 EN"}
        </button>
        {/* Dark/light */}
        <button onClick={() => setTheme(isDark?"dawn":"midnight")}
          style={{ width:32, height:32, borderRadius:8, border:`1px solid ${t.border}`, background:t.card, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {isDark?"☀️":"🌙"}
        </button>
      </div>

      {/* Progress */}
      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
        {STEPS.map((_,i) => (
          <div key={i} style={{ width:i===step?20:7, height:7, borderRadius:99, background:i<step?t.success:i===step?t.accent:t.border, transition:"all 0.4s cubic-bezier(.4,0,.2,1)", boxShadow:i===step?`0 0 10px ${t.accent}80`:"none" }}/>
        ))}
        <span style={{ fontSize:11, color:t.textSecondary, marginLeft:4 }}>{step+1}/4</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.textPrimary, fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}>
      {/* Ambient glow */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:"-15%", left:"15%", width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle,${t.accentBg} 0%,transparent 65%)` }}/>
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:800, margin:"0 auto", padding:"36px 24px 80px" }}>
        <NavBar/>

        {/* ══════════════ STEP 0 — WOW ══════════════ */}
        {step===0 && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ textAlign:"center", marginBottom:44 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:t.accentBg, border:`1px solid ${t.accentBorder}`, borderRadius:99, padding:"6px 16px", fontSize:12, color:t.accent, fontWeight:600, marginBottom:22 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:t.success, display:"inline-block", boxShadow:`0 0 8px ${t.success}` }}/>
                {s.liveDemo}
              </div>
              <h1 style={{ margin:"0 0 16px", fontSize:46, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.05, letterSpacing:-1.5, color:t.textPrimary }}>
                {s.heroLine1}<br/><em style={{ color:t.accent }}>{s.heroLine2}</em>
              </h1>
              <p style={{ margin:0, fontSize:16, color:t.textBody, lineHeight:1.75, maxWidth:500, marginInline:"auto" }}>{s.heroSub}</p>
            </div>

            {/* Sample tabs */}
            <div style={{ display:"flex", gap:8, marginBottom:16, justifyContent:"center", flexWrap:"wrap" }}>
              {SAMPLE_EMAILS.map((sm,i) => (
                <button key={i} onClick={() => { setSampleIdx(i); setAnalyzed(false); setScoreCount(0); }}
                  style={{ padding:"8px 16px", borderRadius:99, border:`1.5px solid ${sampleIdx===i?t.accent:t.border}`, background:sampleIdx===i?t.accentBg:"transparent", color:sampleIdx===i?t.accent:t.textSecondary, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                  {language==="en"?sm.en:sm.es}
                </button>
              ))}
            </div>

            {/* Email card */}
            <div style={{ background:t.card, borderRadius:20, border:`1px solid ${t.border}`, overflow:"hidden", marginBottom:14, boxShadow:"0 4px 40px rgba(0,0,0,0.25)" }}>
              <div style={{ padding:"14px 22px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", gap:12, background:t.surface }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:t.accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>👤</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:t.textPrimary }}>{s.customerMsg}</div>
                  <div style={{ fontSize:11, color:t.textSecondary }}>{s.incoming}</div>
                </div>
              </div>
              <div style={{ padding:"22px" }}>
                <p style={{ margin:"0 0 22px", fontSize:15, color:t.textBody, lineHeight:1.8, fontStyle:"italic" }}>"{sample.text}"</p>
                <button onClick={runAnalysis} disabled={analyzing}
                  style={{ width:"100%", padding:"15px", border:"none", borderRadius:14, background:analyzing?t.surface:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:analyzing?t.textTertiary:"#fff", fontSize:15, fontWeight:700, cursor:analyzing?"default":"pointer", fontFamily:"inherit", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:analyzing?"none":`0 6px 28px ${t.accent}38` }}>
                  {analyzing ? <><span style={{ animation:"spin 0.8s linear infinite", display:"inline-block" }}>⟳</span>{s.analyzing}</> : analyzed ? s.analyzeAgain : s.analyzeBtn}
                </button>
              </div>
            </div>

            {/* Scanning */}
            {analyzing && (
              <div style={{ background:t.card, borderRadius:20, border:`1px solid ${t.border}`, padding:"26px 24px", textAlign:"center", animation:"fadeUp 0.4s ease" }}>
                <div style={{ fontSize:13, color:t.textSecondary, marginBottom:14 }}>{s.scanningSignals}</div>
                <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                  {s.scanning.map((x: string, i: number) => (
                    <div key={i} style={{ padding:"6px 14px", borderRadius:99, background:t.surface, border:`1px solid ${t.border}`, fontSize:12, color:t.textSecondary, animation:`pulse 1.2s ease ${i*0.25}s infinite` }}>{x}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {analyzed && (
              <div style={{ background:t.card, borderRadius:20, border:`1.5px solid ${r.color}40`, boxShadow:`0 8px 48px ${r.color}15`, overflow:"hidden", animation:"fadeUp 0.4s ease" }}>
                <div style={{ background:`linear-gradient(135deg,${r.color}18,${r.color}06)`, borderBottom:`1px solid ${r.color}30`, padding:"18px 24px", display:"flex", alignItems:"center", gap:16 }}>
                  <ScoreRing score={scoreCount} color={r.color}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                      <Pill bg={`${r.color}20`} color={r.color} size={13}>{r.label}</Pill>
                      <Pill bg={t.surface} color={t.textSecondary} size={11}>{r.priority}</Pill>
                    </div>
                    <div style={{ fontSize:13, color:t.textBody, lineHeight:1.5 }}>{language==="en"?r.reason_en:r.reason_es}</div>
                  </div>
                </div>
                <div style={{ padding:"20px 24px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1.2, marginBottom:7 }}>✅ {s.recommAction}</div>
                      <div style={{ background:`${t.success}12`, border:`1px solid ${t.success}30`, borderRadius:12, padding:"14px", fontSize:14, color:t.success, fontWeight:600, lineHeight:1.5 }}>
                        {language==="en"?r.action_en:r.action_es}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1.2, marginBottom:7 }}>🚩 {s.flagsDetected}</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {(language==="en"?r.alerts_en:r.alerts_es).length > 0
                          ? (language==="en"?r.alerts_en:r.alerts_es).map((a:string,i:number) => (
                            <div key={i} style={{ background:`${t.danger}10`, border:`1px solid ${t.danger}25`, borderRadius:8, padding:"8px 12px", fontSize:12, color:t.danger, fontWeight:600 }}>⚠️ {a}</div>
                          ))
                          : <div style={{ background:`${t.success}08`, border:`1px solid ${t.success}20`, borderRadius:8, padding:"8px 12px", fontSize:12, color:t.success, fontWeight:600 }}>{s.noFlags}</div>
                        }
                      </div>
                    </div>
                  </div>
                  <div style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`, borderRadius:12, padding:"14px 16px", marginBottom:18, display:"flex", gap:10 }}>
                    <span style={{ fontSize:18 }}>⚡</span>
                    <span style={{ fontSize:13, color:t.textBody, lineHeight:1.6 }}><strong style={{ color:t.textPrimary }}>{s.wowLine}</strong></span>
                  </div>
                  <button onClick={() => setStep(1)} style={{ width:"100%", padding:"15px", border:"none", borderRadius:14, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 6px 28px ${t.accent}38` }}>
                    {s.iWantThis}
                  </button>
                </div>
              </div>
            )}

            {/* Custom email */}
            {!analyzed && !analyzing && (
              <div style={{ marginTop:16 }}>
                <div style={{ textAlign:"center", fontSize:13, color:t.textSecondary, marginBottom:10 }}>{s.orPaste}</div>
                <textarea value={customText} onChange={e => setCustomText(e.target.value)} placeholder={s.pasteHint}
                  style={{ width:"100%", padding:"14px", borderRadius:14, border:`1px solid ${t.border}`, background:t.card, color:t.textPrimary, fontSize:14, outline:"none", fontFamily:"inherit", resize:"vertical" as const, minHeight:80, boxSizing:"border-box" as const, lineHeight:1.6 }}/>
                {customText.trim() && (
                  <button onClick={runCustom} disabled={customLoading}
                    style={{ marginTop:10, width:"100%", padding:"13px", border:"none", borderRadius:12, background:customLoading?t.surface:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:customLoading?t.textTertiary:"#fff", fontSize:14, fontWeight:700, cursor:customLoading?"default":"pointer", fontFamily:"inherit" }}>
                    {customLoading ? "⟳ ..." : s.analyzeOwn}
                  </button>
                )}
                {customResult && (
                  <div style={{ marginTop:14, background:t.card, border:`1.5px solid ${customResult.color||t.accent}40`, borderRadius:16, padding:"18px 20px", animation:"fadeUp 0.4s ease" }}>
                    <div style={{ fontSize:14, color:t.success, fontWeight:600, marginBottom:8 }}>✅ {customResult.recommendedAction}</div>
                    <div style={{ fontSize:13, color:t.textBody, marginBottom:14 }}>{customResult.reason}</div>
                    <button onClick={() => setStep(1)} style={{ width:"100%", padding:"12px", border:"none", borderRadius:12, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                      {s.iWantInbox}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ STEP 1 — PROBLEM ══════════════ */}
        {step===1 && (
          <div style={{ animation:"fadeUp 0.5s ease", textAlign:"center" }}>
            <h2 style={{ margin:"0 0 14px", fontSize:38, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:t.textPrimary }}>
              <em style={{ color:t.accent }}>{s.problemTitle}</em>
            </h2>
            <p style={{ margin:"0 0 40px", fontSize:15, color:t.textBody, maxWidth:480, marginInline:"auto", lineHeight:1.75 }}>{s.problemSub}</p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:40 }}>
              {[
                { icon:"😤", title:s.p1Title, sub:s.p1Sub, color:t.danger,  stat:s.p1Stat, statLabel:s.p1Label },
                { icon:"🔥", title:s.p2Title, sub:s.p2Sub, color:t.warning, stat:s.p2Stat, statLabel:s.p2Label },
                { icon:"🌀", title:s.p3Title, sub:s.p3Sub, color:t.purple,  stat:s.p3Stat, statLabel:s.p3Label },
              ].map((p,i) => (
                <div key={i} style={{ background:t.card, borderRadius:18, padding:"24px 18px", border:`1px solid ${t.border}`, textAlign:"left", transition:"all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor=p.color+"50"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor=t.border; (e.currentTarget as HTMLDivElement).style.transform="none"; }}>
                  <div style={{ fontSize:26, marginBottom:12 }}>{p.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:t.textPrimary, marginBottom:8 }}>{p.title}</div>
                  <div style={{ fontSize:13, color:t.textBody, lineHeight:1.65, marginBottom:16 }}>{p.sub}</div>
                  <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:14 }}>
                    <div style={{ fontSize:26, fontWeight:800, color:p.color, lineHeight:1 }}>{p.stat}</div>
                    <div style={{ fontSize:11, color:t.textSecondary, marginTop:4, lineHeight:1.5 }}>{p.statLabel}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`, borderRadius:16, padding:"20px 24px", marginBottom:32, display:"flex", alignItems:"flex-start", gap:16, textAlign:"left" }}>
              <span style={{ fontSize:32 }}>⚡</span>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:t.textPrimary, marginBottom:6 }}>{s.bliqkFix}</div>
                <div style={{ fontSize:14, color:t.textBody, lineHeight:1.7 }}>{s.bliqkFixDesc}</div>
              </div>
            </div>
            <button onClick={() => setStep(2)} style={{ padding:"15px 44px", border:"none", borderRadius:14, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 6px 28px ${t.accent}38` }}>
              {s.setupBtn}
            </button>
          </div>
        )}

        {/* ══════════════ STEP 2 — CONNECT ══════════════ */}
        {step===2 && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <h2 style={{ margin:"0 0 12px", fontSize:38, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:t.textPrimary }}>
                {s.connectTitle}<br/><em style={{ color:t.accent }}>{s.connectItalic}</em>
              </h2>
              <p style={{ margin:0, fontSize:15, color:t.textBody, lineHeight:1.75 }}>{s.connectSub}</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:20 }}>
              {PROVIDERS.map(p => (
                <div key={p.id} onClick={() => setConnectPick(p.id)}
                  style={{ background:connectPick===p.id?`${p.color}12`:t.card, borderRadius:16, padding:"20px", border:`2px solid ${connectPick===p.id?p.color:t.border}`, cursor:"pointer", transition:"all 0.2s", position:"relative", boxShadow:connectPick===p.id?`0 4px 24px ${p.color}25`:"none" }}>
                  {p.rec && <div style={{ position:"absolute", top:-10, right:16, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>{s.mostPopular}</div>}
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:13, background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{p.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:t.textPrimary }}>{p.name}</div>
                      <div style={{ fontSize:11, color:t.textSecondary, fontFamily:"monospace", marginTop:2 }}>{p.host||"custom"} · {p.port}</div>
                    </div>
                    {connectPick===p.id && <div style={{ width:22, height:22, borderRadius:"50%", background:p.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", flexShrink:0 }}>✓</div>}
                  </div>
                </div>
              ))}
            </div>

            {connectPick && (() => {
              const p = PROVIDERS.find(x => x.id===connectPick)!;
              return (
                <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:"22px 24px", marginBottom:20, animation:"fadeUp 0.3s ease" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1.2, marginBottom:14 }}>{s.connectionDetails}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                    {[{l:s.emailAddress,p:"you@company.com",t:"email"},{l:s.appPassword,p:"••••••••",t:"password"}].map((f,i) => (
                      <div key={i}>
                        <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:0.8, marginBottom:6 }}>{f.l}</div>
                        <input type={f.t} placeholder={f.p} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:`1px solid ${t.inputBorder}`, background:t.inputBg, color:t.textPrimary, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:12, color:t.textSecondary, lineHeight:1.6, marginBottom:8 }}>🔒 {s.encNote}</div>
                  <div style={{ background:t.surface, borderRadius:8, padding:"10px 14px", fontSize:12, color:t.textBody, lineHeight:1.6 }}>
                    💡 <strong style={{ color:t.textPrimary }}>{s.setupTipLabel}</strong> {language==="en"?p.tip_en:p.tip_es}
                  </div>
                </div>
              );
            })()}

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <button onClick={() => setStep(3)}
                style={{ padding:"14px", borderRadius:14, border:"none", background:connectPick?`linear-gradient(135deg,${t.accent},#00D4FF)`:t.surface, color:connectPick?"#fff":t.textTertiary, fontSize:15, fontWeight:700, cursor:connectPick?"pointer":"default", fontFamily:"inherit", boxShadow:connectPick?`0 6px 28px ${t.accent}38`:"none" }}>
                {connectPick ? s.connectBtn : (language==="en"?"Select a provider first":"Selecciona un proveedor primero")}
              </button>
              <button onClick={() => setStep(3)}
                style={{ padding:"14px", borderRadius:14, border:`1px solid ${t.border}`, background:"transparent", color:t.textSecondary, fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>
                {s.skipBtn}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3 — DONE ══════════════ */}
        {step===3 && (
          <div style={{ textAlign:"center", animation:"fadeUp 0.5s ease" }}>
            <div style={{ fontSize:64, marginBottom:20, animation:"bounce 0.7s cubic-bezier(.36,.07,.19,.97)" }}>🎉</div>
            <h2 style={{ margin:"0 0 14px", fontSize:42, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:t.textPrimary }}>
              {s.doneTitle}<br/><em style={{ color:t.accent }}>{s.doneItalic}</em>
            </h2>
            <p style={{ margin:"0 0 40px", fontSize:16, color:t.textBody, lineHeight:1.75, maxWidth:460, marginInline:"auto" }}>{s.doneSub}</p>

            <div style={{ background:t.card, borderRadius:20, border:`1px solid ${t.border}`, padding:"28px 24px", marginBottom:32, textAlign:"left" }}>
              <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:1.2, marginBottom:18 }}>{s.whatNext}</div>
              {[
                { icon:"⚡", title:s.n1Title, desc:s.n1Desc, color:t.accent,   time:s.n1Time },
                { icon:"📊", title:s.n2Title, desc:s.n2Desc, color:t.success,  time:s.n2Time },
                { icon:"🔔", title:s.n3Title, desc:s.n3Desc, color:t.warning,  time:s.n3Time },
                { icon:"👥", title:s.n4Title, desc:s.n4Desc, color:t.purple,   time:s.n4Time },
              ].map((x,i,arr) => (
                <div key={i} style={{ display:"flex", gap:14, paddingBottom:i<arr.length-1?18:0, marginBottom:i<arr.length-1?18:0, borderBottom:i<arr.length-1?`1px solid ${t.border}`:"none" }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${x.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{x.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:t.textPrimary }}>{x.title}</div>
                      <div style={{ fontSize:11, color:t.textSecondary, background:t.surface, padding:"2px 9px", borderRadius:99 }}>{x.time}</div>
                    </div>
                    <div style={{ fontSize:13, color:t.textBody, lineHeight:1.6 }}>{x.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => router.push("/login")}
              style={{ width:"100%", padding:"16px", border:"none", borderRadius:14, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 8px 36px ${t.accent}42`, marginBottom:12 }}>
              {s.openInbox}
            </button>
            <div style={{ fontSize:13, color:t.textSecondary }}>{s.freeNote}</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin   { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0;transform:translateY(18px); } to { opacity:1;transform:none; } }
        @keyframes pulse  { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes bounce { 0%,100%{transform:none} 40%{transform:scale(1.25)} 70%{transform:scale(.95)} }
      `}</style>
    </div>
  );
}
