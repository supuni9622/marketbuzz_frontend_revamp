'use client'

import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOragnizations, getConfigurationData} from '@/services'
import { Pagination } from '@/components/common/Pagination';
import AdminAuthService from '@/services/AdminService';

interface OrganizationsTableProps {
  searchResults: []
  isSearchResult: boolean
}

export function OrganizationsTable({ searchResults, isSearchResult }: OrganizationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  const [skip, setSkip] = useState(0)

  const { data: organizationsData, isLoading: isOrgsLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOragnizations
  })

  const { data: configData, isLoading: isConfigLoading } = useQuery({
    queryKey: ['config'],
    queryFn: getConfigurationData
  })

  const switchOrganization = useMutation({
    mutationFn: (selectedOrganizationId: string) => {
      return AdminAuthService.impersonate(selectedOrganizationId)
    },
    onSuccess(data) {
      window.open(data.url, '_blank')
    }
  })

  const handleSwitch = (event: React.MouseEvent<HTMLTableRowElement>) => {
    const selectedOrganizationId = event.currentTarget.getAttribute('data-id')
    if (selectedOrganizationId) {
      switchOrganization.mutate(selectedOrganizationId)
    }
  }

  const displayedOrganizations = useMemo(() => {
    return isSearchResult ? searchResults : organizationsData?.items || []
  }, [isSearchResult, searchResults, organizationsData])

  if (isOrgsLoading || isConfigLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of installation</TableHead>
              <TableHead>Customers Count</TableHead>
              <TableHead>Total Revenue</TableHead>
              <TableHead>Transaction Count</TableHead>
              <TableHead>Avg. Order Value</TableHead>
              <TableHead>Category of Business</TableHead>
              <TableHead>Application installed</TableHead>
              <TableHead>Credit Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrganizations.length > 0 && configData ? (
              displayedOrganizations.map((org) => (
                <TableRow
                  key={org.id}
                  onClick={handleSwitch}
                  data-id={org.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{moment(org?.createdOn).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{org?.totalCustomersCount || 0}</TableCell>
                  <TableCell>{org?.totalTransactionSum?.toFixed(2) || 0}</TableCell>
                  <TableCell>{org?.totalTransactionCount || 0}</TableCell>
                  <TableCell>
                    {(
                      Number(org?.totalTransactionSum) /
                      Number(org?.totalTransactionCount)
                    ).toFixed(2) || 0}
                  </TableCell>
                  <TableCell>{org?.type}</TableCell>
                  <TableCell>
                    {org?.appReferenceId && configData && configData.clover && configData.clover.apps[org.appReferenceId]?.appName}
                  </TableCell>
                  <TableCell>{org?.credits}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination
          dataCount={displayedOrganizations.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPageData={limit}
          setSkip={setSkip}
          loadCustomerData={getOragnizations}
        />
      </div>
    </div>
  )
} 