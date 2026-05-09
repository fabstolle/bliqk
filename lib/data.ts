export const NATURE_IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=75";

export const SAMPLE_EMAILS = [
  {
    en:"😤 Angry customer", es:"😤 Cliente enojado",
    text:"I have been waiting 3 weeks about invoice #4521. I paid $1,200 and the service was never delivered. If I don't receive a response TODAY I will escalate to my attorney and leave a Google review.",
    result:{ label:"⚖️ Legal Risk", priority:"CRITICAL", score:97, color:"#FF3D5A",
      action_en:"Respond within 2 hours. Escalate to management.", action_es:"Responder en 2 horas. Escalar a gerencia.",
      reason_en:"Explicit legal threat + review threat + third contact.", reason_es:"Amenaza legal + amenaza de reseña + 3er contacto.",
      alerts_en:["Legal threat","Review threat"], alerts_es:["Amenaza legal","Amenaza de reseña"] }
  },
  {
    en:"🔥 Hot lead", es:"🔥 Lead caliente",
    text:"Hi! We have a team of 15 and handle ~300 customer emails per day. We're very interested in your solution. Can you send pricing? We need to decide this week.",
    result:{ label:"🔥 Hot Lead", priority:"HIGH", score:91, color:"#FF7A2F",
      action_en:"Call today. Send pricing. Decision this week.", action_es:"Llamar hoy. Enviar precios. Decisión esta semana.",
      reason_en:"Purchase intent + team size + declared deadline.", reason_es:"Intención de compra + tamaño equipo + plazo declarado.",
      alerts_en:["Decision deadline","High intent"], alerts_es:["Plazo de decisión","Alta intención"] }
  },
  {
    en:"💬 Warm inquiry", es:"💬 Consulta tibia",
    text:"Hello, I saw your ad on Instagram and wanted to learn more about what your service does. Is there a free trial?",
    result:{ label:"⚡ Warm Lead", priority:"MEDIUM", score:54, color:"#00B0FF",
      action_en:"Reply with overview + free trial offer.", action_es:"Responder con resumen + prueba gratis.",
      reason_en:"Early stage. Genuine interest, low urgency.", reason_es:"Etapa inicial. Interés genuino, baja urgencia.",
      alerts_en:[], alerts_es:[] }
  },
];

export const INBOX_MSGS = [
  { id:1, from:"Pedro Sánchez",  co:"Construye+",  sub:"URGENT: Invoice #4521 — calling my lawyer today", priority:"critical", cat:"legal_risk", score:97, time:"18m", unread:true,  alerts:["Legal threat","Review threat"], action:"Respond within 2 hours. Escalate to management." },
  { id:2, from:"Valentina Cruz", co:"Moda VT",     sub:"Annual plan discount? + referrals",                priority:"high",     cat:"hot_lead",   score:88, time:"1h",  unread:true,  alerts:["Upsell","3 referrals"],         action:"Call today. Offer 20% annual discount." },
  { id:3, from:"Rodrigo Paz",    co:"TechSol",     sub:"Critical error — lost data before investor demo",  priority:"critical", cat:"complaint",   score:92, time:"2h",  unread:true,  alerts:["Data loss","Investor meeting"],  action:"Immediate support. Recover data." },
  { id:4, from:"Camila Rojas",   co:"StartupIO",   sub:"Question about Salesforce integration",            priority:"medium",   cat:"warm_lead",   score:65, time:"3h",  unread:false, alerts:[],                               action:"Reply with roadmap. Schedule demo." },
  { id:5, from:"Marco Ibáñez",   co:"Retail PE",   sub:"Re: Proposal — still waiting",                     priority:"high",     cat:"hot_lead",    score:79, time:"5h",  unread:false, alerts:["Decision deadline"],             action:"Send proposal today. Deadline this week." },
  { id:6, from:"Ana Flores",     co:"Boutique MX", sub:"Charged twice — need refund now",                  priority:"high",     cat:"complaint",   score:81, time:"6h",  unread:true,  alerts:["Billing error","Refund"],         action:"Verify billing. Issue refund if confirmed." },
  { id:7, from:"Carlos Mendez",  co:"Agency CO",   sub:"Interested in white-label reseller program",       priority:"high",     cat:"hot_lead",    score:94, time:"Yest",unread:false, alerts:["Agency deal"],                  action:"Schedule call ASAP. High-value deal." },
];

export const PC: Record<string,string> = { critical:"#FF3D5A", high:"#FF7A2F", medium:"#00B0FF", low:"#00D68F" };
export const CC: Record<string,string> = { legal_risk:"#FF3D5A", complaint:"#FF7A2F", hot_lead:"#00D68F", warm_lead:"#00B0FF", normal:"#6B7394" };
export const CL_EN: Record<string,string> = { legal_risk:"⚖️ Legal Risk", complaint:"😤 Complaint", hot_lead:"🔥 Hot Lead", warm_lead:"⚡ Warm Lead", normal:"📨 Normal" };
export const CL_ES: Record<string,string> = { legal_risk:"⚖️ Riesgo Legal", complaint:"😤 Reclamo", hot_lead:"🔥 Lead Caliente", warm_lead:"⚡ Lead Tibio", normal:"📨 Normal" };

export const PROVIDERS = [
  { id:"gmail",   name:"Gmail",          icon:"📧", color:"#EA4335", host:"imap.gmail.com",        port:"993", rec:true,  tip_en:"Enable IMAP in Gmail → Settings → See all settings → Forwarding and POP/IMAP", tip_es:"Activa IMAP en Gmail → Configuración → Reenvío y POP/IMAP" },
  { id:"outlook", name:"Outlook / M365", icon:"📮", color:"#0078D4", host:"outlook.office365.com", port:"993", rec:false, tip_en:"Outlook Settings → Mail → Sync email → IMAP", tip_es:"Outlook → Correo → Sincronizar correo → IMAP" },
  { id:"yahoo",   name:"Yahoo Mail",     icon:"💜", color:"#6001D2", host:"imap.mail.yahoo.com",   port:"993", rec:false, tip_en:"Yahoo Security settings → Allow apps with less secure sign-in", tip_es:"Seguridad de Yahoo → Permitir apps con menos seguridad" },
  { id:"icloud",  name:"iCloud Mail",    icon:"☁️", color:"#3478F6", host:"imap.mail.me.com",      port:"993", rec:false, tip_en:"Generate App-Specific Password at appleid.apple.com → Security", tip_es:"Genera contraseña específica en appleid.apple.com → Seguridad" },
  { id:"custom",  name:"Custom IMAP",    icon:"🔧", color:"#607D8B", host:"",                      port:"993", rec:false, tip_en:"Contact your email provider for IMAP server settings", tip_es:"Consulta a tu proveedor de email los datos del servidor IMAP" },
];
