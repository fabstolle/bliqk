export default function UsagePage() {
  const stats = [
    { label:"Messages ingested", value:"1,247", icon:"📨", color:"#4F7FFF", sub:"This billing cycle" },
    { label:"AI calls",          value:"89",    icon:"🤖", color:"#7C4DFF", sub:"Claude API calls" },
    { label:"Cache hits",        value:"203",   icon:"⚡", color:"#00C853", sub:"Saved 203 AI calls" },
    { label:"Estimated cost",    value:"$2.18", icon:"💰", color:"#FF6D00", sub:"AI tokens only" },
  ];
  const breakdown = [
    { label:"Claude API (Sonnet) — AI calls",    cost:"$0.18", pct:20 },
    { label:"Base infra (Vercel + Neon DB)",      cost:"$30.00", pct:70 },
    { label:"Gmail API",                          cost:"$0.00",  pct:0  },
    { label:"Microsoft Graph API",                cost:"$0.00",  pct:0  },
  ];
  return (
    <div style={{ padding:"32px 36px", maxWidth:840 }}>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800 }}>Usage &amp; Costs 📊</h2>
        <p style={{ margin:0, fontSize:13, color:"#4A5080" }}>Full transparency on tokens, AI calls, and estimated costs.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
        {stats.map((s,i)=>(
          <div key={i} style={{ background:"#12152A", borderRadius:16, padding:"18px 20px", border:"1px solid #1E2140" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:12 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1, fontFamily:"monospace" }}>{s.value}</div>
            <div style={{ fontSize:11, color:"#4A5080", marginTop:4 }}>{s.label}</div>
            <div style={{ fontSize:10, color:`${s.color}80`, marginTop:2, fontWeight:600 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#12152A", borderRadius:16, padding:"20px 22px", border:"1px solid #1E2140", marginBottom:16, maxWidth:640 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#4A5080", textTransform:"uppercase", letterSpacing:0.8, marginBottom:14 }}>💰 Cost Breakdown — This Month</div>
        {breakdown.map((row,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 0", borderBottom:i<breakdown.length-1?"1px solid #1A1D30":"none" }}>
            <div style={{ flex:1, fontSize:13, color:"#8B90A8" }}>{row.label}</div>
            <div style={{ width:120, height:4, background:"#1A1D30", borderRadius:99, overflow:"hidden" }}>
              <div style={{ width:`${row.pct}%`, height:"100%", background:"linear-gradient(90deg,#4F7FFF,#00D4FF)", borderRadius:99 }}/>
            </div>
            <div style={{ fontFamily:"monospace", fontSize:13, fontWeight:700, color:"#E8EAF6", minWidth:60, textAlign:"right" }}>{row.cost}</div>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"2px solid #1E2140", marginTop:4 }}>
          <span style={{ fontSize:14, fontWeight:700 }}>Total estimated this month</span>
          <span style={{ fontFamily:"monospace", fontSize:20, fontWeight:800, color:"#00C853" }}>$30.18</span>
        </div>
      </div>

      <div style={{ background:"rgba(0,200,83,0.06)", border:"1px solid rgba(0,200,83,0.15)", borderRadius:14, padding:"14px 18px", maxWidth:640 }}>
        <div style={{ fontWeight:700, fontSize:13, color:"#00C853", marginBottom:6 }}>⚡ Optimization active</div>
        <div style={{ fontSize:12, color:"#4A5080", lineHeight:1.7 }}>
          <strong style={{ color:"#8B90A8" }}>Rules first:</strong> 1,158 messages classified without AI ·{" "}
          <strong style={{ color:"#8B90A8" }}>Cache hits:</strong> 203 results reused ·{" "}
          <strong style={{ color:"#8B90A8" }}>AI usage:</strong> Only 7% of messages needed Claude
        </div>
      </div>
    </div>
  );
}
