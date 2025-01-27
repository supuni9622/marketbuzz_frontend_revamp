'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AdvanceSearchOptionProps {
  handleSearch: (query: string) => Promise<any>
}

export function AdvanceSearchOption({ handleSearch }: AdvanceSearchOptionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    }
  }

  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px] pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      <Button type="submit" variant="default">
        Search
      </Button>
    </form>
  )
} 