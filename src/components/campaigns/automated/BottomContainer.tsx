'use client'

import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Utility } from '@/utility/Utility'

interface BottomContainerProps {
  charCount: number
  pageCount: number
  message: string
  isShowCustomAttributeNotification?: boolean
}

export function BottomContainer({
  charCount,
  pageCount,
  message,
  isShowCustomAttributeNotification = false
}: BottomContainerProps) {
  const hasCustomAttributes = Utility.hasCustomAttributes(message)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Characters: <span className="font-medium">{charCount}</span>
        </div>
        <div>
          Pages: <span className="font-medium">{pageCount}</span>
        </div>
      </div>

      {pageCount > 3 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Message is too long. Maximum 3 pages allowed.
          </AlertDescription>
        </Alert>
      )}

      {isShowCustomAttributeNotification && hasCustomAttributes && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please replace all custom attributes before saving.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
} 