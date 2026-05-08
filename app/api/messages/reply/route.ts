import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject, body, category, priority, from } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY || process.env.AI_PROVIDER === "none") {
      return NextResponse.json({
        reply: `Subject: Re: ${subject}\n\nDear ${from},\n\nThank you for reaching out. We have received your message and will respond shortly.\n\nBest regards,\nThe BLIQK Team\n\n---\n⚠️ NOTE: Enable ANTHROPIC_API_KEY for AI-generated replies.`
      });
    }

    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: process.env.AI_FALLBACK_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 700,
      messages: [{
        role: "user",
        content: `You are a customer success expert. Write a professional, empathetic email reply in English.

Classification: ${category} | Priority: ${priority}
From: ${from}
Subject: ${subject}
Original message: ${body}

Format your response as:
Subject: [reply subject line]

[Full email body — professional, empathetic, ready to send]

---
⚠️ DO NOT SAY: [2 specific things to avoid saying in this reply]`
      }],
    });

    const reply = response.content[0]?.type === "text" ? response.content[0].text : "Unable to generate reply.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Reply generation error:", error);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
