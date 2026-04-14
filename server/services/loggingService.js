const { Logging } = require('@google-cloud/logging')

const logging = new Logging({ projectId: process.env.GOOGLE_CLOUD_PROJECT_ID })
const log = logging.log('bhojaniq-requests')

async function logRequest({ endpoint, durationMs, decision, error }) {
  try {
    const metadata = { resource: { type: 'global' }, severity: error ? 'ERROR' : 'INFO' }
    const entry = log.entry(metadata, { endpoint, durationMs, decision, error: error?.message })
    await log.write(entry)
  } catch {
    // Non-critical — don't crash the request if logging fails
  }
}

module.exports = { logRequest }
