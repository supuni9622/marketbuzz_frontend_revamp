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
import { Card } from '@/components/ui/card'

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
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <Builder {...props} className="p-4" />
      </div>
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
    <Card className="p-4 space-y-4">
      <div className="space-y-4">
        <Query
          {...filterConfig}
          value={tree}
          onChange={onChange}
          renderBuilder={renderBuilder}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isLoading}
        >
          Clear
        </Button>
        <Button
          onClick={handleFilter}
          disabled={isLoading}
        >
          Apply Filter
        </Button>
      </div>
    </Card>
  )
} 