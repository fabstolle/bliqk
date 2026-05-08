import { NextRequest, NextResponse } from "next/server";

// Rule-based classifier (free, no API key needed)
function classifyWithRules(subject: string, body: string) {
  const text = `${subject} ${body}`.toLowerCase();
  let category = "normal", priority = "low", score = 20, confidence = 75;
  const alerts: string[] = [];
  let action = "Review and respond if needed.";
  let reason = "No critical signals detected by rules.";

  // Legal risk
  if (["lawyer","attorney","lawsuit","legal action","sue","abogado","demanda"].some(k => text.includes(k))) {
    category = "legal_risk"; priority = "critical"; score = 90; confidence = 92;
    alerts.push("Legal threat detected");
    action = "Respond within 2 hours. Escalate to management.";
    reason = "Explicit legal language detected.";
  }
  // Complaint
  else if (["refund","problem","error","not working","terrible","complaint","awful","broken"].filter(k => text.includes(k)).length >= 2) {
    category = "complaint"; priority = "high"; score = 70; confidence = 82;
    alerts.push("Multiple complaint signals");
    action = "Respond with empathy. Offer concrete solution.";
    reason = "Multiple complaint keywords detected.";
  }
  // Hot lead
  else if (["price","pricing","how much","buy","purchase","demo","interested","quote"].filter(k => text.includes(k)).length >= 2) {
    category = "hot_lead"; priority = "high"; score = 80; confidence = 85;
    alerts.push("Purchase intent detected");
    action = "Contact within 2 hours. Send proposal.";
    reason = "Strong purchase intent signals.";
  }
  // Warm lead
  else if (["information","question","wondering","curious","evaluate","consider"].some(k => text.includes(k))) {
    category = "warm_lead"; priority = "medium"; score = 55; confidence = 78;
    action = "Respond with info. Ask qualifying questions.";
    reason = "Inquiry without strong purchase signals.";
  }

  // Urgency boost
  if (["urgent","asap","immediately","today","now","critical"].some(k => text.includes(k))) {
    score = Math.min(100, score + 15);
    if (priority === "low") priority = "medium";
    alerts.push("High urgency");
  }

  // Review threat
  if (["google review","tripadvisor","yelp","social media","twitter","bad review"].some(k => text.includes(k))) {
    score = Math.min(100, score + 20);
    alerts.push("Review threat");
    if (priority !== "critical") priority = "high";
  }

  return { category, priority, score, confidence, aiUsed: false, alerts, recommendedAction: action, reason };
}

// AI classifier (uses Claude when confidence is low)
async function classifyWithAI(subject: string, body: string) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.AI_PROVIDER === "none") {
    return null;
  }
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: process.env.AI_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: "Respond with valid JSON only. No markdown, no code blocks, no explanation.",
      messages: [{
        role: "user",
        content: `Classify this customer email. Return JSON only:
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
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return { ...parsed, aiUsed: true };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderName, senderEmail, subject = "", bodyText = "", forceAI } = body;

    if (!bodyText.trim()) {
      return NextResponse.json({ error: "bodyText is required" }, { status: 400 });
    }

    // Step 1: Rule classifier (always runs, free)
    const ruleResult = classifyWithRules(subject, bodyText);

    // Step 2: AI only if confidence is low or forced
    const threshold = parseInt(process.env.AI_CONFIDENCE_THRESHOLD || "70");
    let classification = ruleResult;

    if (forceAI || ruleResult.confidence < threshold) {
      const aiResult = await classifyWithAI(subject, bodyText);
      if (aiResult) classification = aiResult;
    }

    return NextResponse.json({
      message: { senderName, senderEmail, subject, bodyText },
      classification,
    });
  } catch (error) {
    console.error("Capture error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
