# Sketch2Code AI - Usage Guide

## Getting Started

### 1. Installation

```bash
# Install all dependencies
npm run install:all
```

### 2. Configuration

Create a `.env` file in the `server` directory with your Google AI Studio API key:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

#### How to Get Your Google AI Studio API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it into your `.env` file

### 3. Running the Application

Start both frontend and backend:

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Using Sketch2Code AI

### Step 1: Create Your UI Sketch

You have two options:

#### Option A: Draw on Canvas
1. Click the "Draw on Canvas" tab
2. Use the drawing tools:
   - **Pencil**: Free-hand drawing
   - **Eraser**: Erase parts of your drawing
   - **Rectangle**: Add rectangular shapes
   - **Circle**: Add circular shapes
   - **Text**: Add text elements (double-click to edit)
3. Use **Undo/Redo** buttons to navigate your drawing history
4. Use **Clear Canvas** to start over

#### Option B: Upload an Image
1. Click the "Upload Image" tab
2. Either:
   - Drag and drop an image file
   - Click "Browse Files" to select an image
3. Supported formats: JPG, PNG, WebP

### Step 2: Describe Your Design

In the "Design Description" text area, provide details about your desired output:

**Good Description Example:**
```
Create a modern landing page hero section with:
- Gradient background from blue (#0ea5e9) to purple (#9333ea)
- White text centered on the page
- Large bold heading: "Welcome to Our Platform"
- Subtitle below in lighter text
- Two call-to-action buttons side by side:
  - Primary button: "Get Started" (white background, blue text)
  - Secondary button: "Learn More" (transparent with white border)
- Responsive design that stacks buttons on mobile
- Smooth hover effects on buttons
```

**What to Include:**
- Colors (hex codes or color names)
- Fonts and text styles
- Layout structure (centered, grid, flexbox, etc.)
- Component details (buttons, cards, forms, etc.)
- Responsive behavior
- Hover effects or animations
- Spacing and padding preferences

### Step 3: Generate Code

1. Click the "Generate Code" button
2. Wait for the AI to process your request (usually 5-15 seconds)
3. The generated code will appear in the Output section

### Step 4: View and Use Your Code

The Output section has three tabs:

#### Preview Tab
- See your generated HTML/CSS rendered in real-time
- Toggle between device sizes:
  - **Desktop**: Full width
  - **Tablet**: 768px width
  - **Mobile**: 375px width

#### HTML Tab
- View the generated HTML code with syntax highlighting
- Click "Copy to Clipboard" to copy the code
- Use this in your projects or as a starting point

#### CSS Tab
- View the generated CSS code with syntax highlighting
- Click "Copy to Clipboard" to copy the code
- Includes responsive styles and modern CSS practices

## Tips for Best Results

### Drawing Tips
1. **Keep it simple**: Focus on layout and structure rather than detailed graphics
2. **Use shapes**: Rectangles for containers, circles for icons/avatars
3. **Add text**: Label different sections to help the AI understand purpose
4. **Show hierarchy**: Make important elements larger
5. **Indicate spacing**: Leave appropriate gaps between elements

### Description Tips
1. **Be specific**: "blue button" → "rounded button with #0ea5e9 background"
2. **Mention layout**: Specify if you want flexbox, grid, or specific positioning
3. **Include all components**: List all UI elements you want
4. **Specify responsive behavior**: Mention how it should look on mobile
5. **Add interaction details**: Hover effects, transitions, etc.

### Example Use Cases

#### Landing Page Hero
```
Sketch: Large text at top, two buttons below, background
Description: Modern hero section with gradient background (blue to purple),
centered white heading "Welcome", subtitle, and two CTAs side by side
```

#### Login Form
```
Sketch: Two input boxes stacked, button below
Description: Clean login form with email and password inputs, rounded corners,
primary blue submit button, center-aligned, max-width 400px
```

#### Product Card
```
Sketch: Rectangle with smaller rectangle at top, text below
Description: Product card with image placeholder at top, product name below,
price in bold, rounded corners, shadow on hover, 300px wide
```

#### Navigation Bar
```
Sketch: Horizontal line with circles for links
Description: Horizontal navigation bar with logo on left, menu items on right,
white background, sticky positioning, dropdown on hover
```

## Troubleshooting

### "Failed to generate code"
- Check that your API key is correctly set in `server/.env`
- Ensure you have an active internet connection
- Try with a simpler sketch or description

### Canvas is blank
- Make sure you've selected the correct tool
- Try clicking the Clear Canvas button and redrawing
- Check that your browser supports HTML5 Canvas

### Preview not showing
- Check the browser console for errors
- Try switching between tabs
- Regenerate the code

### Code not copying
- Ensure your browser allows clipboard access
- Try manually selecting and copying the code
- Check browser permissions

## Advanced Usage

### Customizing Generated Code

The AI generates clean, modern code that you can easily modify:

1. **Colors**: Change CSS variables or color values
2. **Layout**: Adjust flexbox/grid properties
3. **Spacing**: Modify padding, margin values
4. **Responsive breakpoints**: Add or modify media queries
5. **Typography**: Change font families, sizes, weights

### Iterating on Designs

1. Generate initial code
2. Review the preview
3. Modify your description to refine specific aspects
4. Regenerate with updated requirements
5. Compare results

### Best Practices

1. **Start simple**: Create basic layouts first, then add complexity
2. **Iterate**: Generate, review, refine, regenerate
3. **Learn from output**: Study the generated code to improve your descriptions
4. **Combine approaches**: Draw the layout, describe the styling
5. **Use as a starting point**: Generated code is meant to be customized

## Support

For issues, questions, or feature requests, please check:
- The README.md file for setup instructions
- The code comments for implementation details
- Google AI Studio documentation for API limits and usage

Enjoy building with Sketch2Code AI! 🚀
