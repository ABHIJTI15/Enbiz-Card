"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Eye, EyeOff, Edit3, Trash2 } from "lucide-react"

interface CardElement {
  id: string
  type: "name" | "title" | "company" | "email" | "phone" | "website" | "bio" | "social" | "avatar" | "qr"
  label: string
  visible: boolean
  order: number
}

interface DragDropEditorProps {
  elements: CardElement[]
  onUpdateElements: (elements: CardElement[]) => void
}

export function DragDropEditor({ elements, onUpdateElements }: DragDropEditorProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedItem(elementId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = elements.findIndex((el) => el.id === draggedItem)
    const targetIndex = elements.findIndex((el) => el.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newElements = [...elements]
    const [draggedElement] = newElements.splice(draggedIndex, 1)
    newElements.splice(targetIndex, 0, draggedElement)

    // Update order values
    const updatedElements = newElements.map((el, index) => ({
      ...el,
      order: index,
    }))

    onUpdateElements(updatedElements)
    setDraggedItem(null)
  }

  const toggleVisibility = (elementId: string) => {
    const updatedElements = elements.map((el) => (el.id === elementId ? { ...el, visible: !el.visible } : el))
    onUpdateElements(updatedElements)
  }

  const removeElement = (elementId: string) => {
    const updatedElements = elements.filter((el) => el.id !== elementId)
    onUpdateElements(updatedElements)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Card Layout</h3>
        <Badge variant="secondary" className="text-xs">
          Drag to reorder
        </Badge>
      </div>

      <div className="space-y-2">
        {elements
          .sort((a, b) => a.order - b.order)
          .map((element) => (
            <Card
              key={element.id}
              className={`p-3 cursor-move transition-all duration-200 ${
                draggedItem === element.id ? "opacity-50 scale-95" : "hover:bg-accent/50"
              } ${element.visible ? "bg-card/50 border-border/50" : "bg-muted/30 border-muted/50"}`}
              draggable
              onDragStart={(e) => handleDragStart(e, element.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, element.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${!element.visible ? "text-muted-foreground" : ""}`}>
                      {element.label}
                    </span>
                    {!element.visible && (
                      <Badge variant="outline" className="text-xs">
                        Hidden
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleVisibility(element.id)}
                    className="p-1 h-8 w-8"
                  >
                    {element.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeElement(element.id)}
                    className="p-1 h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
