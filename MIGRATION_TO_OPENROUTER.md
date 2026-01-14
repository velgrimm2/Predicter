# Migration from Gemini to OpenRouter

This document describes the migration from Google AI Studio (Gemini API) to OpenRouter.

## What Changed

### Backend Changes

1. **Service File Renamed**: `server/src/services/gemini.js` → `server/src/services/openrouter.js`
   - Removed dependency on `@google/generative-ai` SDK
   - Implemented OpenRouter integration using native `fetch` API
   - Uses OpenRouter's OpenAI-compatible API format

2. **Environment Variables**: Updated `.env` configuration
   - **Old**: `GEMINI_API_KEY=your_key`
   - **New**: `OPENROUTER_API_KEY=your_key`
   - **Additional** (optional):
     - `OPENROUTER_MODEL` (default: `openai/gpt-4o-mini`)
     - `OPENROUTER_BASE_URL` (default: `https://openrouter.ai/api/v1`)
     - `OPENROUTER_SITE_URL` (for HTTP-Referer header)
     - `OPENROUTER_APP_NAME` (default: `Sketch2Code AI`)

3. **Dependencies Removed**: No longer requires `@google/generative-ai` package

### API Implementation

The new OpenRouter service:
- Uses native `fetch` for HTTP requests (no additional dependencies)
- Supports vision/multimodal requests (image + text)
- Configurable AI model via environment variable
- Better error handling with detailed error messages
- Maintains same function signature: `generateHTMLCSS(imageData, description)`

### Documentation Updates

All documentation files updated to reference OpenRouter:
- `README.md`
- `QUICKSTART.md`
- `USAGE.md`
- `FEATURES.md`
- `CONTRIBUTING.md`
- `client/index.html` (meta description)
- `package.json` (descriptions and keywords)

## Migration Steps

If you're updating an existing installation:

### 1. Pull Latest Changes
```bash
git pull origin main
```

### 2. Update Dependencies
```bash
cd server
npm install
```

### 3. Update Environment Variables
```bash
cd server
# Edit your .env file
```

Update from:
```env
GEMINI_API_KEY=your_google_api_key
PORT=3001
```

To:
```env
OPENROUTER_API_KEY=your_openrouter_key
PORT=3001
```

### 4. Get OpenRouter API Key

1. Visit https://openrouter.ai/keys
2. Sign in (or create account)
3. Create a new API key
4. Add credits to your account if needed
5. Copy the key to your `.env` file

### 5. (Optional) Configure Custom Model

By default, the app uses `openai/gpt-4o-mini`. To use a different model:

```env
OPENROUTER_API_KEY=your_key
OPENROUTER_MODEL=google/gemini-1.5-flash
PORT=3001
```

Popular vision-capable models on OpenRouter:
- `openai/gpt-4o-mini` (default - fast and cost-effective)
- `openai/gpt-4o` (more capable, higher cost)
- `google/gemini-1.5-flash` (original Gemini model)
- `anthropic/claude-3.5-sonnet` (excellent for code generation)

### 6. Restart Your Server
```bash
npm run dev
```

## Benefits of OpenRouter

1. **Multiple Model Options**: Access to GPT-4, Claude, Gemini, and more
2. **Unified API**: OpenAI-compatible API for all models
3. **Cost Comparison**: Built-in cost comparison across models
4. **No Vendor Lock-in**: Easy to switch between AI providers
5. **Better Rate Limits**: Often better than individual APIs
6. **Pay-as-you-go**: Simple pricing with no minimum spend

## Compatibility

- **Frontend**: No changes needed - all changes are backend only
- **API Contract**: The `/api/generate` endpoint signature remains unchanged
- **Response Format**: Same JSON structure (html + css)
- **Image Format**: Still uses base64-encoded images

## Troubleshooting

### "Missing OPENROUTER_API_KEY in server environment"
- Make sure `.env` file exists in the `server` directory
- Check that the key is correctly named: `OPENROUTER_API_KEY`
- Restart the server after editing `.env`

### "OpenRouter API error (401)"
- Your API key is invalid or expired
- Check that you've copied the full key correctly
- Verify your key at https://openrouter.ai/keys

### "OpenRouter API error (402)"
- Insufficient credits in your OpenRouter account
- Add credits at https://openrouter.ai/credits

### Model-specific errors
- Ensure the model you specified supports vision (image input)
- Check OpenRouter documentation for model capabilities
- Try the default model: `openai/gpt-4o-mini`

## Cost Comparison

Approximate costs per 1000 requests (varies by image size and response length):

| Provider | Model | Estimated Cost |
|----------|-------|----------------|
| OpenRouter | gpt-4o-mini | $0.50-2 |
| OpenRouter | gemini-1.5-flash | $0.30-1 |
| OpenRouter | claude-3.5-sonnet | $3-6 |
| Direct Gemini API | gemini-1.5-flash | $0.30-1 |

*Note: OpenRouter adds a small markup but provides unified access*

## Reverting (If Needed)

To revert to Gemini:
```bash
git checkout main
cd server
npm install
# Update .env with GEMINI_API_KEY
```

## Support

For OpenRouter-specific issues:
- OpenRouter Docs: https://openrouter.ai/docs
- OpenRouter Discord: https://discord.gg/openrouter
- Check model status: https://openrouter.ai/models

For app-specific issues:
- Check the README.md
- Review USAGE.md
- Open an issue on GitHub

---

*Migration completed: January 2025*
