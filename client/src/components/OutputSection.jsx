import React, { useMemo, useState } from 'react'
import PreviewTab from './PreviewTab'
import CodeTab from './CodeTab'
import { Eye, Code2, FileCode, Braces } from 'lucide-react'

function buildFullHtmlDocument(html, css) {
  const safeHtml = html || ''
  const safeCss = css || ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
${safeCss}
  </style>
</head>
<body>
${safeHtml}
</body>
</html>
`
}

const OutputSection = ({ html, css, reactComponent, reactCss, onNotification }) => {
  const [activeTab, setActiveTab] = useState('preview')

  const fullHtml = useMemo(() => buildFullHtmlDocument(html, css), [html, css])

  const reactCombined = useMemo(() => {
    if (!reactComponent && !reactCss) return ''

    if (reactComponent && reactCss) {
      return `${reactComponent}

/* GeneratedComponent.module.css */
${reactCss}`
    }

    return reactComponent || reactCss
  }, [reactComponent, reactCss])

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'fullHtml', label: 'Full HTML', icon: FileCode },
    { id: 'react', label: 'React Component', icon: Braces },
    { id: 'css', label: 'CSS', icon: Code2 }
  ]

  return (
    <div className="card h-fit lg:sticky lg:top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Output</h2>

      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${
              activeTab === id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'preview' && <PreviewTab srcDoc={fullHtml} />}

        {activeTab === 'fullHtml' && (
          <CodeTab code={fullHtml} language="html" onNotification={onNotification} />
        )}

        {activeTab === 'react' && (
          <CodeTab code={reactCombined} language="jsx" onNotification={onNotification} />
        )}

        {activeTab === 'css' && (
          <CodeTab code={css} language="css" onNotification={onNotification} />
        )}
      </div>
    </div>
  )
}

export default OutputSection
