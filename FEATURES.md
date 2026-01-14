# Sketch2Code AI - Feature Documentation

## Core Features

### 1. Canvas Drawing System
**Technology**: Fabric.js

**Features**:
- ✅ Free-hand drawing with pencil tool
- ✅ Eraser tool for corrections
- ✅ Shape tools (Rectangle, Circle)
- ✅ Text tool with inline editing
- ✅ Undo/Redo functionality with full history
- ✅ Clear canvas option
- ✅ Canvas exports to base64 PNG

**Implementation**: `client/src/components/CanvasDrawing.jsx`
- Uses Fabric.js Canvas API
- Maintains history stack for undo/redo
- Exports canvas as base64 data URL for API transmission

### 2. Image Upload System
**Features**:
- ✅ Drag and drop file upload
- ✅ Click to browse file system
- ✅ Support for JPG, PNG, WebP formats
- ✅ Image preview before generation
- ✅ Remove uploaded image option

**Implementation**: `client/src/components/ImageUpload.jsx`
- File reader API for base64 conversion
- Drag and drop event handlers
- File type validation

### 3. Description Input
**Features**:
- ✅ Multi-line text area for design description
- ✅ Placeholder with example text
- ✅ Helpful tips for better results
- ✅ Required field validation

**Implementation**: `client/src/components/DescriptionInput.jsx`
- Controlled input with React state
- User guidance for optimal AI results

### 4. AI Code Generation
**Technology**: OpenRouter API

**Features**:
- ✅ Converts sketches + descriptions to HTML/CSS
- ✅ Generates semantic, accessible HTML5
- ✅ Creates modern, responsive CSS
- ✅ Includes Flexbox/Grid layouts
- ✅ Mobile-first responsive design
- ✅ Clean, well-structured code output

**Implementation**: 
- Backend: `server/src/services/openrouter.js`
- API Route: `server/src/routes/generative.js`
- Prompt engineering for consistent output format
- JSON response parsing with fallbacks

**Prompt Engineering**:
- Instructs AI to follow modern web standards
- Requests specific design patterns
- Ensures responsive design
- Requires JSON format for structured output

### 5. Live Preview System
**Features**:
- ✅ Real-time rendering of generated HTML/CSS
- ✅ Isolated iframe for safe rendering
- ✅ Responsive preview modes:
  - Desktop (100% width)
  - Tablet (768px)
  - Mobile (375px)
- ✅ Automatic viewport meta tags

**Implementation**: `client/src/components/PreviewTab.jsx`
- Sandboxed iframe rendering
- Dynamic document writing
- Responsive width toggling
- Style injection

### 6. Code Display & Syntax Highlighting
**Technology**: Prism.js

**Features**:
- ✅ Syntax highlighted HTML code
- ✅ Syntax highlighted CSS code
- ✅ Copy to clipboard functionality
- ✅ Dark theme code editor
- ✅ Scrollable code containers

**Implementation**: `client/src/components/CodeTab.jsx`
- Prism.js for syntax highlighting
- Clipboard API for copy functionality
- Tomorrow Night theme for readability

### 7. Tabbed Output Interface
**Features**:
- ✅ Three-tab interface (Preview, HTML, CSS)
- ✅ Tab state management
- ✅ Icon indicators for each tab
- ✅ Smooth tab transitions

**Implementation**: `client/src/components/OutputSection.jsx`
- Tab state with useState
- Conditional rendering based on active tab

### 8. Notification System
**Features**:
- ✅ Success notifications (green)
- ✅ Error notifications (red)
- ✅ Auto-dismiss after 5 seconds
- ✅ Manual dismiss option
- ✅ Icon indicators

**Implementation**: `client/src/components/Notification.jsx`
- Fixed position bottom-right
- Timeout-based auto-dismiss
- Accessible close button

### 9. Modern UI/UX
**Technology**: Tailwind CSS

**Features**:
- ✅ Clean, modern design
- ✅ Gradient backgrounds
- ✅ Card-based layout
- ✅ Responsive grid system
- ✅ Hover effects and transitions
- ✅ Loading states
- ✅ Disabled states for form elements
- ✅ Icon integration (lucide-react)

**Implementation**: Throughout all components
- Tailwind utility classes
- Custom components in `index.css`
- Responsive breakpoints (lg, md, sm)
- Color palette from Tailwind config

