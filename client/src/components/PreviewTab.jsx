import React, { useState, useEffect, useRef } from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'

const PreviewTab = ({ html, css }) => {
  const [previewSize, setPreviewSize] = useState('desktop')
  const iframeRef = useRef(null)

  const sizeOptions = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' }
  ]

  useEffect(() => {
    if (iframeRef.current && (html || css)) {
      const iframeDoc = iframeRef.current.contentDocument
      const fullHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: system-ui, -apple-system, sans-serif; }
              ${css || ''}
            </style>
          </head>
          <body>
            ${html || ''}
          </body>
        </html>
      `
      iframeDoc.open()
      iframeDoc.write(fullHTML)
      iframeDoc.close()
    }
  }, [html, css])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {sizeOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPreviewSize(id)}
            className={`btn-icon ${
              previewSize === id ? 'bg-primary-100 text-primary-600' : ''
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg min-h-[400px] flex justify-center">
        {html || css ? (
          <div
            className="bg-white rounded-lg shadow-lg transition-all duration-300"
            style={{
              width: sizeOptions.find((s) => s.id === previewSize)?.width,
              minHeight: '400px'
            }}
          >
            <iframe
              ref={iframeRef}
              title="Preview"
              className="w-full h-full min-h-[400px] rounded-lg"
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center text-gray-400">
            <p>Generate code to see the preview</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewTab
