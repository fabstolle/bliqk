"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId  = "midnight" | "dawn" | "forest" | "paper" | "obsidian";
export type FontSize = "xs" | "sm" | "md" | "lg" | "xl";
export type Contrast = "standard" | "high";
export type Language = "en" | "es";

export interface Theme {
  id: ThemeId; name: string; nameEs: string; tag: string; tagEs: string;
  bg: string; surface: string; card: string; border: string;
  textPrimary: string; textBody: string; textSecondary: string; textTertiary: string;
  accent: string; accentBg: string; accentBorder: string;
  danger: string; warning: string; success: string; purple: string;
  navActive: string; inputBg: string; inputBorder: string;
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

export const FONT_SIZES: Record<FontSize, { base:number; sm:number; xs:number; label:string }> = {
  xs: { base:11, sm:9,  xs:8,  label:"XS · 11px" },
  sm: { base:12, sm:10, xs:9,  label:"S · 12px"  },
  md: { base:14, sm:11, xs:10, label:"M · 14px"  },
  lg: { base:16, sm:13, xs:11, label:"L · 16px"  },
  xl: { base:19, sm:15, xs:13, label:"XL · 19px" },
};

export type StringsType = {
  tagline: string; liveDemo: string; heroLine1: string; heroLine2: string; heroSub: string;
  sampleAngry: string; sampleHot: string; sampleWarm: string;
  customerMsg: string; incoming: string;
  analyzeBtn: string; analyzeAgain: string; analyzing: string; scanningSignals: string;
  scanning: string[];
  orPaste: string; pasteHint: string; analyzeOwn: string;
  wowLine: string; iWantThis: string; iWantInbox: string;
  recommAction: string; flagsDetected: string; noFlags: string;
  step1: string; step2: string; step3: string; step4: string;
  problemTitle: string; problemSub: string;
  p1Title: string; p1Sub: string; p1Stat: string; p1Label: string;
  p2Title: string; p2Sub: string; p2Stat: string; p2Label: string;
  p3Title: string; p3Sub: string; p3Stat: string; p3Label: string;
  bliqkFix: string; bliqkFixDesc: string; setupBtn: string;
  connectTitle: string; connectItalic: string; connectSub: string;
  mostPopular: string; connectionDetails: string;
  emailAddress: string; appPassword: string; setupTipLabel: string;
  connectBtn: string; skipBtn: string;
  doneTitle: string; doneItalic: string; doneSub: string; whatNext: string;
  n1Title: string; n1Desc: string; n1Time: string;
  n2Title: string; n2Desc: string; n2Time: string;
  n3Title: string; n3Desc: string; n3Time: string;
  n4Title: string; n4Desc: string; n4Time: string;
  openInbox: string; freeNote: string;
  welcomeBack: string; emailField: string; passwordField: string;
  signingIn: string; signIn: string; demoHint: string; backToDemo: string;
  themeLabel: string;
  inbox: string; capture: string; integrations: string; usage: string; settings: string;
  seeWhat: string; criticalAlert: string;
  priorityInbox: string; all: string; critical: string; issues: string; leads: string; unread: string;
  selectMsg: string; bliqkShows: string;
  genReply: string; generating: string; aiDraft: string; reviewBefore: string;
  copy: string; approve: string; copied: string;
  fromLabel: string; timeLabel: string; bliqkAnalysis: string;
  recActionLabel: string; reasonLabel: string; alertsLabel: string;
  msgs: string; goodMorning: string; criticalWaiting: string; quickActions: string;
  aiActive: string; aiActiveDesc: string;
  capturePageTitle: string; capturePageSub: string;
  senderLabel: string; subjectLabel: string; bodyLabel: string; pasteCap: string;
  classifyBtn: string; classifying: string; bliqkResult: string;
  actionLabel: string; reasonResultLabel: string;
  intTitle: string; intSub: string; aiOnAll: string; aiOnAllSub: string;
  connected: string; mockMode: string; connectProvider: string;
  mockImport: string; imported: string; active: string;
  imapCreds: string; cancel: string; encNote: string;
  usageTitle: string; usageSub: string;
  messages: string; aiCalls: string; cacheHits: string; estCost: string;
  costBreakdown: string; totalMonth: string; optimActive: string; optimDetail: string;
  settingsTitle: string; settingsSub: string;
  themeSection: string; fontSection: string; contrastSection: string; langSection: string;
  standardContrast: string; highContrast: string;
  fontPreview: string; langDesc: string; contrastDesc: string;
  saveSettings: string; saved: string; autoSaved: string;
};

const EN: StringsType = {
  tagline:"See what needs action now.",
  liveDemo:"Live demo — no account needed",
  heroLine1:"Your inbox knows",
  heroLine2:"exactly what to do next.",
  heroSub:"Pick an email below. BLIQK reads it, scores it, and tells you the right action — in under 3 seconds.",
  sampleAngry:"😤 Angry customer", sampleHot:"🔥 Hot lead", sampleWarm:"💬 Warm inquiry",
  customerMsg:"Customer message", incoming:"Incoming · Just now",
  analyzeBtn:"⚡ Analyze this email →", analyzeAgain:"⚡ Analyze again →",
  analyzing:"BLIQK is reading this email...", scanningSignals:"Scanning signals...",
  scanning:["Reading urgency","Detecting intent","Scoring priority","Generating action"],
  orPaste:"— or paste your own email —",
  pasteHint:"Paste any real customer email here and see what BLIQK does...",
  analyzeOwn:"⚡ Analyze my email →",
  wowLine:"BLIQK did this in 2 seconds. Imagine this for every email in your inbox, automatically, every day.",
  iWantThis:"I want this for my business →",
  iWantInbox:"I want this for my inbox →",
  recommAction:"Recommended action", flagsDetected:"Flags detected", noFlags:"✓ No critical flags",
  step1:"See it live", step2:"Why it matters", step3:"Connect inbox", step4:"You're ready",
  problemTitle:"How many of these live in your inbox right now?",
  problemSub:"Most business owners check email 20+ times a day and still miss the messages that actually matter.",
  p1Title:"The ignored complaint", p1Sub:"You opened it, felt anxious, closed it. Now it's 3 days old.", p1Stat:"68%", p1Label:"of legal disputes start from ignored emails",
  p2Title:"The lost hot lead",     p2Sub:"Someone ready to buy — you replied 2 days later. They went with a competitor.", p2Stat:"78%", p2Label:"of customers buy from whoever responds first",
  p3Title:"The daily time drain",  p3Sub:"Reading 50 emails to find the 3 that matter. Every. Single. Day.", p3Stat:"2.5h", p3Label:"wasted daily on email triage on average",
  bliqkFix:"BLIQK reads every email for you.",
  bliqkFixDesc:"Automatically sorted by urgency, intent, and risk. Legal threats surface in seconds. Hot leads never go cold.",
  setupBtn:"Set up my BLIQK inbox →",
  connectTitle:"Connect your inbox", connectItalic:"in 60 seconds.",
  connectSub:"Pick your email provider and BLIQK starts classifying automatically.",
  mostPopular:"Most popular", connectionDetails:"Connection details",
  emailAddress:"Email address", appPassword:"App Password", setupTipLabel:"Setup tip:",
  connectBtn:"Connect & import emails →", skipBtn:"Skip — use Smart Capture for now",
  doneTitle:"You're all set.", doneItalic:"Welcome to BLIQK.",
  doneSub:"BLIQK is now watching your inbox. You'll never miss a critical message again.",
  whatNext:"What happens next",
  n1Title:"Right now",     n1Desc:"BLIQK imports your last 20 emails and classifies them automatically.", n1Time:"0 min",
  n2Title:"First hour",    n2Desc:"BLIQK learns your email patterns. Classifications improve over time.",  n2Time:"~60 min",
  n3Title:"Set up alerts", n3Desc:"Connect WhatsApp to get notified instantly when a critical email arrives.", n3Time:"2 min",
  n4Title:"Invite team",   n4Desc:"Add team members so everyone sees the same priority inbox.", n4Time:"Optional",
  openInbox:"⚡ Open my BLIQK inbox →", freeNote:"14 days free · No credit card required",
  welcomeBack:"Welcome back — sign in to your workspace",
  emailField:"Email address", passwordField:"Password",
  signingIn:"Signing in...", signIn:"Sign in",
  demoHint:"Demo: founder@bliqk.ai / demo1234", backToDemo:"← Back to demo",
  themeLabel:"Theme",
  inbox:"Inbox", capture:"Smart Capture", integrations:"Integrations", usage:"Usage & Costs", settings:"Settings",
  seeWhat:"SEE WHAT NEEDS ACTION", criticalAlert:"Requires immediate action",
  priorityInbox:"Priority Inbox", all:"All", critical:"Critical", issues:"Issues", leads:"Leads", unread:"Unread",
  selectMsg:"Select a message", bliqkShows:"BLIQK shows you what needs action first",
  genReply:"✍️ Generate reply", generating:"⟳ Generating...",
  aiDraft:"AI Draft Reply", reviewBefore:"Review before sending",
  copy:"📋 Copy", approve:"✅ Approve", copied:"Copied ✓",
  fromLabel:"From", timeLabel:"Time", bliqkAnalysis:"⚡ BLIQK Analysis",
  recActionLabel:"Recommended Action", reasonLabel:"Reason", alertsLabel:"Flags",
  msgs:"msgs", goodMorning:"Good morning", criticalWaiting:"critical messages waiting for action.",
  quickActions:"Quick actions", aiActive:"BLIQK AI is active",
  aiActiveDesc:"Rule classifier running. Claude AI on standby for ambiguous messages.",
  capturePageTitle:"Smart Capture", capturePageSub:"Paste any email — BLIQK classifies it instantly.",
  senderLabel:"Sender", subjectLabel:"Subject", bodyLabel:"Message Body",
  pasteCap:"Paste the email content here...",
  classifyBtn:"⚡ Classify & Save to Inbox", classifying:"⟳ Classifying...",
  bliqkResult:"⚡ BLIQK Result", actionLabel:"Action:", reasonResultLabel:"Reason:",
  intTitle:"Integrations", intSub:"Connect your email inboxes. BLIQK classifies everything automatically.",
  aiOnAll:"AI classification on all sources", aiOnAllSub:"Rule classifier runs first (free). Claude AI only for ambiguous messages.",
  connected:"Connected", mockMode:"Mock Mode", connectProvider:"🔗 Connect",
  mockImport:"▶ Mock Import", imported:"✅ Imported", active:"✓ Active",
  imapCreds:"Enter your IMAP credentials", cancel:"Cancel",
  encNote:"Encrypted with AES-256-GCM. We never store your password in plain text.",
  usageTitle:"Usage & Costs", usageSub:"Full transparency on AI usage and costs.",
  messages:"Messages", aiCalls:"AI calls", cacheHits:"Cache hits", estCost:"Est. cost",
  costBreakdown:"Cost Breakdown — This Month", totalMonth:"Total this month",
  optimActive:"Cost optimization active", optimDetail:"Rules first (free) · Cache saves 203 AI calls · Only 7% needed Claude",
  settingsTitle:"Settings", settingsSub:"Customize your BLIQK workspace.",
  themeSection:"Theme", fontSection:"Font size", contrastSection:"Contrast", langSection:"Language",
  standardContrast:"Standard", highContrast:"⚡ High contrast",
  fontPreview:"This is how your messages will look at this font size.",
  langDesc:"Changes all labels and messages throughout the app.",
  contrastDesc:"High contrast increases text visibility for bright environments.",
  saveSettings:"💾 Save settings", saved:"✅ Settings saved",
  autoSaved:"Settings are saved automatically to your browser.",
};

const ES: StringsType = {
  tagline:"Ve lo que necesita acción ahora.",
  liveDemo:"Demo en vivo — sin cuenta necesaria",
  heroLine1:"Tu bandeja sabe",
  heroLine2:"exactamente qué hacer ahora.",
  heroSub:"Elige un email abajo. BLIQK lo lee, lo puntúa y te dice la acción correcta en menos de 3 segundos.",
  sampleAngry:"😤 Cliente enojado", sampleHot:"🔥 Lead caliente", sampleWarm:"💬 Consulta tibia",
  customerMsg:"Mensaje del cliente", incoming:"Entrante · Ahora",
  analyzeBtn:"⚡ Analizar este email →", analyzeAgain:"⚡ Analizar de nuevo →",
  analyzing:"BLIQK está leyendo este email...", scanningSignals:"Escaneando señales...",
  scanning:["Leyendo urgencia","Detectando intención","Calculando prioridad","Generando acción"],
  orPaste:"— o pega tu propio email —",
  pasteHint:"Pega cualquier email real aquí y ve lo que hace BLIQK...",
  analyzeOwn:"⚡ Analizar mi email →",
  wowLine:"BLIQK hizo esto en 2 segundos. Imagina esto para cada email de tu bandeja, automáticamente, todos los días.",
  iWantThis:"Quiero esto para mi negocio →",
  iWantInbox:"Quiero esto para mi bandeja →",
  recommAction:"Acción recomendada", flagsDetected:"Alertas detectadas", noFlags:"✓ Sin alertas críticas",
  step1:"Vélo en vivo", step2:"Por qué importa", step3:"Conecta tu bandeja", step4:"¡Listo!",
  problemTitle:"¿Cuántos de estos viven en tu bandeja ahora mismo?",
  problemSub:"La mayoría de los dueños de negocio revisan el email 20+ veces al día y aún pierden los mensajes que realmente importan.",
  p1Title:"El reclamo ignorado",        p1Sub:"Lo abriste, te dio ansiedad, lo cerraste. Ahora tiene 3 días y escala.", p1Stat:"68%", p1Label:"de disputas legales comienzan por emails ignorados",
  p2Title:"El lead caliente perdido",    p2Sub:"Alguien listo para comprar — respondiste 2 días después. Se fue con la competencia.", p2Stat:"78%", p2Label:"de clientes compran al que responde primero",
  p3Title:"El drenaje de tiempo diario", p3Sub:"Leer 50 emails para encontrar los 3 que importan. Todos. Los. Días.", p3Stat:"2.5h", p3Label:"desperdiciadas diariamente en clasificar emails",
  bliqkFix:"BLIQK lee cada email por ti.",
  bliqkFixDesc:"Ordenado automáticamente por urgencia, intención y riesgo. Las amenazas legales aparecen en segundos. Los leads calientes nunca se enfrían.",
  setupBtn:"Configurar mi bandeja BLIQK →",
  connectTitle:"Conecta tu bandeja", connectItalic:"en 60 segundos.",
  connectSub:"Elige tu proveedor de email y BLIQK empieza a clasificar automáticamente.",
  mostPopular:"Más popular", connectionDetails:"Detalles de conexión",
  emailAddress:"Correo electrónico", appPassword:"Contraseña / App Password", setupTipLabel:"Tip de configuración:",
  connectBtn:"Conectar e importar emails →", skipBtn:"Omitir — usar Smart Capture por ahora",
  doneTitle:"Todo listo.", doneItalic:"Bienvenido a BLIQK.",
  doneSub:"BLIQK ahora vigila tu bandeja. Nunca más perderás un mensaje crítico.",
  whatNext:"Qué pasa ahora",
  n1Title:"Ahora mismo",      n1Desc:"BLIQK importa tus últimos 20 emails y los clasifica automáticamente.", n1Time:"0 min",
  n2Title:"Primera hora",     n2Desc:"BLIQK aprende tus patrones de email. Las clasificaciones mejoran con el tiempo.", n2Time:"~60 min",
  n3Title:"Configura alertas", n3Desc:"Conecta WhatsApp para recibir notificaciones cuando llegue un email crítico.", n3Time:"2 min",
  n4Title:"Invita tu equipo",  n4Desc:"Agrega miembros para que todos vean la misma bandeja prioritaria.", n4Time:"Opcional",
  openInbox:"⚡ Abrir mi bandeja BLIQK →", freeNote:"14 días gratis · Sin tarjeta de crédito",
  welcomeBack:"Bienvenido de vuelta — ingresa a tu espacio",
  emailField:"Correo electrónico", passwordField:"Contraseña",
  signingIn:"Ingresando...", signIn:"Ingresar",
  demoHint:"Demo: founder@bliqk.ai / demo1234", backToDemo:"← Volver al demo",
  themeLabel:"Tema",
  inbox:"Bandeja", capture:"Captura rápida", integrations:"Integraciones", usage:"Uso y Costos", settings:"Configuración",
  seeWhat:"VE LO QUE NECESITA ACCIÓN", criticalAlert:"Requiere acción inmediata",
  priorityInbox:"Bandeja prioritaria", all:"Todos", critical:"Críticos", issues:"Reclamos", leads:"Leads", unread:"Sin leer",
  selectMsg:"Selecciona un mensaje", bliqkShows:"BLIQK muestra lo que necesita acción primero",
  genReply:"✍️ Generar respuesta", generating:"⟳ Generando...",
  aiDraft:"Borrador IA", reviewBefore:"Revisa antes de enviar",
  copy:"📋 Copiar", approve:"✅ Aprobar", copied:"Copiado ✓",
  fromLabel:"De", timeLabel:"Hora", bliqkAnalysis:"⚡ Análisis BLIQK",
  recActionLabel:"Acción recomendada", reasonLabel:"Razón", alertsLabel:"Alertas",
  msgs:"msgs", goodMorning:"Buenos días", criticalWaiting:"mensajes críticos esperando acción.",
  quickActions:"Acciones rápidas", aiActive:"BLIQK AI está activo",
  aiActiveDesc:"Clasificador de reglas activo. Claude IA en espera para mensajes ambiguos.",
  capturePageTitle:"Captura rápida", capturePageSub:"Pega cualquier email — BLIQK lo clasifica al instante.",
  senderLabel:"Remitente", subjectLabel:"Asunto", bodyLabel:"Cuerpo del mensaje",
  pasteCap:"Pega el contenido del email aquí...",
  classifyBtn:"⚡ Clasificar y guardar en Bandeja", classifying:"⟳ Clasificando...",
  bliqkResult:"⚡ Resultado BLIQK", actionLabel:"Acción:", reasonResultLabel:"Razón:",
  intTitle:"Integraciones", intSub:"Conecta tus bandejas de email. BLIQK clasifica todo automáticamente.",
  aiOnAll:"Clasificación IA en todas las fuentes", aiOnAllSub:"Reglas primero (gratis). Claude IA solo para mensajes ambiguos.",
  connected:"Conectado", mockMode:"Modo Demo", connectProvider:"🔗 Conectar",
  mockImport:"▶ Importar demo", imported:"✅ Importado", active:"✓ Activo",
  imapCreds:"Ingresa tus credenciales IMAP", cancel:"Cancelar",
  encNote:"Cifrado con AES-256-GCM. Nunca guardamos tu contraseña en texto plano.",
  usageTitle:"Uso y Costos", usageSub:"Transparencia total sobre uso de IA y costos.",
  messages:"Mensajes", aiCalls:"Llamadas IA", cacheHits:"Cache hits", estCost:"Costo est.",
  costBreakdown:"Desglose de costos — Este mes", totalMonth:"Total este mes",
  optimActive:"Optimización de costos activa", optimDetail:"Reglas primero (gratis) · Cache ahorra 203 llamadas · Solo 7% necesitó Claude",
  settingsTitle:"Configuración", settingsSub:"Personaliza tu espacio de trabajo BLIQK.",
  themeSection:"Tema", fontSection:"Tamaño de fuente", contrastSection:"Contraste", langSection:"Idioma",
  standardContrast:"Estándar", highContrast:"⚡ Alto contraste",
  fontPreview:"Así se verán tus mensajes con este tamaño de fuente.",
  langDesc:"Cambia todas las etiquetas y mensajes en toda la aplicación.",
  contrastDesc:"Alto contraste aumenta la visibilidad del texto en ambientes luminosos.",
  saveSettings:"💾 Guardar configuración", saved:"✅ Configuración guardada",
  autoSaved:"La configuración se guarda automáticamente en tu navegador.",
};

const STRINGS: Record<Language, StringsType> = { en: EN, es: ES };

interface SettingsCtx {
  theme: ThemeId; setTheme: (v: ThemeId) => void;
  fontSize: FontSize; setFontSize: (v: FontSize) => void;
  contrast: Contrast; setContrast: (v: Contrast) => void;
  language: Language; setLanguage: (v: Language) => void;
  t: Theme;
  fs: { base:number; sm:number; xs:number; label:string };
  s: StringsType;
}

const Ctx = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme,    setT] = useState<ThemeId>("midnight");
  const [fontSize, setF] = useState<FontSize>("md");
  const [contrast, setC] = useState<Contrast>("high");
  const [language, setL] = useState<Language>("en");

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("bliqk_v4") || "{}");
      if (p.theme)    setT(p.theme);
      if (p.fontSize) setF(p.fontSize);
      if (p.contrast) setC(p.contrast);
      if (p.language) setL(p.language);
    } catch {}
  }, []);

  const save = (patch: object) => {
    try {
      const prev = JSON.parse(localStorage.getItem("bliqk_v4") || "{}");
      localStorage.setItem("bliqk_v4", JSON.stringify({ ...prev, ...patch }));
    } catch {}
  };

  const setTheme    = (v: ThemeId)  => { setT(v); save({ theme: v }); };
  const setFontSize = (v: FontSize) => { setF(v); save({ fontSize: v }); };
  const setContrast = (v: Contrast) => { setC(v); save({ contrast: v }); };
  const setLanguage = (v: Language) => { setL(v); save({ language: v }); };

  const value: SettingsCtx = {
    theme, setTheme, fontSize, setFontSize,
    contrast, setContrast, language, setLanguage,
    t: THEMES[theme],
    fs: FONT_SIZES[fontSize],
    s: STRINGS[language],
  };

  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}
