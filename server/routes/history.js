const express = require('express')
const router = express.Router()
const { getHistory, saveAnalysis } = require('../services/firestoreService')

router.get('/:userId', async (req, res) => {
  try {
    const history = await getHistory(req.params.userId)
    res.json(history)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const saved = await saveAnalysis(req.body)
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
