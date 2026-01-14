import React, { useState } from 'react'
import CanvasDrawing from './CanvasDrawing'
import ImageUpload from './ImageUpload'
import DescriptionInput from './DescriptionInput'
import ComponentModeSelector from './ComponentModeSelector'
import { Sparkles } from 'lucide-react'

const InputSection = ({
  onCanvasChange,
  onImageUpload,
  description,
  onDescriptionChange,
  componentMode,
  onComponentModeChange,
  onGenerate,
  isGenerating,
  uploadedImage
}) => {
  const [inputMode, setInputMode] = useState('canvas')

  const handleModeChange = (mode) => {
    setInputMode(mode)
    if (mode === 'canvas') {
      onImageUpload(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Input</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleModeChange('canvas')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              inputMode === 'canvas'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Draw on Canvas
          </button>
          <button
            onClick={() => handleModeChange('upload')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              inputMode === 'upload'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upload Image
          </button>
        </div>

        {inputMode === 'canvas' ? (
          <CanvasDrawing onCanvasChange={onCanvasChange} />
        ) : (
          <ImageUpload
            onImageUpload={onImageUpload}
            uploadedImage={uploadedImage}
          />
        )}
      </div>

      <div className="card">
        <ComponentModeSelector
          componentMode={componentMode}
          onComponentModeChange={onComponentModeChange}
        />
      </div>

      <div className="card">
        <DescriptionInput
          description={description}
          onDescriptionChange={onDescriptionChange}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Code
          </>
        )}
      </button>
    </div>
  )
}

export default InputSection
