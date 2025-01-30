'use client'

import { useState } from 'react'
import { Card, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { filterConfig } from './CustomersFilterConfig'
import { Loader } from '@/components/common/Loader'

interface CustomerFilterProps {
  isLoading: boolean
  setIsFilterResult: (value: boolean) => void
  onFilterCustomers: (filters: any) => void
  currentFilters: any
  setCurrentFilters: (filters: any) => void
  handleSegmentCreationSuccess: () => void
}

export function CustomerFilter({
  isLoading,
  setIsFilterResult,
  onFilterCustomers,
  currentFilters,
  setCurrentFilters,
  handleSegmentCreationSuccess
}: CustomerFilterProps) {
  const [filters, setFilters] = useState(currentFilters)

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleApplyFilter = async () => {
    setIsFilterResult(true)
    setCurrentFilters(filters)
    await onFilterCustomers(filters)
  }

  const handleClearFilter = () => {
    setFilters({})
    setCurrentFilters({})
    setIsFilterResult(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Card className="mb-6">
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(filterConfig).map(([key, config]: [string, any]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">{config.label}</label>
              {config.type === 'select' ? (
                <Select
                  value={filters[key] || ''}
                  onValueChange={(value) => handleFilterChange(key, value)}
                >
                  <option value="">Select {config.label}</option>
                  {config.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={config.type}
                  value={filters[key] || ''}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  placeholder={`Enter ${config.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handleClearFilter}>
            Clear
          </Button>
          <Button onClick={handleApplyFilter}>Apply Filters</Button>
        </div>
      </CardBody>
    </Card>
  )
} 