# Quick Start Guide

Get Sketch2Code AI running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- Google AI Studio API key ([Get one here](https://makersuite.google.com/app/apikey))

## Installation

```bash
# 1. Install dependencies
npm run install:all

# 2. Configure API key
cd server
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 3. Start the app
cd ..
npm run dev
```

## Access the App

Open your browser to: **http://localhost:5173**

## First Steps

1. **Draw something simple** or **upload an image**
   - Try drawing a rectangle for a container
   - Add some circles for buttons
   - Add text labels

2. **Describe what you want**
   ```
   Create a simple card with a blue background,
   white centered text saying "Hello World",
   and a rounded white button below
   ```

3. **Click "Generate Code"**

4. **View the results** in the Preview, HTML, and CSS tabs

## Troubleshooting

### API Key Error
Make sure you've:
- Created a `.env` file in the `server` folder
- Added `GEMINI_API_KEY=your_actual_key`
- Restarted the server

### Port Already in Use
Change the port in `server/.env`:
```
PORT=3002
```

And in `client/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3002',
    changeOrigin: true
  }
}
```

## Next Steps

- Read [USAGE.md](USAGE.md) for detailed usage instructions
- Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Experiment with different sketches and descriptions!

## Need Help?

- Check the README.md for full documentation
- Review the USAGE.md for tips and examples
- Open an issue if you find a bug

Happy coding! 🚀
