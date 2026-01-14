# Contributing to Sketch2Code AI

Thank you for your interest in contributing to Sketch2Code AI! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm run install:all`
3. Create a `.env` file in the `server` directory with your Google AI Studio API key
4. Start development: `npm run dev`

## Project Structure

```
sketch2code-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.jsx
│   │   │   ├── InputSection.jsx
│   │   │   ├── CanvasDrawing.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── DescriptionInput.jsx
│   │   │   ├── OutputSection.jsx
│   │   │   ├── PreviewTab.jsx
│   │   │   ├── CodeTab.jsx
│   │   │   └── Notification.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   │   └── generative.js
│   │   ├── services/     # Business logic
│   │   │   └── gemini.js
│   │   └── server.js     # Express app
│   ├── .env.example
│   └── package.json
└── package.json          # Root package.json
```

## Code Style Guidelines

### JavaScript/React
- Use ES6+ features (arrow functions, destructuring, async/await)
- Use functional components with hooks
- Use meaningful variable and function names
- Keep components small and focused
- Add comments for complex logic

### CSS/Tailwind
- Use Tailwind utility classes
- Create custom classes in `index.css` for reusable styles
- Follow mobile-first responsive design
- Use Tailwind's color and spacing scale

### File Organization
- One component per file
- Name files using PascalCase for components (e.g., `Header.jsx`)
- Name files using camelCase for utilities (e.g., `api.js`)
- Export components as default exports

## Making Changes

### Frontend Development

1. **Adding a new component**:
   ```jsx
   import React from 'react'
   
   const MyComponent = ({ prop1, prop2 }) => {
     return (
       <div className="card">
         {/* Component content */}
       </div>
     )
   }
   
   export default MyComponent
   ```

2. **Using Tailwind CSS**:
   - Prefer utility classes over custom CSS
   - Use responsive modifiers: `sm:`, `md:`, `lg:`
   - Use the predefined color palette
   - Keep class names organized (layout → spacing → colors → typography)

3. **State Management**:
   - Use `useState` for local state
   - Pass state down through props
   - Lift state up when needed by multiple components

### Backend Development

1. **Adding API endpoints**:
   ```javascript
   router.post('/endpoint', async (req, res) => {
     try {
       // Validate input
       // Process request
       // Return response
       res.json({ data })
     } catch (error) {
       res.status(500).json({ error: error.message })
     }
   })
   ```

2. **Error Handling**:
   - Always use try-catch for async operations
   - Return appropriate HTTP status codes
   - Provide helpful error messages

3. **Environment Variables**:
   - Never commit `.env` files
   - Update `.env.example` when adding new variables
   - Access variables using `process.env.VARIABLE_NAME`

## Testing

Before submitting a pull request:

1. **Manual Testing**:
   - Test canvas drawing functionality
   - Test image upload
   - Test code generation
   - Test all three output tabs
   - Test responsive design
   - Test error cases

2. **Build Testing**:
   ```bash
   cd client
   npm run build
   ```

3. **Code Quality**:
   - Check for console errors
   - Ensure no unused imports
   - Follow existing code style

## Feature Ideas

Here are some features you could contribute:

### High Priority
- [ ] Error boundary for better error handling
- [ ] Loading skeleton screens
- [ ] Rate limiting on API calls
- [ ] Input validation improvements
- [ ] Better mobile support for canvas

### Medium Priority
- [ ] Dark mode support
- [ ] History/saved designs (localStorage)
- [ ] Export as downloadable files
- [ ] Multiple page generation
- [ ] Component library generation
- [ ] Style preset templates

### Nice to Have
- [ ] Collaborative editing
- [ ] User accounts and cloud storage
- [ ] AI model selection (different Gemini models)
- [ ] Custom color palette picker
- [ ] Font pairing suggestions
- [ ] Accessibility checker for generated code

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, commented code
   - Follow the code style guidelines
   - Test your changes thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add feature: description of your feature"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**:
   - Provide a clear description of changes
   - Link any related issues
   - Add screenshots for UI changes
   - List any breaking changes

### PR Description Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Tested all changes
- [ ] Updated documentation if needed
```

## Reporting Issues

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable

### Issue Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Node version: [e.g., 20.x]
```

## Code Review

All contributions go through code review. Reviewers will check:

- Code quality and style
- Functionality and correctness
- Performance implications
- Security considerations
- Documentation completeness

## Getting Help

- Read the README.md and USAGE.md files
- Check existing issues and PRs
- Review the codebase for examples
- Ask questions in issue comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Sketch2Code AI! 🎉
