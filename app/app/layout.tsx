"use client";
import { useRouter, usePathname } from "next/navigation";
import { D } from "@/lib/tokens";
import { INBOX_MESSAGES } from "@/lib/data";

const NAV = [
  { href:"/app/inbox",        icon:"📥", label:"Inbox" },
  { href:"/app/capture",      icon:"✍️", label:"Smart Capture" },
  { href:"/app/integrations", icon:"🔌", label:"Integrations" },
  { href:"/app/usage",        icon:"📊", label:"Usage & Costs" },
  { href:"/app/settings",     icon:"⚙️", label:"Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router  = useRouter();
  const path    = usePathname();
  const unread  = INBOX_MESSAGES.filter(m => m.unread).length;
  const critical = INBOX_MESSAGES.filter(m => m.priority === "critical").length;

  return (
    <div style={{ display:"flex", height:"100vh", background:D.bg, color:D.textPrimary, fontFamily:"'DM Sans',sans-serif", overflow:"hidden" }}>

      {/* Sidebar */}
      <div style={{ width:220, background:D.surface, borderRight:`1px solid ${D.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"20px 18px 16px", borderBottom:`1px solid ${D.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#4F7FFF,#00D4FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, boxShadow:"0 4px 14px rgba(79,127,255,0.4)" }}>⚡</div>
            <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, color:D.accent }}>BLIQK</span>
          </div>
          {/* FIXED: was D.textTertiary (#6B7394) → D.textSecondary (#9BA3C0) */}
          <div style={{ fontSize:10, color:D.textSecondary, marginTop:3, letterSpacing:0.8 }}>
            SEE WHAT NEEDS ACTION
          </div>
        </div>

        {/* Critical alert */}
        {critical > 0 && (
          <div style={{ margin:"10px 10px 0", background:"rgba(255,61,90,0.1)", border:"1px solid rgba(255,61,90,0.2)", borderRadius:9, padding:"8px 12px" }}>
            {/* FIXED: textSecondary instead of textTertiary */}
            <div style={{ fontSize:11, fontWeight:700, color:D.danger }}>⚠️ {critical} critical message{critical>1?"s":""}</div>
            <div style={{ fontSize:10, color:D.textSecondary, marginTop:2 }}>Requires immediate action</div>
          </div>
        )}

        <nav style={{ flex:1, padding:"8px 6px", marginTop:critical>0?4:0 }}>
          {NAV.map(item => {
            const active = path === item.href || (item.href !== "/app" && path.startsWith(item.href));
            return (
              <button key={item.href} onClick={() => router.push(item.href)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"8px 11px", borderRadius:9, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:600, marginBottom:2, transition:"all 0.15s",
                  background:active?D.navActive:"transparent",
                  color:active?D.accent:D.textSecondary,   // FIXED: was D.textTertiary
                  borderLeft:`2px solid ${active?D.accent:"transparent"}` }}>
                <span style={{ fontSize:14 }}>{item.icon}</span>
                <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                {item.href==="/app/inbox" && unread>0 && (
                  <span style={{ background:D.danger, color:"#fff", borderRadius:99, fontSize:10, fontWeight:700, padding:"1px 6px" }}>{unread}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding:"10px 12px 14px", borderTop:`1px solid ${D.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#4F7FFF,#7C4DFF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff" }}>F</div>
            <div>
              {/* FIXED: was D.textTertiary → D.textPrimary for name, D.textSecondary for email */}
              <div style={{ fontSize:12, fontWeight:600, color:D.textPrimary }}>Founder</div>
              <div style={{ fontSize:10, color:D.textSecondary }}>founder@bliqk.ai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ flex:1, overflowY:"auto" }}>{children}</div>
      </div>
    </div>
  );
}
