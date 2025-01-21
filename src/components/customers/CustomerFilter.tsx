'use client'

import { useState, useCallback } from 'react'
import {
  Utils as QbUtils,
  ImmutableTree,
  Config,
  JsonGroup,
  BuilderProps
} from '@react-awesome-query-builder/core'
import {
  Query,
  Builder
} from '@react-awesome-query-builder/ui'
import { filterConfig } from './CustomersFilterConfig'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface CustomerFilterProps {
  isLoading: boolean
  setIsFilterResult: (value: boolean) => void
  onFilterCustomers: (filters: JsonGroup) => void
  currentFilters: { query?: JsonGroup }
  setCurrentFilters: (filters: { query?: JsonGroup }) => void
  handleSegmentCreationSuccess: () => void
}

const emptyQuery: JsonGroup = { 
  id: QbUtils.uuid(), 
  type: 'group',
  properties: {
    conjunction: 'AND',
    not: false
  },
  children1: {
    '0': {
      type: 'rule',
      properties: {
        field: null,
        operator: null,
        value: [],
        valueSrc: [],
        valueType: []
      }
    }
  }
}

export function CustomerFilter({
  isLoading,
  setIsFilterResult,
  onFilterCustomers,
  currentFilters,
  setCurrentFilters,
  handleSegmentCreationSuccess
}: CustomerFilterProps) {
  const [tree, setTree] = useState<ImmutableTree>(QbUtils.checkTree(
    QbUtils.loadTree(currentFilters.query || emptyQuery),
    filterConfig
  ))

  const onChange = useCallback((immutableTree: ImmutableTree, config: Config) => {
    setTree(immutableTree)
    const queryValue = QbUtils.getTree(immutableTree)
    setCurrentFilters({
      query: queryValue as JsonGroup
    })
  }, [setCurrentFilters])

  const renderBuilder = useCallback((props: BuilderProps) => (
    <div className="query-builder-container">
      <Builder {...props} />
    </div>
  ), [])

  const handleFilter = () => {
    const queryValue = QbUtils.getTree(tree) as JsonGroup
    if (queryValue.children1 && Object.keys(queryValue.children1).length > 0) {
      setIsFilterResult(true)
      onFilterCustomers(queryValue)
    }
  }

  const handleClear = () => {
    setTree(QbUtils.checkTree(
      QbUtils.loadTree(emptyQuery),
      filterConfig
    ))
    setCurrentFilters({})
    setIsFilterResult(false)
  }

  return (
    <div className="space-y-4">
      <div className="qb-lite">
        <Query
          {...filterConfig}
          value={tree}
          onChange={onChange}
          renderBuilder={renderBuilder}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isLoading}
          className="text-red-500 hover:text-red-600 border-red-200"
        >
          Clear Filter
        </Button>
        <Button
          onClick={handleFilter}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Apply Filter
        </Button>
      </div>
    </div>
  )
} 