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

function buildPrompt(description, componentMode) {
  const componentInstructions = {
    'full-page': 'Generate a complete page layout based on the sketch.',
    button: 'Generate ONLY a button component (not a full page).',
    card: 'Generate ONLY a card component (not a full page).',
    form: 'Generate ONLY a form component (not a full page).'
  }

  const instruction = componentInstructions[componentMode] || componentInstructions['full-page']

  return `You are an expert frontend developer.

Task:
Analyze the provided UI sketch/wireframe and convert it into code.

User description:
${description}

Component export mode: ${componentMode}
${instruction}

Output requirements (STRICT):
1. HTML must be semantic and accessible.
2. CSS must be plain CSS (no Tailwind, no Bootstrap, no frameworks).
3. Use modern responsive CSS (Flexbox/Grid). Mobile-first.
4. Do NOT include code fences or markdown.
5. HTML output must be BODY CONTENT ONLY (no <!DOCTYPE>, no <html>, no <head>, no <body> tags).
6. React output must be a clean React functional component that returns JSX only (no document tags).
7. React should use a CSS Module named \"GeneratedComponent.module.css\" and import it as \"styles\".

Return ONLY the following JSON object:
{
  \"html\": \"...\",
  \"css\": \"...\",
  \"reactComponent\": \"...\",
  \"reactCss\": \"...\"
}

Notes:
- \"reactComponent\" must export default function GeneratedComponent() { ... }
- \"reactCss\" must be the CSS module content.
- The HTML/CSS and React/CSS-module should visually match.`
}

export async function generateHTMLCSS(imageData, description, componentMode = 'full-page') {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('Missing OPENROUTER_API_KEY in server environment')
    }

    const prompt = buildPrompt(description, componentMode)

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
      css: generatedCode.css.trim(),
      reactComponent: (generatedCode.reactComponent || '').trim(),
      reactCss: (generatedCode.reactCss || '').trim()
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error)
    throw new Error(`AI generation failed: ${error.message}`)
  }
}
