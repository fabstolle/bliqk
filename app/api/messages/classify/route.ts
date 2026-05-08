import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject = "", body = "" } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY || process.env.AI_PROVIDER === "none") {
      return NextResponse.json({ error: "AI not configured" }, { status: 400 });
    }

    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: process.env.AI_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: "Respond with valid JSON only. No markdown, no explanation.",
      messages: [{
        role: "user",
        content: `Classify this email:
{
  "category": "legal_risk|complaint|hot_lead|warm_lead|normal",
  "priority": "critical|high|medium|low",
  "score": 0-100,
  "confidence": 0-100,
  "alerts": ["string"],
  "recommendedAction": "string",
  "reason": "string"
}
Subject: ${subject}
Body: ${body.slice(0, 1200)}`
      }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const result = JSON.parse(text.replace(/```json|```/g, "").trim());
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: "Classification failed" }, { status: 500 });
  }
}
