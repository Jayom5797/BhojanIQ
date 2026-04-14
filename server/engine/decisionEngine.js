const { getGeminiDecision } = require('../services/geminiService')

/**
 * Orchestrates all GCP service outputs into a final decision via Gemini.
 */
async function getDecision({ visionLabels, nlpEntities, description, timeOfDay, orderingOnline, profile }) {
  const foodContext = [
    visionLabels.length ? `Detected from image: ${visionLabels.join(', ')}` : null,
    nlpEntities.length ? `Food entities from text: ${nlpEntities.join(', ')}` : null,
    description ? `User description: ${description}` : null,
  ].filter(Boolean).join('. ')

  const userContext = [
    profile.goal ? `Goal: ${profile.goal}` : null,
    profile.diet ? `Diet preference: ${profile.diet}` : null,
    profile.budget ? `Budget: ₹${profile.budget}` : null,
    `Time of consumption: ${timeOfDay}`,
    orderingOnline ? 'User is ordering online' : null,
  ].filter(Boolean).join('. ')

  return await getGeminiDecision({ foodContext, userContext })
}

module.exports = { getDecision }
