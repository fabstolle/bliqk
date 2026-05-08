"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type ThemeId   = "midnight" | "dawn" | "forest" | "paper" | "obsidian";
export type FontSize  = "xs" | "sm" | "md" | "lg" | "xl";
export type Contrast  = "standard" | "high";
export type Language  = "en" | "es";

// ─── 5 THEMES ────────────────────────────────────────────────────────────────
export interface Theme {
  id: ThemeId;
  name: string; nameEs: string;
  tag: string;  tagEs: string;
  bg: string; surface: string; card: string;
  border: string;
  textPrimary: string; textBody: string; textSecondary: string; textTertiary: string;
  accent: string; accentBg: string; accentBorder: string;
  danger: string; warning: string; success: string; purple: string;
  navActive: string;
  inputBg: string; inputBorder: string;
}

export const THEMES: Record<ThemeId, Theme> = {
  midnight: {
    id:"midnight", name:"Midnight", nameEs:"Medianoche", tag:"Default dark", tagEs:"Oscuro predeterminado",
    bg:"#090B14", surface:"#0E1120", card:"#131829", border:"rgba(255,255,255,0.08)",
    textPrimary:"#F0F2FF", textBody:"#C8CCDF", textSecondary:"#9BA3C0", textTertiary:"#6B7394",
    accent:"#4F7FFF", accentBg:"rgba(79,127,255,0.12)", accentBorder:"rgba(79,127,255,0.25)",
    danger:"#FF3D5A", warning:"#FF7A2F", success:"#00D68F", purple:"#8B5CF6",
    navActive:"rgba(79,127,255,0.12)", inputBg:"rgba(255,255,255,0.04)", inputBorder:"rgba(255,255,255,0.08)",
  },
  dawn: {
    id:"dawn", name:"Dawn", nameEs:"Amanecer", tag:"Clean light", tagEs:"Claro y limpio",
    bg:"#F7F8FC", surface:"#FFFFFF", card:"#FFFFFF", border:"#E4E8F5",
    textPrimary:"#1A1A2E", textBody:"#3D4266", textSecondary:"#6B7299", textTertiary:"#A0A8CC",
    accent:"#3D6AFF", accentBg:"rgba(61,106,255,0.08)", accentBorder:"rgba(61,106,255,0.2)",
    danger:"#D32F2F", warning:"#E65100", success:"#2E7D32", purple:"#6A1B9A",
    navActive:"rgba(61,106,255,0.1)", inputBg:"#F0F2FF", inputBorder:"#D4DAF0",
  },
  forest: {
    id:"forest", name:"Forest", nameEs:"Bosque", tag:"Nature-inspired", tagEs:"Inspirado en naturaleza",
    bg:"#0A1510", surface:"#0F1D14", card:"#142019", border:"rgba(76,175,130,0.15)",
    textPrimary:"#D4EAD8", textBody:"#A8C9AE", textSecondary:"#7BA882", textTertiary:"#4A7050",
    accent:"#4CAF82", accentBg:"rgba(76,175,130,0.12)", accentBorder:"rgba(76,175,130,0.25)",
    danger:"#F44336", warning:"#FFB74D", success:"#81C784", purple:"#CE93D8",
    navActive:"rgba(76,175,130,0.15)", inputBg:"rgba(255,255,255,0.04)", inputBorder:"rgba(76,175,130,0.2)",
  },
  paper: {
    id:"paper", name:"Paper", nameEs:"Papel", tag:"Warm minimal", tagEs:"Mínimo cálido",
    bg:"#FAF8F4", surface:"#F5F2EC", card:"#FFFFFF", border:"#DDD9CF",
    textPrimary:"#2C2820", textBody:"#4A4238", textSecondary:"#7A7060", textTertiary:"#B0A898",
    accent:"#C8622A", accentBg:"rgba(200,98,42,0.08)", accentBorder:"rgba(200,98,42,0.2)",
    danger:"#C62828", warning:"#BF6000", success:"#37693B", purple:"#6A1B9A",
    navActive:"rgba(200,98,42,0.08)", inputBg:"#FAF8F4", inputBorder:"#DDD9CF",
  },
  obsidian: {
    id:"obsidian", name:"Obsidian", nameEs:"Obsidiana", tag:"High contrast", tagEs:"Alto contraste",
    bg:"#000000", surface:"#080808", card:"#111111", border:"rgba(255,255,255,0.12)",
    textPrimary:"#FFFFFF", textBody:"#D0D0D0", textSecondary:"#A0A0A0", textTertiary:"#707070",
    accent:"#00E5FF", accentBg:"rgba(0,229,255,0.1)", accentBorder:"rgba(0,229,255,0.25)",
    danger:"#FF1744", warning:"#FF9100", success:"#00E676", purple:"#D500F9",
    navActive:"rgba(0,229,255,0.1)", inputBg:"rgba(255,255,255,0.05)", inputBorder:"rgba(255,255,255,0.15)",
  },
};

