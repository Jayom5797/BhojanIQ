const express = require('express')
const multer = require('multer')
const router = express.Router()
const { detectFoodFromImage } = require('../services/visionService')
const { extractFoodEntities } = require('../services/nlpService')
const { translateToEnglish } = require('../services/translateService')
const { uploadImage } = require('../services/storageService')
const { getDecision } = require('../engine/decisionEngine')
const { saveAnalysis } = require('../services/firestoreService')
const { logRequest } = require('../services/loggingService')

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } })

router.post('/', upload.single('image'), async (req, res) => {
  const startTime = Date.now()
  try {
    const { description, timeOfDay, orderingOnline, profile: profileRaw } = req.body
    const profile = JSON.parse(profileRaw || '{}')

    let foodInput = description || ''
    let imageUrl = null

    // 1. Upload image to Cloud Storage if provided
    if (req.file) {
      imageUrl = await uploadImage(req.file)
    }

    // 2. Detect food from image via Cloud Vision
    let visionLabels = []
    if (req.file) {
      visionLabels = await detectFoodFromImage(req.file.buffer)
    }

    // 3. Translate non-English text input
    if (foodInput) {
      foodInput = await translateToEnglish(foodInput)
    }

    // 4. Extract food entities from text via Cloud NLP
    let nlpEntities = []
    if (foodInput) {
      nlpEntities = await extractFoodEntities(foodInput)
    }

    // 5. Run decision engine (Gemini)
    const result = await getDecision({
      visionLabels,
      nlpEntities,
      description: foodInput,
      timeOfDay,
      orderingOnline: orderingOnline === 'true',
      profile,
    })

    // 6. Save to Firestore
    const saved = await saveAnalysis({ ...result, imageUrl, profile })

    // 7. Log to Cloud Logging
    await logRequest({ endpoint: '/api/analyze', durationMs: Date.now() - startTime, decision: result.decision })

    res.json({ ...result, id: saved.id })
  } catch (err) {
    console.error('Analyze error:', err)
    res.status(500).json({ error: err.message || 'Analysis failed' })
  }
})

module.exports = router
