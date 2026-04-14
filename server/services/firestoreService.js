const admin = require('firebase-admin')

// Initialize only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  })
}

const db = admin.firestore()
const COLLECTION = 'analyses'

async function saveAnalysis(data) {
  const ref = await db.collection(COLLECTION).add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })
  return { id: ref.id }
}

async function getHistory(userId) {
  const snapshot = await db.collection(COLLECTION)
    .where('profile.userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get()

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

module.exports = { saveAnalysis, getHistory }
