import React, { useState } from 'react'
import { Upload, Image, Trash2 } from 'lucide-react'

const ImageUpload = ({ onImageUpload, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFile(file)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      onImageUpload(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {uploadedImage ? (
          <div className="space-y-4">
            <img
              src={uploadedImage}
              alt="Uploaded sketch"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => onImageUpload(null)}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Image
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your UI sketch here, or
            </p>
            <label className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              <Image className="w-4 h-4" />
              Browse Files
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: JPG, PNG, WebP
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload
