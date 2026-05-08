"use client";
import { D } from "@/lib/tokens";

const Label = ({children}:any) => (
  <div style={{fontSize:10,fontWeight:700,color:D.textSecondary,textTransform:"uppercase",letterSpacing:1.2,marginBottom:7}}>{children}</div>
);

export default function UsagePage() {
  const stats = [
    {l:"Messages ingested",v:"1,247",i:"📨",c:D.accent},
    {l:"AI calls",v:"89",i:"🤖",c:"#8B5CF6"},
    {l:"Cache hits",v:"203",i:"⚡",c:D.success},
    {l:"Est. cost",v:"$2.18",i:"💰",c:D.warning},
  ];
  return (
    <div style={{padding:"32px 36px",maxWidth:840,color:D.textPrimary}}>
      <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,fontFamily:"'Instrument Serif',serif"}}>Usage & Costs 📊</h2>
      <p style={{margin:"0 0 24px",fontSize:14,color:D.textBody}}>Full transparency on AI usage and costs.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
        {stats.map((s,i)=>(
          <div key={i} style={{background:D.card,borderRadius:16,padding:"18px 20px",border:`1px solid ${D.border}`}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${s.c}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:10}}>{s.i}</div>
            <div style={{fontSize:26,fontWeight:800,color:s.c,lineHeight:1,fontFamily:"monospace"}}>{s.v}</div>
            <div style={{fontSize:12,color:D.textSecondary,marginTop:4}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:D.card,borderRadius:16,padding:"20px 22px",border:`1px solid ${D.border}`,marginBottom:14,maxWidth:600}}>
        <Label>💰 Cost Breakdown — This Month</Label>
        {[{l:"Claude API (Sonnet)",c:"$0.18",p:5},{l:"Vercel + Neon DB",c:"$30.00",p:88},{l:"Gmail / Outlook API",c:"$0.00",p:0}].map((row,i,arr)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 0",borderBottom:i<arr.length-1?`1px solid ${D.border}`:"none"}}>
            <div style={{flex:1,fontSize:13,color:D.textBody}}>{row.l}</div>
            <div style={{width:120,height:4,background:D.border,borderRadius:99,overflow:"hidden"}}>
              <div style={{width:`${row.p}%`,height:"100%",background:`linear-gradient(90deg,${D.accent},${D.accent2})`,borderRadius:99}}/>
            </div>
            <div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:D.textPrimary,minWidth:60,textAlign:"right"}}>{row.c}</div>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:`2px solid ${D.border}`,marginTop:4}}>
          <span style={{fontSize:14,fontWeight:700,color:D.textPrimary}}>Total this month</span>
          <span style={{fontFamily:"monospace",fontSize:20,fontWeight:800,color:D.success}}>$30.18</span>
        </div>
      </div>
      <div style={{background:"rgba(0,214,143,0.06)",border:"1px solid rgba(0,214,143,0.15)",borderRadius:14,padding:"14px 18px",maxWidth:600}}>
        <div style={{fontWeight:700,fontSize:13,color:D.success,marginBottom:6}}>⚡ Cost optimization active</div>
        <div style={{fontSize:12,color:D.textBody,lineHeight:1.7}}>Rules first (free) · Cache hits saved 203 AI calls · Only 7% of messages needed Claude</div>
      </div>
    </div>
  );
}
