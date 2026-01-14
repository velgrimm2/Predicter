import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

function base64ToGenerativePart(base64Data) {
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 data')
  }

  return {
    inlineData: {
      data: matches[2],
      mimeType: matches[1]
    }
  }
}

export async function generateHTMLCSS(imageData, description) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are an expert frontend developer. Analyze this UI sketch/wireframe and convert it into clean, modern HTML and CSS code.

User's Description: ${description}

Requirements:
1. Generate semantic, accessible HTML5 code
2. Create modern, responsive CSS (use Flexbox/Grid where appropriate)
3. Use the design details from the description (colors, fonts, layout, etc.)
4. Make the design mobile-first and responsive
5. Include appropriate spacing, padding, and margins
6. Use modern CSS practices (CSS variables, smooth transitions)
7. Ensure the code is clean, well-structured, and commented where helpful
8. If the sketch shows specific UI components (buttons, cards, forms), implement them accurately

Return your response in the following JSON format:
{
  "html": "<!-- Your HTML code here -->",
  "css": "/* Your CSS code here */"
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`

    const imagePart = base64ToGenerativePart(imageData)

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    let jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      jsonMatch = text.match(/```json\s*(\{[\s\S]*\})\s*```/)
      if (jsonMatch) {
        jsonMatch = [jsonMatch[1]]
      }
    }

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response')
    }

    const generatedCode = JSON.parse(jsonMatch[0])

    if (!generatedCode.html || !generatedCode.css) {
      throw new Error('Invalid response format from AI')
    }

    return {
      html: generatedCode.html.trim(),
      css: generatedCode.css.trim()
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error(`AI generation failed: ${error.message}`)
  }
}
