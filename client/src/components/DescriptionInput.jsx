import React from 'react'
import { FileText } from 'lucide-react'

const DescriptionInput = ({ description, onDescriptionChange }) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
        <FileText className="w-5 h-5" />
        Design Description
      </label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Describe your UI design, colors, fonts, layout, etc.&#10;&#10;Example: Create a modern landing page hero section with a gradient background (blue to purple), a large heading, a subtitle, and a call-to-action button. Use clean typography and center everything."
        className="w-full h-40 input-field resize-none"
      />
      <p className="text-sm text-gray-500 mt-2">
        Be specific about colors, fonts, layout, and components to get better results.
      </p>
    </div>
  )
}

export default DescriptionInput
