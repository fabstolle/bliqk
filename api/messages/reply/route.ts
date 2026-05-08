import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try{
    const{subject,from,category,priority}=await req.json();
    if(!process.env.ANTHROPIC_API_KEY||process.env.AI_PROVIDER==="none"){
      return NextResponse.json({reply:`Subject: Re: ${subject}\n\nDear ${from},\n\nThank you for reaching out. We have received your message and will respond shortly.\n\nBest regards,\nThe BLIQK Team\n\n---\n⚠️ Enable ANTHROPIC_API_KEY for AI-generated replies.`});
    }
    const{default:Anthropic}=await import("@anthropic-ai/sdk");
    const c=new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY});
    const r=await c.messages.create({model:process.env.AI_FALLBACK_MODEL||"claude-haiku-4-5-20251001",max_tokens:600,messages:[{role:"user",content:`Write a professional empathetic email reply in English.\nCategory: ${category} | Priority: ${priority}\nFrom: ${from}\nSubject: ${subject}\n\nFormat:\nSubject: [reply subject]\n\n[Full ready-to-send email body]\n\n---\n⚠️ DO NOT SAY: [2 things to avoid]`}]});
    return NextResponse.json({reply:r.content[0]?.type==="text"?r.content[0].text:""});
  }catch(e){return NextResponse.json({error:"Failed"},{status:500});}
}
