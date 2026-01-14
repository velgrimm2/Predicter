import React from 'react'
import { Layout, Square, CreditCard, FileText } from 'lucide-react'

const ComponentModeSelector = ({ componentMode, onComponentModeChange }) => {
  const modes = [
    {
      id: 'full-page',
      label: 'Full Page',
      icon: Layout,
      description: 'Complete page layout'
    },
    {
      id: 'button',
      label: 'Button',
      icon: Square,
      description: 'Button component only'
    },
    {
      id: 'card',
      label: 'Card',
      icon: CreditCard,
      description: 'Card component only'
    },
    {
      id: 'form',
      label: 'Form',
      icon: FileText,
      description: 'Form component only'
    }
  ]

  return (
    <div>
      <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
        <Layout className="w-5 h-5" />
        Component Export Mode
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {modes.map(({ id, label, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => onComponentModeChange(id)}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              componentMode === id
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-xs opacity-75 truncate">{description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-3">
        Choose what type of component to generate from your sketch
      </p>
    </div>
  )
}

export default ComponentModeSelector
