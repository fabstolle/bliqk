"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { D } from "@/lib/tokens";
import { SAMPLE_EMAILS, IMAP_PROVIDERS } from "@/lib/data";

const STEPS = ["See it live", "Why it matters", "Connect inbox", "You're ready"];

// ── helpers ──────────────────────────────────────────────────────────────────
const Pill = ({ children, bg, color, size=11 }: any) => (
  <span style={{ background:bg, color, padding:"2px 9px", borderRadius:99, fontSize:size, fontWeight:700, display:"inline-flex", alignItems:"center", gap:3 }}>{children}</span>
);
const Label = ({ children }: any) => (
  <div style={{ fontSize:10, fontWeight:700, color:D.textSecondary, textTransform:"uppercase", letterSpacing:1.2, marginBottom:7 }}>{children}</div>
);
const ScoreRing = ({ score, color }: { score:number; color:string }) => {
  const r=25, circ=2*Math.PI*r, fill=(score/100)*circ;
  return (
    <div style={{ position:"relative", width:60, height:60, flexShrink:0 }}>
      <svg width={60} height={60} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={30} cy={30} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5}/>
        <circle cx={30} cy={30} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" style={{ transition:"stroke-dasharray 1s ease" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:15, fontWeight:800, color, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:8, color:D.textSecondary, marginTop:1 }}>score</span>
      </div>
    </div>
  );
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep]               = useState(0);
  const [sampleIdx, setSampleIdx]     = useState(0);
  const [analyzing, setAnalyzing]     = useState(false);
  const [analyzed, setAnalyzed]       = useState(false);
  const [scoreCount, setScoreCount]   = useState(0);
  const [customText, setCustomText]   = useState("");
  const [customResult, setCustomResult] = useState<any>(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [connectPick, setConnectPick] = useState<string|null>(null);
  const [animIn, setAnimIn]           = useState(false);

  useEffect(() => { setTimeout(() => setAnimIn(true), 80); }, []);

  const runAnalysis = () => {
    setAnalyzing(true); setAnalyzed(false); setScoreCount(0);
    setTimeout(() => {
      setAnalyzed(true); setAnalyzing(false);
      const target = SAMPLE_EMAILS[sampleIdx].result.score;
      let n = 0;
      const t = setInterval(() => { n = Math.min(n+3, target); setScoreCount(n); if (n>=target) clearInterval(t); }, 16);
    }, 2000);
  };

  const runCustom = async () => {
    if (!customText.trim()) return;
    setCustomLoading(true); setCustomResult(null);
    try {
      const res = await fetch("/api/capture", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ bodyText: customText }),
      });
      const data = await res.json();
      setCustomResult(data.classification);
    } catch { setCustomResult({ label:"📨 Normal", priority:"low", score:30, color:D.textTertiary, recommendedAction:"Review when available.", reason:"Could not classify.", alerts:[] }); }
    setCustomLoading(false);
  };

  const goNext = () => { if (step < 3) setStep(s=>s+1); else router.push("/login"); };

  // ── shared glow ──
  const Glow = () => (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"absolute", top:"-15%", left:"15%", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,127,255,0.07) 0%,transparent 65%)" }}/>
      <div style={{ position:"absolute", bottom:"-10%", right:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,212,255,0.04) 0%,transparent 65%)" }}/>
    </div>
  );

  const r = SAMPLE_EMAILS[sampleIdx].result;

  return (
    <div style={{ minHeight:"100vh", background:D.bg, color:D.textPrimary, fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}>
      <Glow/>
      <div style={{ position:"relative", zIndex:1, maxWidth:800, margin:"0 auto", padding:"36px 24px 80px" }}>

        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:52, opacity:animIn?1:0, transition:"all 0.5s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, boxShadow:"0 4px 16px rgba(79,127,255,0.4)" }}>⚡</div>
            <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:22, color:D.accent }}>BLIQK</span>
          </div>
          {/* Progress */}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {STEPS.map((s,i) => (
              <div key={i} style={{ width:i===step?22:7, height:7, borderRadius:99, background:i<step?D.success:i===step?D.accent:D.border, transition:"all 0.4s cubic-bezier(.4,0,.2,1)", boxShadow:i===step?`0 0 10px ${D.accent}80`:"none" }}/>
            ))}
            <span style={{ fontSize:11, color:D.textSecondary, marginLeft:6 }}>{step+1}/4</span>
          </div>
        </div>

        {/* ══ STEP 0 — WOW ══ */}
        {step===0 && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ textAlign:"center", marginBottom:44 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:D.accentBg, border:`1px solid ${D.accentBorder}`, borderRadius:99, padding:"6px 16px", fontSize:12, color:D.accent, fontWeight:600, marginBottom:22 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:D.success, display:"inline-block", boxShadow:`0 0 8px ${D.success}` }}/>
                Live demo — no account needed
              </div>
              <h1 style={{ margin:"0 0 16px", fontSize:46, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.05, letterSpacing:-1.5, color:D.textPrimary }}>
                Your inbox knows<br/><em style={{ color:D.accent }}>exactly what to do next.</em>
              </h1>
              <p style={{ margin:0, fontSize:16, color:D.textBody, lineHeight:1.75, maxWidth:500, marginInline:"auto" }}>
                Pick an email below. BLIQK reads it, scores it, and tells you the right action — in under 3 seconds.
              </p>
            </div>

            {/* Sample tabs */}
            <div style={{ display:"flex", gap:8, marginBottom:16, justifyContent:"center" }}>
              {SAMPLE_EMAILS.map((s,i) => (
                <button key={i} onClick={() => { setSampleIdx(i); setAnalyzed(false); setScoreCount(0); }}
                  style={{ padding:"8px 16px", borderRadius:99, border:`1.5px solid ${sampleIdx===i?D.accent:D.border}`, background:sampleIdx===i?D.accentBg:"transparent", color:sampleIdx===i?D.accent:D.textSecondary, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                  {s.tag}
                </button>
              ))}
            </div>

            {/* Email card */}
            <div style={{ background:D.card, borderRadius:20, border:`1px solid ${D.border}`, overflow:"hidden", marginBottom:14, boxShadow:"0 4px 40px rgba(0,0,0,0.3)" }}>
              <div style={{ padding:"14px 22px", borderBottom:`1px solid ${D.border}`, display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.02)" }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>👤</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:D.textPrimary }}>Customer message</div>
                  <div style={{ fontSize:11, color:D.textSecondary }}>Incoming · Just now</div>
                </div>
              </div>
              <div style={{ padding:"22px" }}>
                <p style={{ margin:"0 0 22px", fontSize:15, color:D.textBody, lineHeight:1.8, fontStyle:"italic" }}>
                  "{SAMPLE_EMAILS[sampleIdx].text}"
                </p>
                <button onClick={runAnalysis} disabled={analyzing}
                  style={{ width:"100%", padding:"15px", border:"none", borderRadius:14, background:analyzing?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:analyzing?D.textTertiary:"#fff", fontSize:15, fontWeight:700, cursor:analyzing?"default":"pointer", fontFamily:"inherit", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:analyzing?"none":"0 6px 28px rgba(79,127,255,0.38)" }}>
                  {analyzing ? <><span style={{ animation:"spin 0.8s linear infinite", display:"inline-block" }}>⟳</span> BLIQK is reading this email...</> : analyzed ? "⚡ Analyze again →" : "⚡ Analyze this email →"}
                </button>
              </div>
            </div>

            {/* Result */}
            {analyzing && (
              <div style={{ background:D.card, borderRadius:20, border:`1px solid ${D.border}`, padding:"26px 24px", textAlign:"center", animation:"fadeUp 0.4s ease" }}>
                <div style={{ fontSize:13, color:D.textSecondary, marginBottom:14 }}>Scanning signals...</div>
                <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                  {["Reading urgency","Detecting intent","Scoring priority","Generating action"].map((s,i) => (
                    <div key={i} style={{ padding:"6px 14px", borderRadius:99, background:D.surface, border:`1px solid ${D.border}`, fontSize:12, color:D.textSecondary, animation:`pulse 1.2s ease ${i*0.25}s infinite` }}>{s}</div>
                  ))}
                </div>
              </div>
            )}

            {analyzed && (
              <div style={{ background:D.card, borderRadius:20, border:`1.5px solid ${r.color}40`, boxShadow:`0 8px 48px ${r.color}15`, overflow:"hidden", animation:"fadeUp 0.4s ease" }}>
                <div style={{ background:`linear-gradient(135deg,${r.color}18,${r.color}06)`, borderBottom:`1px solid ${r.color}30`, padding:"18px 24px", display:"flex", alignItems:"center", gap:16 }}>
                  <ScoreRing score={scoreCount} color={r.color}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                      <Pill bg={`${r.color}20`} color={r.color} size={13}>{r.label}</Pill>
                      <Pill bg="rgba(255,255,255,0.06)" color={D.textSecondary} size={11}>{r.priority}</Pill>
                    </div>
                    <div style={{ fontSize:13, color:D.textBody, lineHeight:1.5 }}>{r.reason}</div>
                  </div>
                </div>
                <div style={{ padding:"20px 24px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
                    <div>
                      <Label>✅ Recommended action</Label>
                      <div style={{ background:"rgba(0,214,143,0.08)", border:"1px solid rgba(0,214,143,0.2)", borderRadius:12, padding:"14px", fontSize:14, color:D.success, fontWeight:600, lineHeight:1.5 }}>{r.action}</div>
                    </div>
                    <div>
                      <Label>🚩 Flags detected</Label>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {r.alerts.length > 0 ? r.alerts.map((a: string,i: number) => (
                          <div key={i} style={{ background:"rgba(255,61,90,0.08)", border:"1px solid rgba(255,61,90,0.18)", borderRadius:8, padding:"8px 12px", fontSize:12, color:D.danger, fontWeight:600 }}>⚠️ {a}</div>
                        )) : (
                          <div style={{ background:"rgba(0,214,143,0.06)", border:"1px solid rgba(0,214,143,0.15)", borderRadius:8, padding:"8px 12px", fontSize:12, color:D.success, fontWeight:600 }}>✓ No critical flags</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ background:D.accentBg, border:`1px solid ${D.accentBorder}`, borderRadius:12, padding:"14px 16px", marginBottom:18, display:"flex", gap:10 }}>
                    <span style={{ fontSize:18 }}>⚡</span>
                    <span style={{ fontSize:13, color:D.textBody, lineHeight:1.6 }}>
                      <strong style={{ color:D.textPrimary }}>BLIQK did this in 2 seconds.</strong> Imagine this for every email in your inbox, automatically, every day — without lifting a finger.
                    </span>
                  </div>
                  <button onClick={goNext} style={{ width:"100%", padding:"15px", border:"none", borderRadius:14, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 28px rgba(79,127,255,0.38)" }}>
                    I want this for my business →
                  </button>
                </div>
              </div>
            )}

            {/* Custom email */}
            {!analyzed && !analyzing && (
              <div style={{ marginTop:16 }}>
                <div style={{ textAlign:"center", fontSize:13, color:D.textSecondary, marginBottom:10 }}>— or paste your own email —</div>
                <textarea value={customText} onChange={e=>setCustomText(e.target.value)}
                  placeholder="Paste any real customer email here and see what BLIQK does..."
                  style={{ width:"100%", padding:"14px", borderRadius:14, border:`1px solid ${D.border}`, background:D.card, color:D.textPrimary, fontSize:14, outline:"none", fontFamily:"inherit", resize:"vertical" as const, minHeight:80, boxSizing:"border-box" as const, lineHeight:1.6 }}/>
                {customText.trim() && (
                  <button onClick={runCustom} disabled={customLoading}
                    style={{ marginTop:10, width:"100%", padding:"13px", border:"none", borderRadius:12, background:customLoading?"rgba(255,255,255,0.04)":"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:customLoading?D.textTertiary:"#fff", fontSize:14, fontWeight:700, cursor:customLoading?"default":"pointer", fontFamily:"inherit" }}>
                    {customLoading?"⟳ Analyzing...":"⚡ Analyze my email →"}
                  </button>
                )}
                {customResult && (
                  <div style={{ marginTop:14, background:D.card, border:`1.5px solid ${customResult.color||D.accent}40`, borderRadius:16, padding:"18px 20px", animation:"fadeUp 0.4s ease" }}>
                    <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                      <Pill bg={`${customResult.color||D.accent}20`} color={customResult.color||D.accent} size={13}>{customResult.label||"📨 Classified"}</Pill>
                      <Pill bg="rgba(255,255,255,0.06)" color={D.textSecondary} size={11}>Score: {customResult.score}</Pill>
                    </div>
                    <div style={{ fontSize:14, color:D.success, fontWeight:600, marginBottom:8 }}>✅ {customResult.recommendedAction}</div>
                    <div style={{ fontSize:13, color:D.textBody, marginBottom:16 }}>{customResult.reason}</div>
                    <button onClick={goNext} style={{ width:"100%", padding:"13px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                      I want this for my inbox →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ STEP 1 — PROBLEM ══ */}
        {step===1 && (
          <div style={{ animation:"fadeUp 0.5s ease", textAlign:"center" }}>
            <h2 style={{ margin:"0 0 14px", fontSize:40, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:D.textPrimary }}>
              How many of <em style={{ color:D.accent }}>these</em><br/>live in your inbox right now?
            </h2>
            <p style={{ margin:"0 0 40px", fontSize:15, color:D.textBody, maxWidth:480, marginInline:"auto", lineHeight:1.75 }}>
              Most business owners check email 20+ times a day and still miss the messages that actually matter.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:40 }}>
              {[
                { icon:"😤", title:"The ignored complaint", sub:"You opened it, felt anxious, closed it. Now it's 3 days old and escalating.", color:D.danger, stat:"68%", statLabel:"of legal disputes start from ignored emails" },
                { icon:"🔥", title:"The lost hot lead",     sub:"Someone ready to buy — you replied 2 days later. They went with a competitor.", color:D.warning, stat:"78%", statLabel:"of customers buy from whoever responds first" },
                { icon:"🌀", title:"The daily time drain",  sub:"Reading 50 emails to find the 3 that matter. Every. Single. Day.", color:D.purple, stat:"2.5h", statLabel:"wasted daily on email triage on average" },
              ].map((p,i) => (
                <div key={i} style={{ background:D.card, borderRadius:18, padding:"24px 18px", border:`1px solid ${D.border}`, textAlign:"left", transition:"all 0.2s", cursor:"default" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=p.color+"50";(e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=D.border;(e.currentTarget as HTMLDivElement).style.transform="none";}}>
                  <div style={{ fontSize:26, marginBottom:12 }}>{p.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:D.textPrimary, marginBottom:8 }}>{p.title}</div>
                  <div style={{ fontSize:13, color:D.textBody, lineHeight:1.65, marginBottom:16 }}>{p.sub}</div>
                  <div style={{ borderTop:`1px solid ${D.border}`, paddingTop:14 }}>
                    <div style={{ fontSize:26, fontWeight:800, color:p.color, lineHeight:1 }}>{p.stat}</div>
                    <div style={{ fontSize:11, color:D.textSecondary, marginTop:4, lineHeight:1.5 }}>{p.statLabel}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:D.accentBg, border:`1px solid ${D.accentBorder}`, borderRadius:16, padding:"20px 24px", marginBottom:32, display:"flex", alignItems:"flex-start", gap:16, textAlign:"left" }}>
              <span style={{ fontSize:32 }}>⚡</span>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:D.textPrimary, marginBottom:6 }}>BLIQK reads every email for you.</div>
                <div style={{ fontSize:14, color:D.textBody, lineHeight:1.7 }}>Automatically sorted by urgency, intent, and risk. Legal threats surface in seconds. Hot leads never go cold. The noise stays in the background where it belongs.</div>
              </div>
            </div>
            <button onClick={goNext} style={{ padding:"15px 44px", border:"none", borderRadius:14, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 28px rgba(79,127,255,0.38)" }}>
              Set up my BLIQK inbox →
            </button>
          </div>
        )}

        {/* ══ STEP 2 — CONNECT ══ */}
        {step===2 && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <h2 style={{ margin:"0 0 12px", fontSize:40, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:D.textPrimary }}>
                Connect your inbox<br/><em style={{ color:D.accent }}>in 60 seconds.</em>
              </h2>
              <p style={{ margin:0, fontSize:15, color:D.textBody, lineHeight:1.75 }}>Pick your email provider and BLIQK starts classifying automatically.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:20 }}>
              {IMAP_PROVIDERS.map(p => (
                <div key={p.id} onClick={()=>setConnectPick(p.id)}
                  style={{ background:connectPick===p.id?`${p.color}12`:D.card, borderRadius:16, padding:"20px", border:`2px solid ${connectPick===p.id?p.color:D.border}`, cursor:"pointer", transition:"all 0.2s", position:"relative", boxShadow:connectPick===p.id?`0 4px 24px ${p.color}25`:"none" }}>
                  {p.rec && <div style={{ position:"absolute", top:-10, right:16, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99, boxShadow:"0 2px 8px rgba(79,127,255,0.4)" }}>Most popular</div>}
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:13, background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{p.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:D.textPrimary }}>{p.name}</div>
                      <div style={{ fontSize:11, color:D.textSecondary, fontFamily:"monospace", marginTop:2 }}>{p.host||"custom server"} · {p.port}</div>
                    </div>
                    {connectPick===p.id && <div style={{ width:22, height:22, borderRadius:"50%", background:p.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", flexShrink:0 }}>✓</div>}
                  </div>
                </div>
              ))}
            </div>
            {connectPick && (
              <div style={{ background:D.card, borderRadius:16, border:`1px solid ${D.border}`, padding:"22px 24px", marginBottom:20, animation:"fadeUp 0.3s ease" }}>
                <Label>Connection details</Label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  {[{l:"Email address",p:"you@company.com",t:"email"},{l:"App Password",p:"Generate in account settings",t:"password"}].map((f,i)=>(
                    <div key={i}>
                      <Label>{f.l}</Label>
                      <input type={f.t} placeholder={f.p} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:`1px solid ${D.border}`, background:"rgba(255,255,255,0.04)", color:D.textPrimary, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const }}/>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:12, color:D.textSecondary, lineHeight:1.7 }}>
                  🔒 Encrypted with AES-256-GCM. We never store your password in plain text.
                </div>
                {(() => { const p=IMAP_PROVIDERS.find(x=>x.id===connectPick); return p?.tip && <div style={{ marginTop:10, background:D.surface, borderRadius:8, padding:"10px 14px", fontSize:12, color:D.textBody, lineHeight:1.6 }}>💡 {p.tip}</div>; })()}
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <button onClick={goNext} style={{ padding:"14px", borderRadius:14, border:"none", background:connectPick?"linear-gradient(135deg,#4F7FFF,#00D4FF)":"rgba(255,255,255,0.05)", color:connectPick?"#fff":D.textTertiary, fontSize:15, fontWeight:700, cursor:connectPick?"pointer":"default", fontFamily:"inherit", boxShadow:connectPick?"0 6px 28px rgba(79,127,255,0.38)":"none" }}>
                {connectPick?"Connect & import emails →":"Select a provider first"}
              </button>
              <button onClick={goNext} style={{ padding:"14px", borderRadius:14, border:`1px solid ${D.border}`, background:"transparent", color:D.textSecondary, fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>
                Skip — use Smart Capture for now
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — DONE ══ */}
        {step===3 && (
          <div style={{ textAlign:"center", animation:"fadeUp 0.5s ease" }}>
            <div style={{ fontSize:64, marginBottom:20, animation:"bounce 0.7s cubic-bezier(.36,.07,.19,.97)" }}>🎉</div>
            <h2 style={{ margin:"0 0 14px", fontSize:42, fontWeight:400, fontFamily:"'Instrument Serif',serif", lineHeight:1.1, color:D.textPrimary }}>
              You're all set.<br/><em style={{ color:D.accent }}>Welcome to BLIQK.</em>
            </h2>
            <p style={{ margin:"0 0 40px", fontSize:16, color:D.textBody, lineHeight:1.75, maxWidth:460, marginInline:"auto" }}>
              BLIQK is now watching your inbox. You'll never miss a critical message again.
            </p>
            <div style={{ background:D.card, borderRadius:20, border:`1px solid ${D.border}`, padding:"28px 24px", marginBottom:32, textAlign:"left" }}>
              <Label>What happens next</Label>
              {[
                { icon:"⚡", title:"Right now",      desc:"BLIQK imports your last 20 emails and classifies them automatically.",  color:D.accent,   time:"0 min" },
                { icon:"📊", title:"First hour",     desc:"BLIQK learns your email patterns. Classifications improve over time.",   color:D.success,  time:"~60 min" },
                { icon:"🔔", title:"Set up alerts",  desc:"Connect WhatsApp to get notified instantly when a critical email arrives.", color:D.warning, time:"2 min" },
                { icon:"👥", title:"Invite your team",desc:"Add team members so everyone sees the same priority inbox.",            color:D.purple,   time:"Optional" },
              ].map((s,i,arr) => (
                <div key={i} style={{ display:"flex", gap:14, paddingBottom:i<arr.length-1?18:0, marginBottom:i<arr.length-1?18:0, borderBottom:i<arr.length-1?`1px solid ${D.border}`:"none" }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${s.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{s.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:D.textPrimary }}>{s.title}</div>
                      <div style={{ fontSize:11, color:D.textSecondary, background:"rgba(255,255,255,0.05)", padding:"2px 9px", borderRadius:99 }}>{s.time}</div>
                    </div>
                    <div style={{ fontSize:13, color:D.textBody, lineHeight:1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/login")} style={{ width:"100%", padding:"16px", border:"none", borderRadius:14, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 36px rgba(79,127,255,0.42)", marginBottom:12 }}>
              ⚡ Open my BLIQK inbox →
            </button>
            <div style={{ fontSize:13, color:D.textSecondary }}>14 days free · No credit card required</div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0;transform:translateY(18px); } to { opacity:1;transform:none; } }
        @keyframes pulse   { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes bounce  { 0%,100%{transform:none} 40%{transform:scale(1.25)} 70%{transform:scale(.95)} }
      `}</style>
    </div>
  );
}
