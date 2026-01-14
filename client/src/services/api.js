import axios from 'axios'

const API_BASE_URL = '/api'

export const generateCode = async (imageData, description, componentMode = 'full-page') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, {
      image: imageData,
      description: description,
      componentMode: componentMode
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 90000
    })

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
