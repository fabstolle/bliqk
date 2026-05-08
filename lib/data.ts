// lib/data.ts — centralized demo data

export const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=75",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=75",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=75",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=75",
];

export const SAMPLE_EMAILS = [
  {
    tag: "😤 Angry customer",
    text: "I have been waiting 3 weeks about invoice #4521. I paid $1,200 and the service was never delivered. If I don't receive a response TODAY I will escalate to my attorney and leave a Google review.",
    result: { label:"⚖️ Legal Risk", category:"legal_risk", priority:"CRITICAL", score:97, color:"#FF3D5A", action:"Respond within 2 hours. Escalate to management.", reason:"Explicit legal threat + review threat + third contact.", alerts:["Legal threat","Review threat","3rd contact"] }
  },
  {
    tag: "🔥 Hot lead",
    text: "Hi! We have a team of 15 and handle ~300 customer emails per day. We're very interested. Can you send pricing? We need to decide this week.",
    result: { label:"🔥 Hot Lead", category:"hot_lead", priority:"HIGH", score:91, color:"#FF7A2F", action:"Call today. Send pricing. Decision this week — act now.", reason:"Explicit purchase intent + team size + declared deadline.", alerts:["Decision deadline","High purchase intent"] }
  },
  {
    tag: "💬 Warm inquiry",
    text: "Hello, I saw your ad on Instagram and wanted to learn more about what your service does. Is there a free trial available?",
    result: { label:"⚡ Warm Lead", category:"warm_lead", priority:"MEDIUM", score:54, color:"#00B0FF", action:"Reply with overview + free trial offer. No hard pitch yet.", reason:"Early stage. Genuine interest, low urgency.", alerts:[] }
  },
];

export const INBOX_MESSAGES = [
  { id:1, from:"Pedro Sánchez", co:"Construye+",   sub:"URGENT: Invoice #4521 — calling my lawyer today",  priority:"critical", category:"legal_risk",  score:97, time:"18m",  unread:true,  alerts:["Legal threat","Review threat"], action:"Respond within 2 hours. Escalate to management." },
  { id:2, from:"Valentina Cruz",  co:"Moda VT",    sub:"Annual plan discount? + referrals",                  priority:"high",     category:"hot_lead",    score:88, time:"1h",   unread:true,  alerts:["Upsell","3 referrals"],         action:"Call today. Offer 20% annual discount." },
  { id:3, from:"Rodrigo Paz",     co:"TechSol",    sub:"Critical error — lost data before investor demo",    priority:"critical", category:"complaint",    score:92, time:"2h",   unread:true,  alerts:["Data loss","Investor meeting"],  action:"Immediate support. Recover data." },
  { id:4, from:"Camila Rojas",    co:"StartupIO",  sub:"Question about Salesforce integration",              priority:"medium",   category:"warm_lead",   score:65, time:"3h",   unread:false, alerts:[],                               action:"Reply with roadmap. Schedule demo." },
  { id:5, from:"Marco Ibáñez",    co:"Retail PE",  sub:"Re: Proposal — still waiting for response",         priority:"high",     category:"hot_lead",    score:79, time:"5h",   unread:false, alerts:["Decision deadline"],             action:"Send proposal today. Deadline this week." },
  { id:6, from:"Ana Flores",      co:"Boutique MX",sub:"Charged twice this month — need refund now",        priority:"high",     category:"complaint",    score:81, time:"6h",   unread:true,  alerts:["Billing error","Refund request"],action:"Verify billing. Issue refund if confirmed." },
  { id:7, from:"Carlos Mendez",   co:"Agency CO",  sub:"Interested in white-label / reseller program",      priority:"high",     category:"hot_lead",    score:94, time:"Yest", unread:false, alerts:["Agency deal"],                  action:"Schedule call ASAP. High-value opportunity." },
];

export const PRIORITY_COLOR: Record<string,string> = {
  critical:"#FF3D5A", high:"#FF7A2F", medium:"#00B0FF", low:"#00D68F"
};
export const CATEGORY_COLOR: Record<string,string> = {
  legal_risk:"#FF3D5A", complaint:"#FF7A2F", hot_lead:"#00D68F", warm_lead:"#00B0FF", normal:"#6B7394"
};
export const CATEGORY_LABEL: Record<string,string> = {
  legal_risk:"⚖️ Legal Risk", complaint:"😤 Complaint", hot_lead:"🔥 Hot Lead", warm_lead:"⚡ Warm Lead", normal:"📨 Normal"
};

export const IMAP_PROVIDERS = [
  { id:"gmail",   name:"Gmail",             icon:"📧", color:"#EA4335", host:"imap.gmail.com",           port:"993", rec:true,  tip:"Enable IMAP in Gmail Settings → See all settings → Forwarding and POP/IMAP" },
  { id:"outlook", name:"Outlook / M365",    icon:"📮", color:"#0078D4", host:"outlook.office365.com",    port:"993", rec:false, tip:"Go to Outlook Settings → Mail → Sync email → IMAP" },
  { id:"yahoo",   name:"Yahoo Mail",        icon:"💜", color:"#6001D2", host:"imap.mail.yahoo.com",      port:"993", rec:false, tip:"Enable IMAP in Yahoo Security settings → Allow apps that use less secure sign-in" },
  { id:"icloud",  name:"iCloud Mail",       icon:"☁️", color:"#3478F6", host:"imap.mail.me.com",         port:"993", rec:false, tip:"Generate an App-Specific Password at appleid.apple.com → Sign-In & Security" },
  { id:"custom",  name:"Any IMAP inbox",    icon:"🔧", color:"#607D8B", host:"",                         port:"993", rec:false, tip:"Contact your email provider for IMAP server settings" },
];
