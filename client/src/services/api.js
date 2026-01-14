import axios from 'axios'

const API_BASE_URL = '/api'

export const generateCode = async (imageData, description) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, {
      image: imageData,
      description: description
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000
    })

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
