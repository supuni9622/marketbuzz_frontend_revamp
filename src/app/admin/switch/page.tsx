'use client'

import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getConfigurationData, searchOragnizations, filterOragnizations } from '@/services'
import { AdvanceSearchOption } from '@/components/admin/AdvanceSearchOption'
import { FilterDropdown } from '@/components/admin/FilterDropdown'
import { OrganizationsTable } from '@/components/admin/OrganizationsTable'
import { TOrganizationModelJSON } from '@shoutout-labs/market_buzz_crm_types'

export default function SwitchAccountPage() {
  const [isSearchResult, setIsSearchResult] = useState(false)
  const [organizationSearchData, setOrganizationSearchData] = useState<TOrganizationModelJSON[]>([])
  const [limit] = useState<number>(10)
  const [skip] = useState<number>(0)
  const [selectedApplication, setSelectedApplication] = useState("")
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("")

  const { data: configData, isLoading } = useQuery({
    queryKey: ['config'],
    queryFn: getConfigurationData
  })

  const searchOrganizations = async (query: string) => {
    const queryObj = {
      limit,
      skip,
      query: query
    }

    const res = await searchOragnizations(queryObj)
    setIsSearchResult(true)
    setOrganizationSearchData(res.items)
    return res.items
  }

  const onSelectApplication = async (applicationId: string, applicationName: string) => {
    setSelectedApplication(applicationId)
    setSelectedDropdownValue(applicationName)

    const queryObj = {
      limit,
      skip,
      query: applicationId
    }

    const res = await filterOragnizations(queryObj)
    setIsSearchResult(true)
    setOrganizationSearchData(res.items)
  }

  const dropdownItems = useMemo(() => {
    return Object.entries(configData?.clover?.apps || {}).map(([id, app]) => ({
      id,
      name: app.appName
    }))
  }, [configData?.clover?.apps])

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Switch account</h1>
        
        <div className="flex justify-between items-center mb-6">
          <AdvanceSearchOption handleSearch={searchOrganizations} />
          <FilterDropdown
            items={dropdownItems}
            onSelect={(id, name) => onSelectApplication(id, name)}
            title="Select Application"
            selectedValue={selectedDropdownValue}
          />
        </div>

        <OrganizationsTable
          searchResults={organizationSearchData as []}
          isSearchResult={isSearchResult}
        />
      </div>
    </div>
  )
} 