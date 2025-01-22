'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SaveFilterModalProps {
  open: boolean
  onClose: () => void
  onSave: (name: string) => void
}

export function SaveFilterModal({ open, onClose, onSave }: SaveFilterModalProps) {
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')

  const handleSave = () => {
    if (!name.trim()) {
      setError('Filter segment name cannot be empty!')
      return
    }
    onSave(name)
    setName('')
    setError('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Segment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Filter Segment Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter a filter segment name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
            />
            {error && (
              <p className="text-sm text-red-500 italic">
                * {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-500"
          >
            Create Segment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 