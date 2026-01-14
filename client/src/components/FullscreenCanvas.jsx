import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import {
  Pencil,
  Eraser,
  Square,
  Circle,
  Type,
  Trash2,
  Undo,
  Redo,
  X
} from 'lucide-react'

const FullscreenCanvas = ({ initialCanvas, onClose, onSave }) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [activeTool, setActiveTool] = useState('pencil')
  const [history, setHistory] = useState([])
  const [historyStep, setHistoryStep] = useState(0)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#ffffff',
      isDrawingMode: true
    })

    canvas.freeDrawingBrush.color = '#000000'
    canvas.freeDrawingBrush.width = 3

    fabricCanvasRef.current = canvas

    if (initialCanvas) {
      canvas.loadFromJSON(initialCanvas, () => {
        canvas.renderAll()
        saveState()
      })
    } else {
      saveState()
    }

    canvas.on('object:added', () => saveState())
    canvas.on('object:modified', () => saveState())
    canvas.on('object:removed', () => saveState())

    const handleResize = () => {
      canvas.setWidth(window.innerWidth)
      canvas.setHeight(window.innerHeight)
      canvas.renderAll()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.dispose()
    }
  }, [])

  const saveState = () => {
    if (!fabricCanvasRef.current) return

    const canvas = fabricCanvasRef.current
    const json = canvas.toJSON()
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(json)
    setHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1
      setHistoryStep(newStep)
      fabricCanvasRef.current.loadFromJSON(history[newStep], () => {
        fabricCanvasRef.current.renderAll()
      })
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1
      setHistoryStep(newStep)
      fabricCanvasRef.current.loadFromJSON(history[newStep], () => {
        fabricCanvasRef.current.renderAll()
      })
    }
  }

  const clearCanvas = () => {
    const canvas = fabricCanvasRef.current
    canvas.clear()
    canvas.backgroundColor = '#ffffff'
    canvas.renderAll()
    setHistory([])
    setHistoryStep(0)
    saveState()
  }

  const setTool = (tool) => {
    setActiveTool(tool)
    const canvas = fabricCanvasRef.current

    canvas.isDrawingMode = false
    canvas.selection = true

    switch (tool) {
      case 'pencil':
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = '#000000'
        canvas.freeDrawingBrush.width = 3
        break

      case 'eraser':
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = '#ffffff'
        canvas.freeDrawingBrush.width = 30
        break

      case 'rectangle':
        addRectangle(canvas)
        break

      case 'circle':
        addCircle(canvas)
        break

      case 'text':
        addText(canvas)
        break

      default:
        break
    }
  }

  const addRectangle = (canvas) => {
    const rect = new fabric.Rect({
      left: window.innerWidth / 2 - 100,
      top: window.innerHeight / 2 - 75,
      width: 200,
      height: 150,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 3
    })
    canvas.add(rect)
    canvas.setActiveObject(rect)
  }

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      left: window.innerWidth / 2 - 75,
      top: window.innerHeight / 2 - 75,
      radius: 75,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 3
    })
    canvas.add(circle)
    canvas.setActiveObject(circle)
  }

  const addText = (canvas) => {
    const text = new fabric.IText('Double click to edit', {
      left: window.innerWidth / 2 - 100,
      top: window.innerHeight / 2 - 20,
      fontSize: 28,
      fill: '#000000'
    })
    canvas.add(text)
    canvas.setActiveObject(text)
  }

  const handleSave = () => {
    const canvas = fabricCanvasRef.current
    const json = canvas.toJSON()
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    })
    onSave(json, dataUrl)
    onClose()
  }

  const tools = [
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} />
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl p-3 flex gap-2 items-center">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTool(id)}
            className={`p-3 rounded-lg transition-all ${
              activeTool === id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={label}
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}

        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        <button
          onClick={undo}
          disabled={historyStep <= 0}
          className="p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
          title="Undo"
        >
          <Undo className="w-6 h-6" />
        </button>

        <button
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          className="p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
          title="Redo"
        >
          <Redo className="w-6 h-6" />
        </button>

        <button
          onClick={clearCanvas}
          className="p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
          title="Clear Canvas"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Save & Exit Fullscreen
        </button>
      </div>
    </div>
  )
}

export default FullscreenCanvas
