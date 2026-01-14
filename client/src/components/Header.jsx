import React from 'react'
import { Sparkles } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 p-3 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Sketch2Code AI
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Convert UI sketches into HTML/CSS code with AI
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
