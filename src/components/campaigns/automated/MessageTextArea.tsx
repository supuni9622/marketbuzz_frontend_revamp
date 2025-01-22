'use client'

import React from 'react'
import { Textarea } from '@/components/ui/textarea'

interface MessageTextAreaProps {
  value: string
  onChange: (value: string) => void
  footerText?: string
}

export function MessageTextArea({ value, onChange, footerText }: MessageTextAreaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="min-h-[200px] resize-none"
      />
      {footerText && (
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {footerText}
        </div>
      )}
    </div>
  )
} 