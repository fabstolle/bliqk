"use client";
import { useState } from "react";
import { useSettings, THEMES, ThemeId, FontSize, FONT_SIZES } from "@/lib/settings-context";

export default function SettingsPage() {
  const { t, fs, s, theme, setTheme, fontSize, setFontSize, contrast, setContrast, language, setLanguage } = useSettings();
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Section = ({ title, children }: { title:string; children:React.ReactNode }) => (
    <div style={{ background:t.card, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.border}`, marginBottom:16 }}>
      <div style={{ fontSize:10, fontWeight:700, color:t.textSecondary, textTransform:"uppercase", letterSpacing:1.2, marginBottom:18 }}>{title}</div>
      {children}
    </div>
  );

  const Btn = ({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) => (
    <button onClick={onClick} style={{ padding:"8px 16px", borderRadius:9, border:`1.5px solid ${active?t.accent:t.border}`, background:active?t.accentBg:"transparent", color:active?t.accent:t.textSecondary, fontSize:fs.sm, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
      {children}
    </button>
  );

  return (
    <div style={{ padding:"32px 36px", maxWidth:700, color:t.textPrimary }}>
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:700, fontFamily:"'Instrument Serif',serif", color:t.textPrimary }}>
        {s.settingsTitle} ⚙️
      </h2>
      <p style={{ margin:"0 0 24px", fontSize:fs.sm, color:t.textBody }}>{s.settingsSubtitle}</p>

      {/* ── Themes ── */}
      <Section title={s.themeLabel}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {(Object.keys(THEMES) as ThemeId[]).map(id => {
            const th = THEMES[id];
            const active = theme === id;
            return (
              <div key={id} onClick={() => setTheme(id)}
                style={{ border:`2px solid ${active?th.accent:t.border}`, borderRadius:14, overflow:"hidden", cursor:"pointer", transition:"all 0.2s", transform:active?"scale(1.05)":"scale(1)", boxShadow:active?`0 6px 20px ${th.accent}30`:"none" }}>
                {/* Mini preview */}
                <div style={{ height:64, background:th.bg, display:"flex" }}>
                  <div style={{ width:28, background:th.surface, borderRight:`1px solid ${th.border}`, padding:"5px 4px", display:"flex", flexDirection:"column", gap:3 }}>
                    <div style={{ width:12, height:12, borderRadius:3, background:th.accent, marginBottom:3 }}/>
                    <div style={{ height:4, borderRadius:2, background:th.navActive }}/>
                    <div style={{ height:4, borderRadius:2, background:"rgba(255,255,255,0.04)" }}/>
                  </div>
                  <div style={{ flex:1, padding:"5px 5px", display:"flex", flexDirection:"column", gap:3 }}>
                    {[th.danger,th.warning,th.success].map((c,i) => (
                      <div key={i} style={{ height:5, borderRadius:2, borderLeft:`2px solid ${c}`, background:th.card }}/>
                    ))}
                  </div>
                </div>
                <div style={{ padding:"6px 8px", background:t.card }}>
                  <div style={{ fontSize:10, fontWeight:700, color:t.textPrimary }}>{language==="en"?th.name:th.nameEs}</div>
                  <div style={{ fontSize:8, color:t.textSecondary, marginTop:1 }}>{language==="en"?th.tag:th.tagEs}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Font size ── */}
      <Section title={s.fontSizeLabel}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
          {(Object.keys(FONT_SIZES) as FontSize[]).map(id => (
            <Btn key={id} active={fontSize===id} onClick={() => setFontSize(id)}>
              <span style={{ fontSize:FONT_SIZES[id].base }}>{FONT_SIZES[id].label}</span>
            </Btn>
          ))}
        </div>
        <div style={{ background:t.bg, borderRadius:10, padding:"12px 16px", border:`1px solid ${t.border}` }}>
          <div style={{ fontSize:fs.base, fontWeight:700, color:t.textPrimary, marginBottom:4 }}>Preview — {fs.label}</div>
          <div style={{ fontSize:fs.sm, color:t.textBody, lineHeight:1.6 }}>{s.fontPreview}</div>
          <div style={{ fontSize:fs.xs, color:t.textSecondary, marginTop:3 }}>
            {language==="en"?"Labels and timestamps at XS size.":"Etiquetas y horarios en tamaño XS."}
          </div>
        </div>
      </Section>

      {/* ── Contrast ── */}
      <Section title={s.contrastLabel}>
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <Btn active={contrast==="standard"} onClick={() => setContrast("standard")}>{s.standardContrast}</Btn>
          <Btn active={contrast==="high"}     onClick={() => setContrast("high")}>⚡ {s.highContrast}</Btn>
        </div>
        <div style={{ fontSize:fs.sm, color:t.textBody, lineHeight:1.6 }}>{s.contrastDesc}</div>
      </Section>

      {/* ── Language ── */}
      <Section title={s.languageLabel}>
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <Btn active={language==="en"} onClick={() => setLanguage("en")}>🇺🇸 English</Btn>
          <Btn active={language==="es"} onClick={() => setLanguage("es")}>🇲🇽 Español</Btn>
        </div>
        <div style={{ fontSize:fs.sm, color:t.textBody }}>{s.langDesc}</div>
      </Section>

      {/* ── Save ── */}
      <button onClick={save}
        style={{ width:"100%", padding:14, border:"none", borderRadius:12, background:saved?`${t.success}18`:`linear-gradient(135deg,${t.accent},#00D4FF)`, color:saved?t.success:"#fff", fontSize:fs.base, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:saved?"none":`0 6px 20px ${t.accent}30`, transition:"all 0.3s" }}>
        {saved ? `✅ ${s.saved}` : `💾 ${s.saveSettings}`}
      </button>

      <div style={{ marginTop:14, textAlign:"center", fontSize:10, color:t.textSecondary }}>
        {s.autoSaved}
      </div>
    </div>
  );
}
