'use client'

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Utility } from "@/utility/Utility";
import numeral from "numeral";
import { CustomerDetailsPanel } from '@/components/customers/CustomerDetailsPanel';
import { TCustomerModelJSON, TCustomerFilterRequest, TCustomerFilterCountRequest } from '@shoutout-labs/market_buzz_crm_types';
import { CustomerFilter } from '@/components/customers/CustomerFilter';
import { CustomerDataProvider, useCustomerData } from '@/contexts/CustomerDataContext';
import { filterConfig } from '@/components/customers/CustomersFilterConfig';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from '@tanstack/react-query'
import { getSegments, getCustomersCount } from '@/services'
import { PreDefinedSegments } from '@/app/campaigns/sms/Constants'
import { Loader } from '@/components/common/Loader'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CustomerTable } from '@/components/customers/CustomerTable'

interface Segment {
  id: string
  name: string
  description?: string
  filter: any // Replace with proper filter type if available
}

interface SegmentCount {
  id: string
  count: number
}

interface ExtendedCustomerFilterRequest extends TCustomerFilterRequest {
  filter?: Record<string, any>;
}

function CustomersContent() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<TCustomerModelJSON | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterResult, setIsFilterResult] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  const {
    customers,
    isLoadingCustomers,
    refetchCustomersData,
    isFetchingCustomersData,
    customersCount,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    setFilterQuery
  } = useCustomerData();

  const { data: segments, isLoading: isLoadingSegments } = useQuery<Segment[]>({
    queryKey: ['segments'],
    queryFn: async () => {
      const response = await getSegments({ limit: 100, skip: 0 })
      return response.items
    }
  })

  const { data: segmentCounts } = useQuery<SegmentCount[]>({
    queryKey: ['segment-counts'],
    queryFn: async () => {
      const counts = await Promise.all(
        PreDefinedSegments.map(async (segment) => {
          const filterObj = getSegmentFilter(segment.id)
          const response = await getCustomersCount({
            isRequiredPhoneNumber: segment.id === 'reachable',
            hasTransactions: segment.id === 'first-time',
            ...filterObj
          })
          return { id: segment.id, count: response.count }
        })
      )
      return counts
    }
  })

  // Function to get filter based on segment
  const getSegmentFilter = (segmentId: string) => {
    switch (segmentId) {
      case 'reachable':
        return { phoneNumber: { $exists: true, $ne: null } }
      case 'first-time':
        return { totalTransactionsCount: 1 }
      case 'inactive':
        return {
          lastPurchaseDate: {
            $lt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      default:
        // For custom segments, get filter from segments data
        const customSegment = segments?.find(s => s.id === segmentId)
        return customSegment?.filter || {}
    }
  }

  // Update useEffect to set initial filter based on active tab
  React.useEffect(() => {
    if (activeTab !== 'all') {
      const filterObj = getSegmentFilter(activeTab)
      setFilterQuery(filterObj)
    } else {
      setFilterQuery(null)
    }
    setCurrentPage(1)
  }, [activeTab])

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchCustomersData();
    setIsRefreshing(false);
  };

  // Update search handler to use direct state update
  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setSearchQuery(value);
  };

  // Update filter handler
  const onFilterCustomers = async (filters: any) => {
    const filterObj = Utility.getMongoDBQuery(filters, filterConfig);
    setCurrentPage(1);
    setFilterQuery(filterObj);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilterQuery(null);
    setCurrentFilters({});
    setIsFilterResult(false);
    setShowFilters(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    handleClearFilters()
  }

  const totalPages = Math.ceil(customersCount / 10)
  const showEllipsis = totalPages > 7

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    return pages
  }

  if (isLoadingSegments) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <div className="flex items-center space-x-4 border-b">
        <button
          onClick={() => handleTabChange('all')}
          className={cn(
            'pb-4 text-sm font-medium transition-colors hover:text-primary',
            activeTab === 'all'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          )}
        >
          All Customers
          <Badge variant="secondary" className="ml-2">
            {customersCount}
          </Badge>
        </button>

        {PreDefinedSegments.map((segment: Segment) => {
          const count = segmentCounts?.find(c => c.id === segment.id)?.count || 0
          return (
            <button
              key={segment.id}
              onClick={() => handleTabChange(segment.id)}
              className={cn(
                'pb-4 text-sm font-medium transition-colors hover:text-primary',
                activeTab === segment.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {segment.name}
              <Badge variant="secondary" className="ml-2">
                {count}
              </Badge>
            </button>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-sm font-medium">
              + More Segments
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {segments?.map((segment: Segment) => (
              <DropdownMenuItem
                key={segment.id}
                onClick={() => handleTabChange(segment.id)}
              >
                {segment.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Segment Description */}
      {activeTab !== 'all' && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">
            {PreDefinedSegments.find((s: Segment) => s.id === activeTab)?.name || 
             segments?.find((s: Segment) => s.id === activeTab)?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {PreDefinedSegments.find((s: Segment) => s.id === activeTab)?.description || 
             segments?.find((s: Segment) => s.id === activeTab)?.description}
          </p>
        </div>
      )}

      {/* Filters and Table */}
      <div className="space-y-4">
        {activeTab === 'all' && (
          <>
            <div className="flex justify-between items-center">
              <div className="relative w-[300px]">
                <Input
                  type="search"
                  placeholder="Search customers..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex gap-2">
                {isFilterResult && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="text-red-500 hover:text-red-600 border-red-200"
                  >
                    Clear Filters
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Filter Customers'}
                </Button>
              </div>
            </div>

            {showFilters && (
              <CustomerFilter
                isLoading={isLoadingCustomers}
                setIsFilterResult={setIsFilterResult}
                onFilterCustomers={onFilterCustomers}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
                handleSegmentCreationSuccess={refetchCustomersData}
              />
            )}
          </>
        )}

        <CustomerTable data={customers} />

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => setCurrentPage(Number(page))}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Customer Details Side Panel */}
      {selectedCustomer && (
        <CustomerDetailsPanel
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

export default function CustomersPage() {
  return (
    <CustomerDataProvider>
      <CustomersContent />
    </CustomerDataProvider>
  );
} 