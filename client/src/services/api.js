import axios from 'axios'

const client = axios.create({ baseURL: '/api' })

/**
 * analyzeFood — sends image or text to backend for analysis
 * @param {Object} params
 * @param {File|null} params.image
 * @param {string} params.description
 * @param {string} params.timeOfDay
 * @param {boolean} params.orderingOnline
 * @param {Object} params.profile - { goal, diet, budget }
 */
export async function analyzeFood({ image, description, timeOfDay, orderingOnline, profile }) {
  const formData = new FormData()
  if (image) formData.append('image', image)
  formData.append('description', description)
  formData.append('timeOfDay', timeOfDay)
  formData.append('orderingOnline', orderingOnline)
  formData.append('profile', JSON.stringify(profile))

  const { data } = await client.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function getHistory(userId) {
  const { data } = await client.get(`/history/${userId}`)
  return data
}

export async function saveHistory(entry) {
  const { data } = await client.post('/history', entry)
  return data
}
