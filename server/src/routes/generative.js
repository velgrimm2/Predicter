import express from 'express'
import { generateHTMLCSS } from '../services/openrouter.js'

const router = express.Router()

router.post('/generate', async (req, res) => {
  try {
    const { image, description, componentMode } = req.body

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' })
    }

    if (!description) {
      return res.status(400).json({ error: 'Description is required' })
    }

    const result = await generateHTMLCSS(image, description, componentMode || 'full-page')

    res.json(result)
  } catch (error) {
    console.error('Error generating code:', error)
    res.status(500).json({
      error: 'Failed to generate code. Please try again.',
      details: error.message
    })
  }
})

export default router
