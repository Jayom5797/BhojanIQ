const language = require('@google-cloud/natural-language')

const client = new language.LanguageServiceClient()

/**
 * Extracts food-related entities from text using Cloud Natural Language API.
 */
async function extractFoodEntities(text) {
  if (!text?.trim()) return []

  const [result] = await client.analyzeEntities({
    document: { content: text, type: 'PLAIN_TEXT' },
  })

  return (result.entities || [])
    .filter(e => ['CONSUMER_GOOD', 'OTHER'].includes(e.type))
    .map(e => e.name)
    .slice(0, 10)
}

module.exports = { extractFoodEntities }
