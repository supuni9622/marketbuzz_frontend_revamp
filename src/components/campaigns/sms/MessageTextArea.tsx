'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

export interface MessageTextAreaProps {
  value: string
  onChange: (value: string) => void
  footerText: string
  error?: boolean
}

export function MessageTextArea({ value, onChange, footerText, error }: MessageTextAreaProps) {
  const [footerName, setFooterName] = useState(footerText)
  const [isEditing, setIsEditing] = useState(false)
  const [footerError, setFooterError] = useState("")

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFooterName(value)
    setIsEditing(true)
    
    if (value.length < 5) {
      setFooterError("Name must be at least 5 characters long")
    } else {
      setFooterError("")
    }
  }

  const handleSave = async () => {
    try {
      // TODO: Add API call to update organization name
      setIsEditing(false)
      toast.success("Short name saved successfully")
    } catch (error) {
      toast.error("Failed to save short name")
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative min-h-[150px]">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[150px] resize-none ${error ? "border-red-500" : ""}`}
        />
        <div className="absolute bottom-0 left-0 right-0 border-t p-2">
          <div className="flex items-center space-x-2">
            <Input
              value={footerName}
              onChange={handleFooterChange}
              className="border-none bg-transparent p-0 focus-visible:ring-0"
            />
            {isEditing && (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!!footerError || footerName.length < 5}
              >
                Save
              </Button>
            )}
          </div>
          {footerError && <p className="text-sm text-red-500 mt-1">{footerError}</p>}
        </div>
      </div>
    </div>
  )
} 