import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject, from, category, priority, language="en" } = await req.json();
    if (!process.env.ANTHROPIC_API_KEY || process.env.AI_PROVIDER==="none") {
      return NextResponse.json({ reply: language==="es"
        ? `Asunto: Re: ${subject}\n\nEstimado/a ${from},\n\nHemos recibido su mensaje y lo atenderemos a la brevedad.\n\nSaludos,\nEl equipo BLIQK\n\n---\n⚠️ Configure ANTHROPIC_API_KEY para respuestas con IA.`
        : `Subject: Re: ${subject}\n\nDear ${from},\n\nThank you for reaching out. We will respond shortly.\n\nBest regards,\nThe BLIQK Team\n\n---\n⚠️ Enable ANTHROPIC_API_KEY for AI-generated replies.`
      });
    }
    const { default: A } = await import("@anthropic-ai/sdk");
    const c = new A({ apiKey: process.env.ANTHROPIC_API_KEY });
    const lang = language==="es" ? "Spanish (español)" : "English";
    const r = await c.messages.create({
      model: process.env.AI_FALLBACK_MODEL||"claude-haiku-4-5-20251001", max_tokens:600,
      messages:[{ role:"user", content:`Write a professional empathetic email reply in ${lang}.
Category: ${category} | Priority: ${priority} | From: ${from} | Subject: ${subject}
Format:
Subject: [reply subject]
[Full ready-to-send email body]
---
⚠️ DO NOT SAY: [2 things to avoid]` }]
    });
    return NextResponse.json({ reply: r.content[0]?.type==="text" ? r.content[0].text : "" });
  } catch { return NextResponse.json({ error:"Failed" },{ status:500 }); }
}
