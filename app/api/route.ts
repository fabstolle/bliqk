import { NextRequest, NextResponse } from "next/server";

function ruleClassify(subject: string, body: string) {
  const t = `${subject} ${body}`.toLowerCase();
  let category="normal",priority="low",score=20,confidence=75,color="#6B7394";
  const alerts:string[]=[],action="Review when available.",reason="No critical signals detected.";

  if(["lawyer","attorney","lawsuit","sue","legal","abogado","demanda"].some(k=>t.includes(k))){
    return{category:"legal_risk",priority:"critical",score:90,confidence:92,color:"#FF3D5A",alerts:["Legal threat"],recommendedAction:"Respond within 2 hours. Escalate to management.",reason:"Legal language detected."};
  }
  if(["refund","reembolso","complaint","queja","reclamo","error","problem","terrible","not working"].filter(k=>t.includes(k)).length>=2){
    return{category:"complaint",priority:"high",score:70,confidence:82,color:"#FF7A2F",alerts:["Complaint"],recommendedAction:"Respond with empathy and a concrete solution.",reason:"Multiple complaint signals."};
  }
  if(["price","pricing","how much","buy","purchase","demo","interested","quote","cotización"].filter(k=>t.includes(k)).length>=2){
    return{category:"hot_lead",priority:"high",score:80,confidence:85,color:"#00D68F",alerts:["Purchase intent"],recommendedAction:"Contact within 2 hours. Send proposal.",reason:"Strong purchase intent."};
  }
  if(["information","question","wondering","curious","evaluate"].some(k=>t.includes(k))){
    return{category:"warm_lead",priority:"medium",score:55,confidence:78,color:"#00B0FF",alerts:[],recommendedAction:"Reply with overview. Ask qualifying questions.",reason:"Inquiry, low urgency."};
  }
  if(["urgent","asap","today","immediately","critical"].some(k=>t.includes(k))){
    score=Math.min(100,score+15);alerts.push("Urgency");
  }
  return{category,priority,score,confidence,color,alerts,recommendedAction:action,reason};
}

async function aiClassify(subject:string,body:string){
  if(!process.env.ANTHROPIC_API_KEY||process.env.AI_PROVIDER==="none")return null;
  try{
    const{default:Anthropic}=await import("@anthropic-ai/sdk");
    const c=new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY});
    const r=await c.messages.create({model:process.env.AI_MODEL||"claude-sonnet-4-20250514",max_tokens:400,system:"Respond with valid JSON only. No markdown.",messages:[{role:"user",content:`Classify this email: {"category":"legal_risk|complaint|hot_lead|warm_lead|normal","priority":"critical|high|medium|low","score":0-100,"confidence":0-100,"color":"#FF3D5A or #FF7A2F or #00D68F or #00B0FF or #6B7394","alerts":[],"recommendedAction":"","reason":""}\nSubject:${subject}\nBody:${body.slice(0,1200)}`}]});
    const txt=r.content[0]?.type==="text"?r.content[0].text:"{}";
    return{...JSON.parse(txt.replace(/```json|```/g,"").trim()),aiUsed:true};
  }catch{return null;}
}

export async function POST(req:NextRequest){
  try{
    const b=await req.json();
    const{subject="",bodyText="",forceAI}=b;
    if(!bodyText.trim())return NextResponse.json({error:"bodyText required"},{status:400});
    const rules=ruleClassify(subject,bodyText);
    const threshold=parseInt(process.env.AI_CONFIDENCE_THRESHOLD||"70");
    let classification=rules;
    if(forceAI||rules.confidence<threshold){const ai=await aiClassify(subject,bodyText);if(ai)classification=ai;}
    return NextResponse.json({message:{subject,bodyText},classification});
  }catch(e){return NextResponse.json({error:"Server error"},{status:500});}
}
