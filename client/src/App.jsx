import React, { useState } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import OutputSection from './components/OutputSection'
import Notification from './components/Notification'
import { generateCode } from './services/api'

function App() {
  const [canvasData, setCanvasData] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [description, setDescription] = useState('')
  const [generatedCode, setGeneratedCode] = useState({ html: '', css: '' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleGenerate = async () => {
    if (!description.trim()) {
      showNotification('Please add a description of your design', 'error')
      return
    }

    if (!canvasData && !uploadedImage) {
      showNotification('Please draw on the canvas or upload an image', 'error')
      return
    }

    setIsGenerating(true)
    try {
      const imageData = uploadedImage || canvasData
      const result = await generateCode(imageData, description)
      
      setGeneratedCode({
        html: result.html,
        css: result.css
      })
      
      showNotification('Code generated successfully!', 'success')
    } catch (error) {
      console.error('Generation error:', error)
      showNotification(
        error.response?.data?.error || 'Failed to generate code. Please try again.',
        'error'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <InputSection
            onCanvasChange={setCanvasData}
            onImageUpload={setUploadedImage}
            description={description}
            onDescriptionChange={setDescription}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            uploadedImage={uploadedImage}
          />
          
          <OutputSection
            html={generatedCode.html}
            css={generatedCode.css}
            onNotification={showNotification}
          />
        </div>
      </main>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

export default App