## Technical Architecture

### Frontend Architecture
```
React App (Vite)
├── State Management: React useState hooks
├── API Communication: Axios
├── Styling: Tailwind CSS
├── Canvas: Fabric.js
└── Syntax Highlighting: Prism.js
```

### Backend Architecture
```
Express Server
├── Routes: /api/generate
├── Services: OpenRouter integration
├── Middleware: CORS, body-parser
└── Environment: dotenv
```

### Data Flow
```
1. User Input (Canvas/Image + Description)
   ↓
2. Frontend Validation
   ↓
3. Base64 Image Encoding
   ↓
4. API Request to /api/generate
   ↓
5. OpenRouter AI Processing
   ↓
6. JSON Response (HTML + CSS)
   ↓
7. State Update in React
   ↓
8. Render in Preview + Code Tabs
```

## API Specification

### POST /api/generate

**Request**:
```json
{
  "image": "data:image/png;base64,...",
  "description": "Create a modern hero section..."
}
```

**Response (Success)**:
```json
{
  "html": "<!DOCTYPE html>...",
  "css": "/* Modern CSS */"
}
```

**Response (Error)**:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

**Status Codes**:
- 200: Success
- 400: Bad Request (missing image or description)
- 500: Server Error (AI generation failed)

## Performance Considerations

### Frontend
- **Lazy Loading**: Components loaded as needed
- **Debouncing**: Canvas state updates debounced
- **Memoization**: Could add React.memo for optimization
- **Code Splitting**: Could improve with dynamic imports

### Backend
- **Request Size**: Limited to 50MB for image uploads
- **Timeout**: 60-second timeout on API requests
- **Rate Limiting**: Could add rate limiting middleware

### AI API
- **Model**: Configurable via `OPENROUTER_MODEL` (default: `openai/gpt-4o-mini`)
- **Response Time**: Typically 5-15 seconds
- **Token Limits**: Handled by the selected OpenRouter model

## Security Features

- ✅ Sandboxed iframe for preview (prevents XSS)
- ✅ Environment variables for API keys
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling without exposing internals
- ✅ No stored user data (privacy-first)

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Focus states on interactive elements
- ✅ Color contrast compliance
- ✅ Screen reader friendly notifications

## Browser Compatibility

**Tested and working**:
- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+

**Required APIs**:
- HTML5 Canvas
- FileReader API
- Fetch/Axios
- Clipboard API
- ES6+ JavaScript

## Future Enhancement Possibilities

### High Priority
- [ ] Multiple page generation
- [ ] Component library export
- [ ] Framework-specific output (React, Vue, etc.)
- [ ] Tailwind CSS integration option
- [ ] Dark mode UI

### Medium Priority
- [ ] Project history/saved designs
- [ ] Export as files (download)
- [ ] Custom color palette picker
- [ ] Font selection interface
- [ ] Template library

### Low Priority
- [ ] Real-time collaboration
- [ ] User accounts and cloud storage
- [ ] Version control for designs
- [ ] AI model selection
- [ ] Advanced CSS animations

## Known Limitations

1. **AI Output Variability**: Results depend on sketch clarity and description quality
2. **Large Bundles**: Fabric.js and Prism.js increase bundle size
3. **API Key Required**: Users must provide their own OpenRouter API key
4. **Single Page Output**: Currently generates single-page designs only
5. **No Asset Management**: Doesn't handle images in generated code (yet)

## Dependencies

### Client Dependencies
- `react` & `react-dom`: UI framework
- `fabric`: Canvas manipulation
- `prismjs`: Syntax highlighting
- `lucide-react`: Icon library
- `axios`: HTTP client

### Server Dependencies
- `express`: Web framework
- `cors`: CORS middleware
- `dotenv`: Environment variables

### Development Dependencies
- `vite`: Build tool
- `tailwindcss`: Utility-first CSS
- `postcss` & `autoprefixer`: CSS processing
- `concurrently`: Run multiple scripts

## Maintenance Notes

- **API Key Management**: Users must obtain and configure their own OpenRouter API key
- **Dependency Updates**: Regular updates recommended for security
- **API Changes**: Monitor OpenRouter for API changes and model availability
- **Browser Updates**: Test with new browser versions

---

*Last Updated: January 2024*
