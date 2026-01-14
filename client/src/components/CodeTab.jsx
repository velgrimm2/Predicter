import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import { Copy, Check } from 'lucide-react'

const CodeTab = ({ code, language, onNotification }) => {
  const codeRef = useRef(null)
  const [copied, setCopied] = React.useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code])

  const handleCopy = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        onNotification('Code copied to clipboard!', 'success')
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        onNotification('Failed to copy code', 'error')
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          disabled={!code}
          className="btn-secondary flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {code ? (
          <pre className="!m-0 max-h-[600px] overflow-auto">
            <code ref={codeRef} className={`language-${language}`}>
              {code}
            </code>
          </pre>
        ) : (
          <div className="p-8 text-center text-gray-400">
            <p>No {language.toUpperCase()} code generated yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeTab
