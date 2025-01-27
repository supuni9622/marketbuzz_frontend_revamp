'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

interface FilterDropdownProps {
  items: Array<{ id: string; name: string }>
  onSelect: (id: string, name: string) => void
  title: string
  selectedValue: string
}

export function FilterDropdown({ items, onSelect, title, selectedValue }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[200px] justify-between">
          {selectedValue || title}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {items?.length > 0 ? (
          items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => onSelect(item.id, item.name)}
            >
              {item.name}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No Items</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 