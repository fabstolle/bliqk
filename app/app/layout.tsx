"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSettings } from "@/lib/settings-context";
import { INBOX_MSGS } from "@/lib/data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path   = usePathname();
  const { t, fs, s, language, setLanguage, theme, setTheme } = useSettings();
  const unread   = INBOX_MSGS.filter(m => m.unread).length;
  const critical = INBOX_MSGS.filter(m => m.priority==="critical").length;
  const isDark   = ["midnight","forest","obsidian"].includes(theme);

  const NAV = [
    { href:"/app/inbox",        icon:"📥", label:s.inbox },
    { href:"/app/capture",      icon:"✍️", label:s.capture },
    { href:"/app/integrations", icon:"🔌", label:s.integrations },
    { href:"/app/usage",        icon:"📊", label:s.usage },
    { href:"/app/settings",     icon:"⚙️", label:s.settings },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", background:t.bg, color:t.textPrimary, fontFamily:"'DM Sans',sans-serif", overflow:"hidden" }}>
      {/* Sidebar */}
      <div style={{ width:224, background:t.surface, borderRight:`1px solid ${t.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${t.accent},#00D4FF)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, boxShadow:`0 4px 12px ${t.accent}40` }}>⚡</div>
              <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:17, color:t.accent }}>BLIQK</span>
            </div>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={() => setLanguage(language==="en"?"es":"en")}
                style={{ fontSize:12, background:"transparent", border:`1px solid ${t.border}`, borderRadius:6, padding:"2px 6px", cursor:"pointer", color:t.textSecondary }}>
                {language==="en"?"🇲🇽":"🇺🇸"}
              </button>
              <button onClick={() => setTheme(isDark?"dawn":"midnight")}
                style={{ fontSize:12, background:"transparent", border:`1px solid ${t.border}`, borderRadius:6, padding:"2px 6px", cursor:"pointer", color:t.textSecondary }}>
                {isDark?"☀️":"🌙"}
              </button>
            </div>
          </div>
          <div style={{ fontSize:9, color:t.textSecondary, letterSpacing:0.8 }}>{s.seeWhat}</div>
        </div>

        {critical > 0 && (
          <div style={{ margin:"8px 8px 0", background:`${t.danger}12`, border:`1px solid ${t.danger}25`, borderRadius:8, padding:"7px 11px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:t.danger }}>⚠️ {critical} critical</div>
            <div style={{ fontSize:10, color:t.textSecondary, marginTop:1 }}>{s.criticalAlert}</div>
          </div>
        )}

        <nav style={{ flex:1, padding:"8px 6px", marginTop:critical>0?4:0 }}>
          {NAV.map(item => {
            const active = path===item.href || (item.href!=="/app" && path.startsWith(item.href));
            return (
              <button key={item.href} onClick={() => router.push(item.href)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"8px 11px", borderRadius:9, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:fs.sm, fontWeight:600, marginBottom:2, transition:"all 0.15s",
                  background:active?t.navActive:"transparent", color:active?t.accent:t.textSecondary,
                  borderLeft:`2px solid ${active?t.accent:"transparent"}` }}>
                <span style={{ fontSize:14 }}>{item.icon}</span>
                <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                {item.href==="/app/inbox" && unread>0 && (
                  <span style={{ background:t.danger, color:"#fff", borderRadius:99, fontSize:9, fontWeight:700, padding:"1px 5px" }}>{unread}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding:"10px 12px 14px", borderTop:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${t.accent},${t.purple})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff" }}>F</div>
            <div>
              <div style={{ fontSize:fs.sm, fontWeight:600, color:t.textPrimary }}>Founder</div>
              <div style={{ fontSize:9, color:t.textSecondary }}>founder@bliqk.ai</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ flex:1, overflowY:"auto" }}>{children}</div>
      </div>
    </div>
  );
}
