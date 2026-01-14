# Sketch2Code AI

Convert UI sketches into HTML/CSS code using Google AI Studio (Gemini API).

## Features

- **Canvas Drawing**: Draw UI sketches with pen, eraser, shapes (rectangle, circle), and text tools
- **Image Upload**: Upload existing UI sketches (JPG, PNG, WebP) with drag & drop support
- **AI-Powered Generation**: Convert sketches to clean, modern HTML/CSS using Google Gemini
- **Live Preview**: See your generated code rendered in real-time
- **Syntax Highlighting**: View HTML and CSS code with syntax highlighting
- **Responsive Design**: Preview and generate responsive designs
- **Copy to Clipboard**: Easily copy generated code

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Fabric.js, Prism.js
- **Backend**: Node.js, Express
- **AI**: Google AI Studio (Gemini API)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory
   - Add your Google AI Studio API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     PORT=3001
     ```

4. Get your Google AI Studio API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy it to your `.env` file

## Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

## Production

Build the frontend:

```bash
npm run build
```

Start the server:

```bash
npm start
```

## Usage

1. **Draw or Upload**: Either draw your UI sketch on the canvas or upload an image
2. **Describe**: Add a description of your design, including colors, fonts, and layout preferences
3. **Generate**: Click the Generate button to convert your sketch to HTML/CSS
4. **Preview & Copy**: View the live preview, check the code, and copy it to your clipboard

## Project Structure

```
sketch2code-ai/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/          # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
└── package.json     # Root package.json
```

## License

MIT
