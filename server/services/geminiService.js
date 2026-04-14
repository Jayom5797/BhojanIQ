const { VertexAI } = require('@google-cloud/vertexai')

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: 'us-central1',
})

const model = vertexAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-1.5-pro',
})

const SYSTEM_PROMPT = `You are BhojanIQ, a real-time food decision assistant. 
Given food information and user context, respond ONLY with valid JSON in this exact format:
{
  "decision": "eat" | "modify" | "avoid",
  "foodDetected": "string — primary food item name",
  "confidence": number (0-100),
  "explanation": "string — 1-2 sentences explaining the decision based on context",
  "suggestions": ["string", "string", "string"],
  "alternatives": [
    { "name": "string", "reason": "string" },
    { "name": "string", "reason": "string" },
    { "name": "string", "reason": "string" }
  ]
}
Be direct. No markdown. No extra text. Only JSON.`

async function getGeminiDecision({ foodContext, userContext }) {
  const prompt = `${SYSTEM_PROMPT}

Food Information: ${foodContext}
User Context: ${userContext}

Respond with JSON only.`

  const result = await model.generateContent(prompt)
  const text = result.response.candidates[0].content.parts[0].text.trim()

  // Strip markdown code fences if present
  const clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '')
  return JSON.parse(clean)
}

module.exports = { getGeminiDecision }
