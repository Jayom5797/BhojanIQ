const { Translate } = require('@google-cloud/translate').v2

const translate = new Translate({ projectId: process.env.GOOGLE_CLOUD_PROJECT_ID })

/**
 * Detects language and translates to English if needed.
 * Returns original text if already English or translation fails.
 */
async function translateToEnglish(text) {
  if (!text?.trim()) return text
  try {
    const [detection] = await translate.detect(text)
    if (detection.language === 'en') return text
    const [translated] = await translate.translate(text, 'en')
    return translated
  } catch {
    return text // fallback to original
  }
}

module.exports = { translateToEnglish }