// ─── FONT SIZES ───────────────────────────────────────────────────────────────
export const FONT_SIZES: Record<FontSize, { base:number; sm:number; xs:number; label:string }> = {
  xs: { base:11, sm:9,  xs:8,  label:"XS · 11px" },
  sm: { base:12, sm:10, xs:9,  label:"S · 12px"  },
  md: { base:14, sm:11, xs:10, label:"M · 14px"  },
  lg: { base:16, sm:13, xs:11, label:"L · 16px"  },
  xl: { base:19, sm:15, xs:13, label:"XL · 19px" },
};

// ─── STRINGS (EN / ES) ────────────────────────────────────────────────────────
export const STRINGS = {
  en: {
    inbox:"Inbox", smartCapture:"Smart Capture", integrations:"Integrations",
    usageCosts:"Usage & Costs", settings:"Settings",
    priorityInbox:"Priority Inbox", allMessages:"All", critical:"Critical",
    complaints:"Issues", leads:"Leads", unread:"Unread",
    selectMessage:"Select a message", generateReply:"Generate reply",
    generating:"Generating...", aiDraft:"AI Draft Reply", reviewBefore:"Review before sending",
    copy:"Copy", approve:"Approve", copied:"Copied ✓",
    from:"From", time:"Time", message:"Message", recommendedAction:"Recommended Action",
    reason:"Reason", alerts:"Alerts", score:"Score",
    captureTitle:"Smart Capture", captureSubtitle:"Paste any email — BLIQK classifies it instantly.",
    sender:"Sender", subject:"Subject", messageBody:"Message Body",
    pastePlaceholder:"Paste the email content here...",
    classifyBtn:"Classify & Save to Inbox", classifying:"Classifying...",
    bliqkResult:"BLIQK Result", actionLabel:"Action:", reasonLabel:"Reason:",
    settingsTitle:"Settings", settingsSubtitle:"Customize your BLIQK workspace.",
    themeLabel:"Theme", fontSizeLabel:"Font size", contrastLabel:"Contrast",
    languageLabel:"Language", standardContrast:"Standard", highContrast:"High contrast",
    tourLabel:"Product tour", restartTour:"Restart tour",
    restartTourSub:"Walk through BLIQK's features again.",
    restart:"Restart", saved:"Settings saved ✓",
    goodMorning:"Good morning", criticalWaiting:"critical messages waiting for action.",
    quickActions:"Quick actions",
    msgs:"msgs", aiActive:"BLIQK AI is active",
    aiActiveDesc:"Rule classifier running. Claude AI on standby for ambiguous messages.",
    connectBtn:"Connect", cancel:"Cancel", setupTip:"Setup tip:",
    encryptedNote:"Encrypted with AES-256-GCM. We never store your password in plain text.",
    connected:"Connected", mockMode:"Mock Mode", mockImport:"Mock Import",
    imported:"Imported ✓", active:"Active",
    usageTitle:"Usage & Costs", usageSubtitle:"Full transparency on AI usage and costs.",
    costBreakdown:"Cost Breakdown — This Month", totalMonth:"Total this month",
    optimActive:"Cost optimization active",
    optimDetail:"Rules first (free) · Cache hits save 203 AI calls · Only 7% needed Claude",
    messages:"Messages", aiCalls:"AI calls", cacheHits:"Cache hits", estCost:"Est. cost",
    fontPreview:"This is how your inbox messages will look at this font size.",
    contrastDesc:"High contrast increases text opacity for better readability in bright environments.",
    langDesc:"Changes all labels, buttons, and messages throughout the app.",
    saveSettings:"Save settings",
    autoSaved:"All settings are saved automatically to your browser.",
  },
  es: {
    inbox:"Bandeja", smartCapture:"Captura rápida", integrations:"Integraciones",
    usageCosts:"Uso y Costos", settings:"Configuración",
    priorityInbox:"Bandeja prioritaria", allMessages:"Todos", critical:"Críticos",
    complaints:"Reclamos", leads:"Leads", unread:"Sin leer",
    selectMessage:"Selecciona un mensaje", generateReply:"Generar respuesta",
    generating:"Generando...", aiDraft:"Borrador IA", reviewBefore:"Revisa antes de enviar",
    copy:"Copiar", approve:"Aprobar", copied:"Copiado ✓",
    from:"De", time:"Hora", message:"Mensaje", recommendedAction:"Acción recomendada",
    reason:"Razón", alerts:"Alertas", score:"Puntaje",
    captureTitle:"Captura rápida", captureSubtitle:"Pega cualquier email — BLIQK lo clasifica al instante.",
    sender:"Remitente", subject:"Asunto", messageBody:"Cuerpo del mensaje",
    pastePlaceholder:"Pega el contenido del email aquí...",
    classifyBtn:"Clasificar y guardar en Bandeja", classifying:"Clasificando...",
    bliqkResult:"Resultado BLIQK", actionLabel:"Acción:", reasonLabel:"Razón:",
    settingsTitle:"Configuración", settingsSubtitle:"Personaliza tu espacio de trabajo BLIQK.",
    themeLabel:"Tema", fontSizeLabel:"Tamaño de fuente", contrastLabel:"Contraste",
    languageLabel:"Idioma", standardContrast:"Estándar", highContrast:"Alto contraste",
    tourLabel:"Tour del producto", restartTour:"Reiniciar tour",
    restartTourSub:"Recorre las funciones principales de BLIQK de nuevo.",
    restart:"Reiniciar", saved:"Configuración guardada ✓",
    goodMorning:"Buenos días", criticalWaiting:"mensajes críticos esperando acción.",
    quickActions:"Acciones rápidas",
    msgs:"msgs", aiActive:"BLIQK AI está activo",
    aiActiveDesc:"Clasificador de reglas activo. Claude IA en espera para mensajes ambiguos.",
    connectBtn:"Conectar", cancel:"Cancelar", setupTip:"Tip de configuración:",
    encryptedNote:"Cifrado con AES-256-GCM. Nunca guardamos tu contraseña en texto plano.",
    connected:"Conectado", mockMode:"Modo Demo", mockImport:"Importar demo",
    imported:"Importado ✓", active:"Activo",
    usageTitle:"Uso y Costos", usageSubtitle:"Transparencia total sobre uso de IA y costos.",
    costBreakdown:"Desglose de costos — Este mes", totalMonth:"Total este mes",
    optimActive:"Optimización de costos activa",
    optimDetail:"Reglas primero (gratis) · Cache ahorra 203 llamadas IA · Solo 7% necesitó Claude",
    messages:"Mensajes", aiCalls:"Llamadas IA", cacheHits:"Cache hits", estCost:"Costo est.",
    fontPreview:"Así se verán los mensajes de tu bandeja con este tamaño de fuente.",
    contrastDesc:"Alto contraste aumenta la opacidad del texto para mejor legibilidad en ambientes luminosos.",
    langDesc:"Cambia todas las etiquetas, botones y mensajes en toda la aplicación.",
    saveSettings:"Guardar configuración",
    autoSaved:"Todos los ajustes se guardan automáticamente en tu navegador.",
  },
} as const;

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
interface SettingsCtx {
  theme: ThemeId;    setTheme:    (v: ThemeId)  => void;
  fontSize: FontSize; setFontSize: (v: FontSize) => void;
  contrast: Contrast; setContrast: (v: Contrast) => void;
  language: Language; setLanguage: (v: Language) => void;
  t:  Theme;
  fs: { base:number; sm:number; xs:number; label:string };
  s:  typeof STRINGS["en"];
}

