import React, { useState } from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'

const PreviewTab = ({ srcDoc }) => {
  const [previewSize, setPreviewSize] = useState('desktop')

  const sizeOptions = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' }
  ]

  if (!srcDoc) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400">
        <p>Generate code to see the preview</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {sizeOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPreviewSize(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${
              previewSize === id
                ? 'bg-primary-100 text-primary-700 border-primary-300'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg min-h-[500px] flex justify-center items-start overflow-auto">
        <div
          className="bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          style={{
            width: sizeOptions.find((s) => s.id === previewSize)?.width,
            minHeight: '400px'
          }}
        >
          <iframe
            title="Preview"
            srcDoc={srcDoc}
            className="w-full rounded-lg border-0"
            style={{ minHeight: '500px', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  )
}

export default PreviewTab
