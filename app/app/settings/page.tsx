"use client";
import { useRouter } from "next/navigation";
import { D } from "@/lib/tokens";

const Label = ({children}:any) => (
  <div style={{fontSize:10,fontWeight:700,color:D.textSecondary,textTransform:"uppercase",letterSpacing:1.2,marginBottom:7}}>{children}</div>
);

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div style={{padding:"32px 36px",maxWidth:600,color:D.textPrimary}}>
      <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:700,fontFamily:"'Instrument Serif',serif"}}>Settings ⚙️</h2>
      <p style={{margin:"0 0 24px",fontSize:14,color:D.textBody}}>Manage your BLIQK workspace.</p>
      {[
        {title:"AI Provider",val:"Claude Sonnet 4 (Anthropic)",sub:"Used for classification and reply generation"},
        {title:"Confidence threshold",val:"70%",sub:"AI only runs when rule confidence is below this"},
        {title:"Mock mode",val:"Active",sub:"Import demo emails without real OAuth credentials"},
        {title:"Environment",val:"Production",sub:"NODE_ENV=production"},
      ].map((s,i)=>(
        <div key={i} style={{background:D.card,borderRadius:12,padding:"16px 20px",marginBottom:10,border:`1px solid ${D.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:D.textPrimary,marginBottom:2}}>{s.title}</div>
            <div style={{fontSize:12,color:D.textSecondary}}>{s.sub}</div>
          </div>
          <span style={{fontFamily:"monospace",fontSize:12,color:D.accent,background:D.accentBg,padding:"4px 10px",borderRadius:8}}>{s.val}</span>
        </div>
      ))}
      <div style={{marginTop:24}}>
        <button onClick={()=>router.push("/onboarding")}
          style={{padding:"11px 22px",border:`1px solid ${D.border}`,borderRadius:10,background:"transparent",color:D.textSecondary,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
          ← View onboarding demo again
        </button>
      </div>
    </div>
  );
}
