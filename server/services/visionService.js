const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient()

/**
 * Detects food labels from image buffer using Cloud Vision API.
 * Returns array of label strings with confidence > 0.6
 */
async function detectFoodFromImage(imageBuffer) {
  const [result] = await client.labelDetection({ image: { content: imageBuffer } })
  const labels = result.labelAnnotations || []
  return labels
    .filter(l => l.score > 0.6)
    .map(l => l.description)
    .slice(0, 10)
}

module.exports = { detectFoodFromImage }
