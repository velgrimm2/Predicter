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
  Maximize2
} from 'lucide-react'
import FullscreenCanvas from './FullscreenCanvas'

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

const CanvasDrawing = ({ onCanvasChange }) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)

  const historyRef = useRef([])
  const historyStepRef = useRef(-1)
  const isRestoringRef = useRef(false)

  const [activeTool, setActiveTool] = useState('pencil')
  const [historyStep, setHistoryStep] = useState(0)
  const [historyLength, setHistoryLength] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#ffffff',
      isDrawingMode: true
    })

    canvas.freeDrawingBrush.color = '#000000'
    canvas.freeDrawingBrush.width = 2

    fabricCanvasRef.current = canvas

    const maybeSave = () => {
      if (isRestoringRef.current) return
      saveState()
    }

    canvas.on('object:added', maybeSave)
    canvas.on('object:modified', maybeSave)
    canvas.on('object:removed', maybeSave)

    saveState()

    return () => {
      canvas.off('object:added', maybeSave)
      canvas.off('object:modified', maybeSave)
      canvas.off('object:removed', maybeSave)
      canvas.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncCanvasDataUrl = () => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    })
    onCanvasChange(dataUrl)
  }

  const saveState = () => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    const json = canvas.toJSON()
    const newHistory = historyRef.current.slice(0, historyStepRef.current + 1)
    newHistory.push(json)

    historyRef.current = newHistory
    historyStepRef.current = newHistory.length - 1

    setHistoryLength(newHistory.length)
    setHistoryStep(historyStepRef.current)

    syncCanvasDataUrl()
  }

  const undo = () => {
    if (historyStepRef.current <= 0) return

    const canvas = fabricCanvasRef.current
    const newStep = historyStepRef.current - 1

    isRestoringRef.current = true
    historyStepRef.current = newStep
    setHistoryStep(newStep)

    canvas.loadFromJSON(historyRef.current[newStep], () => {
      canvas.renderAll()
      canvas.calcOffset()
      isRestoringRef.current = false
      syncCanvasDataUrl()
    })
  }

  const redo = () => {
    if (historyStepRef.current >= historyRef.current.length - 1) return

    const canvas = fabricCanvasRef.current
    const newStep = historyStepRef.current + 1

    isRestoringRef.current = true
    historyStepRef.current = newStep
    setHistoryStep(newStep)

    canvas.loadFromJSON(historyRef.current[newStep], () => {
      canvas.renderAll()
      canvas.calcOffset()
      isRestoringRef.current = false
      syncCanvasDataUrl()
    })
  }

  const clearCanvas = () => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    isRestoringRef.current = true

    canvas.clear()
    canvas.backgroundColor = '#ffffff'
    canvas.renderAll()

    historyRef.current = []
    historyStepRef.current = -1
    setHistoryLength(0)
    setHistoryStep(0)

    isRestoringRef.current = false
    saveState()
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

  const tools = [
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' }
  ]

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const handleFullscreenSave = (json) => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    isRestoringRef.current = true
    canvas.loadFromJSON(json, () => {
      canvas.setWidth(CANVAS_WIDTH)
      canvas.setHeight(CANVAS_HEIGHT)
      canvas.renderAll()
      canvas.calcOffset()
      isRestoringRef.current = false
      saveState()
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTool(id)}
            className={`btn-icon ${activeTool === id ? 'bg-primary-100 text-primary-600' : ''}`}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}

        <div className="flex-1" />

        <button
          onClick={openFullscreen}
          className="btn-icon"
          title="Fullscreen Draw"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

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
          disabled={historyStep >= historyLength - 1}
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

      {isFullscreen && (
        <FullscreenCanvas
          initialCanvas={fabricCanvasRef.current?.toJSON()}
          onClose={() => setIsFullscreen(false)}
          onSave={(json) => handleFullscreenSave(json)}
        />
      )}
    </div>
  )
}

export default CanvasDrawing
