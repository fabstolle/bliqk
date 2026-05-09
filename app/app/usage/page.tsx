"use client";
import { useSettings } from "@/lib/settings-context";

export default function UsagePage() {
  const { t, fs, s } = useSettings();
  const stats = [
    { l:s.messages, v:"1,247", i:"📨", c:t.accent  },
    { l:s.aiCalls,  v:"89",    i:"🤖", c:t.purple  },
    { l:s.cacheHits,v:"203",   i:"⚡", c:t.success },
    { l:s.estCost,  v:"$2.18", i:"💰", c:t.warning },
  ];
  return (
    <div style={{ padding:"32px 36px", maxWidth:840, color:t.textPrimary }}>
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:700, fontFamily:"'Instrument Serif',serif" }}>{s.usageTitle} 📊</h2>
      <p style={{ margin:"0 0 24px", fontSize:fs.sm, color:t.textBody }}>{s.usageSub}</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {stats.map((x,i) => (
          <div key={i} style={{ background:t.card, borderRadius:16, padding:"18px 20px", border:`1px solid ${t.border}` }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${x.c}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:10 }}>{x.i}</div>
            <div style={{ fontSize:26, fontWeight:800, color:x.c, lineHeight:1, fontFamily:"monospace" }}>{x.v}</div>
            <div style={{ fontSize:12, color:t.textSecondary, marginTop:4 }}>{x.l}</div>
          </div>
        ))}
      </div>
      <div style={{ background:t.card, borderRadius:16, padding:"20px 22px", border:`1px solid ${t.border}`, marginBottom:14, maxWidth:600 }}>
        <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase" as const, letterSpacing:0.8, marginBottom:14 }}>💰 {s.costBreakdown}</div>
        {[{l:"Claude API (Sonnet)",c:"$0.18",p:5},{l:"Vercel + Neon DB",c:"$30.00",p:88},{l:"Gmail / Outlook API",c:"$0.00",p:0}].map((row,i,arr) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 0", borderBottom:i<arr.length-1?`1px solid ${t.border}`:"none" }}>
            <div style={{ flex:1, fontSize:fs.sm, color:t.textBody }}>{row.l}</div>
            <div style={{ width:120, height:4, background:t.border, borderRadius:99, overflow:"hidden" }}>
              <div style={{ width:`${row.p}%`, height:"100%", background:`linear-gradient(90deg,${t.accent},#00D4FF)`, borderRadius:99 }}/>
            </div>
            <div style={{ fontFamily:"monospace", fontSize:fs.sm, fontWeight:700, color:t.textPrimary, minWidth:60, textAlign:"right" }}>{row.c}</div>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:`2px solid ${t.border}`, marginTop:4 }}>
          <span style={{ fontSize:fs.base, fontWeight:700, color:t.textPrimary }}>{s.totalMonth}</span>
          <span style={{ fontFamily:"monospace", fontSize:20, fontWeight:800, color:t.success }}>$30.18</span>
        </div>
      </div>
      <div style={{ background:`${t.success}08`, border:`1px solid ${t.success}20`, borderRadius:14, padding:"14px 18px", maxWidth:600 }}>
        <div style={{ fontWeight:700, fontSize:fs.sm, color:t.success, marginBottom:6 }}>⚡ {s.optimActive}</div>
        <div style={{ fontSize:fs.xs, color:t.textBody, lineHeight:1.7 }}>{s.optimDetail}</div>
      </div>
    </div>
  );
}
