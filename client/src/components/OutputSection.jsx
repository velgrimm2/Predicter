import React, { useState } from 'react'
import PreviewTab from './PreviewTab'
import CodeTab from './CodeTab'
import { Eye, Code2, FileCode } from 'lucide-react'

const OutputSection = ({ html, css, onNotification }) => {
  const [activeTab, setActiveTab] = useState('preview')

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'html', label: 'HTML', icon: FileCode },
    { id: 'css', label: 'CSS', icon: Code2 }
  ]

  return (
    <div className="card h-fit lg:sticky lg:top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Output</h2>

      <div className="flex gap-2 mb-4 border-b border-gray-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'preview' && <PreviewTab html={html} css={css} />}
        {activeTab === 'html' && (
          <CodeTab code={html} language="html" onNotification={onNotification} />
        )}
        {activeTab === 'css' && (
          <CodeTab code={css} language="css" onNotification={onNotification} />
        )}
      </div>
    </div>
  )
}

export default OutputSection
