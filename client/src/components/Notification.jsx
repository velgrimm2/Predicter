import React from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const Notification = ({ message, type, onClose }) => {
  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
          isSuccess
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded hover:bg-white/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Notification
