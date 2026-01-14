import dotenv from 'dotenv'

dotenv.config()

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL
const OPENROUTER_APP_NAME = process.env.OPENROUTER_APP_NAME || 'Sketch2Code AI'

function extractTextFromMessageContent(content) {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part
        if (part?.type === 'text') return part.text || ''
        return ''
      })
      .join('')
  }
  return ''
}

function extractJsonObject(text) {
  const directMatch = text.match(/\{[\s\S]*\}/)
  if (directMatch) return directMatch[0]

  const fenced = text.match(/```json\s*(\{[\s\S]*\})\s*```/)
  if (fenced?.[1]) return fenced[1]

  return null
}

export async function generateHTMLCSS(imageData, description) {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('Missing OPENROUTER_API_KEY in server environment')
    }

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

    const headers = {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    }

    if (OPENROUTER_SITE_URL) {
      headers['HTTP-Referer'] = OPENROUTER_SITE_URL
    }

    if (OPENROUTER_APP_NAME) {
      headers['X-Title'] = OPENROUTER_APP_NAME
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        temperature: 0.2
      })
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      throw new Error(`OpenRouter API error (${response.status}): ${errorText || response.statusText}`)
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content
    const text = extractTextFromMessageContent(content)

    if (!text) {
      throw new Error('Empty response from AI')
    }

    const jsonString = extractJsonObject(text)
    if (!jsonString) {
      throw new Error('Failed to parse AI response')
    }

    const generatedCode = JSON.parse(jsonString)

    if (!generatedCode.html || !generatedCode.css) {
      throw new Error('Invalid response format from AI')
    }

    return {
      html: generatedCode.html.trim(),
      css: generatedCode.css.trim()
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error)
    throw new Error(`AI generation failed: ${error.message}`)
  }
}
