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
  Redo
} from 'lucide-react'

const CanvasDrawing = ({ onCanvasChange }) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [activeTool, setActiveTool] = useState('pencil')
  const [history, setHistory] = useState([])
  const [historyStep, setHistoryStep] = useState(0)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#ffffff',
      isDrawingMode: true
    })

    canvas.freeDrawingBrush.color = '#000000'
    canvas.freeDrawingBrush.width = 2

    fabricCanvasRef.current = canvas

    canvas.on('object:added', () => saveState())
    canvas.on('object:modified', () => saveState())
    canvas.on('object:removed', () => saveState())

    saveState()

    return () => {
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

    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    })
    onCanvasChange(dataUrl)
  }

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1
      setHistoryStep(newStep)
      fabricCanvasRef.current.loadFromJSON(history[newStep], () => {
        fabricCanvasRef.current.renderAll()
        const dataUrl = fabricCanvasRef.current.toDataURL({
          format: 'png',
          quality: 1
        })
        onCanvasChange(dataUrl)
      })
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1
      setHistoryStep(newStep)
      fabricCanvasRef.current.loadFromJSON(history[newStep], () => {
        fabricCanvasRef.current.renderAll()
        const dataUrl = fabricCanvasRef.current.toDataURL({
          format: 'png',
          quality: 1
        })
        onCanvasChange(dataUrl)
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
        canvas.freeDrawingBrush.width = 2
        break

      case 'eraser':
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = '#ffffff'
        canvas.freeDrawingBrush.width = 20
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
      left: 100,
      top: 100,
      width: 150,
      height: 100,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    })
    canvas.add(rect)
    canvas.setActiveObject(rect)
  }

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2
    })
    canvas.add(circle)
    canvas.setActiveObject(circle)
  }

  const addText = (canvas) => {
    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: '#000000'
    })
    canvas.add(text)
    canvas.setActiveObject(text)
  }

  const tools = [
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTool(id)}
            className={`btn-icon ${
              activeTool === id ? 'bg-primary-100 text-primary-600' : ''
            }`}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
        
        <div className="flex-1"></div>
        
        <button
          onClick={undo}
          disabled={historyStep <= 0}
          className="btn-icon"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        
        <button
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          className="btn-icon"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
        
        <button
          onClick={clearCanvas}
          className="btn-icon text-red-600"
          title="Clear Canvas"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default CanvasDrawing
