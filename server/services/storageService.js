const { Storage } = require('@google-cloud/storage')
const { v4: uuidv4 } = require('uuid')

const storage = new Storage()
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || 'bhojaniq-uploads')

/**
 * Uploads image buffer to Cloud Storage.
 * Returns public URL of uploaded file.
 */
async function uploadImage(file) {
  const filename = `uploads/${uuidv4()}-${file.originalname}`
  const blob = bucket.file(filename)

  await blob.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  })

  return `https://storage.googleapis.com/${bucket.name}/${filename}`
}

module.exports = { uploadImage }
