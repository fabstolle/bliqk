import { NextRequest, NextResponse } from "next/server";

function rules(subject: string, body: string) {
  const t = `${subject} ${body}`.toLowerCase();
  if (["lawyer","attorney","lawsuit","sue","legal","abogado","demanda"].some(k=>t.includes(k)))
    return { category:"legal_risk", priority:"critical", score:90, confidence:92, color:"#FF3D5A", alerts:["Legal threat"], recommendedAction:"Respond within 2 hours. Escalate to management.", reason:"Legal language detected." };
  if (["refund","reembolso","complaint","queja","error","problem","not working","terrible"].filter(k=>t.includes(k)).length>=2)
    return { category:"complaint", priority:"high", score:70, confidence:82, color:"#FF7A2F", alerts:["Complaint signals"], recommendedAction:"Respond with empathy and a concrete solution.", reason:"Multiple complaint keywords." };
  if (["price","pricing","how much","buy","purchase","demo","interested","quote","cotización"].filter(k=>t.includes(k)).length>=2)
    return { category:"hot_lead", priority:"high", score:80, confidence:85, color:"#00D68F", alerts:["Purchase intent"], recommendedAction:"Contact within 2 hours. Send proposal.", reason:"Strong purchase intent signals." };
  if (["information","question","wondering","curious","evaluate","evaluar"].some(k=>t.includes(k)))
    return { category:"warm_lead", priority:"medium", score:55, confidence:78, color:"#00B0FF", alerts:[], recommendedAction:"Reply with overview. Ask qualifying questions.", reason:"Inquiry without strong purchase signals." };
  return { category:"normal", priority:"low", score:20, confidence:75, color:"#6B7394", alerts:[], recommendedAction:"Review when available.", reason:"No critical signals detected." };
}

async function ai(subject: string, body: string) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.AI_PROVIDER==="none") return null;
  try {
    const { default: A } = await import("@anthropic-ai/sdk");
    const c = new A({ apiKey: process.env.ANTHROPIC_API_KEY });
    const r = await c.messages.create({ model: process.env.AI_MODEL||"claude-sonnet-4-20250514", max_tokens:400, system:"Respond with valid JSON only. No markdown.", messages:[{ role:"user", content:`Classify this email: {"category":"legal_risk|complaint|hot_lead|warm_lead|normal","priority":"critical|high|medium|low","score":0-100,"confidence":0-100,"color":"#hex","alerts":["string"],"recommendedAction":"string","reason":"string"}\nSubject:${subject}\nBody:${body.slice(0,1200)}` }] });
    const txt = r.content[0]?.type==="text" ? r.content[0].text : "{}";
    return { ...JSON.parse(txt.replace(/```json|```/g,"").trim()), aiUsed:true };
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  try {
    const { subject="", bodyText="", forceAI } = await req.json();
    if (!bodyText.trim()) return NextResponse.json({ error:"bodyText required" },{ status:400 });
    const ruleResult = rules(subject, bodyText);
    const threshold  = parseInt(process.env.AI_CONFIDENCE_THRESHOLD||"70");
    let classification = ruleResult;
    if (forceAI || ruleResult.confidence < threshold) {
      const aiResult = await ai(subject, bodyText);
      if (aiResult) classification = aiResult;
    }
    return NextResponse.json({ classification });
  } catch { return NextResponse.json({ error:"Server error" },{ status:500 }); }
}
