const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const analyzeRoute = require('./routes/analyze')
const historyRoute = require('./routes/history')

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/api/analyze', analyzeRoute)
app.use('/api/history', historyRoute)

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'BhojanIQ API' }))

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`BhojanIQ server running on port ${PORT}`))