const Ctx = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme,    setThemeS]    = useState<ThemeId>("midnight");
  const [fontSize, setFontSizeS] = useState<FontSize>("md");
  const [contrast, setContrastS] = useState<Contrast>("high");
  const [language, setLanguageS] = useState<Language>("en");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bliqk_settings");
      if (raw) {
        const p = JSON.parse(raw);
        if (p.theme)    setThemeS(p.theme);
        if (p.fontSize) setFontSizeS(p.fontSize);
        if (p.contrast) setContrastS(p.contrast);
        if (p.language) setLanguageS(p.language);
      }
    } catch {}
  }, []);

  const save = (patch: object) => {
    try {
      const prev = JSON.parse(localStorage.getItem("bliqk_settings") || "{}");
      localStorage.setItem("bliqk_settings", JSON.stringify({ ...prev, ...patch }));
    } catch {}
  };

  const setTheme    = (v: ThemeId)  => { setThemeS(v);    save({ theme: v }); };
  const setFontSize = (v: FontSize) => { setFontSizeS(v); save({ fontSize: v }); };
  const setContrast = (v: Contrast) => { setContrastS(v); save({ contrast: v }); };
  const setLanguage = (v: Language) => { setLanguageS(v); save({ language: v }); };

  return (
    <Ctx.Provider value={{
      theme, setTheme, fontSize, setFontSize,
      contrast, setContrast, language, setLanguage,
      t:  THEMES[theme],
      fs: FONT_SIZES[fontSize],
      s:  STRINGS[language],
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}
