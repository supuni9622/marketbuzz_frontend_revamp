'use client'

import React, { useState } from 'react';
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
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types';
import { CustomerFilter } from '@/components/customers/CustomerFilter';
import { CustomerDataProvider, useCustomerData } from '@/contexts/CustomerDataContext';
import { filterConfig } from '@/components/customers/CustomersFilterConfig';

function CustomersContent() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState('All Customers');
  const [selectedCustomer, setSelectedCustomer] = useState<TCustomerModelJSON | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterResult, setIsFilterResult] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const {
    customers,
    isLoadingCustomers,
    refetchCustomersData,
    isFetchingCustomersData,
    customersCount
  } = useCustomerData();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchCustomersData();
    setIsRefreshing(false);
  };

  const segments = [
    { name: 'All Customers', count: 12 },
    { name: 'Reachable Customers', count: 6 },
    { name: 'First Time Customers', count: 2 },
    { name: 'Inactive Customers', count: 1 }
  ];

  const moreSegments = [
    { value: 'visits=2', label: 'visits=2' },
    { value: 'visits=1', label: 'visits=1' },
    { value: 'test-group', label: 'Test group' },
    { value: 'last-activity-6-months', label: 'Last activity 6 months' },
    { value: 'visits2', label: 'Visits2' },
    { value: 'pradeep', label: 'Pradeep' },
    { value: 'fv-customers', label: 'FV Customers' },
    { value: 'anjali-test-now', label: 'Anjali Test Now' },
    { value: 'anja', label: 'Anja' },
    { value: 'anj-test', label: 'Anj Test' },
    { value: 'no-visits', label: 'No visits' },
    { value: 'not-anjali', label: 'Not Anjali' },
    { value: 'not-madura', label: 'Not Madura' },
    { value: 'thamindu', label: 'Thamindu' },
    { value: 'apeksha', label: 'Apeksha' }
  ];

  const onFilterCustomers = async (filters: any) => {
    const customerFilters = Utility.getMongoDBQuery(filters, filterConfig);
    // Handle filter logic here
    console.log('Filtering with:', customerFilters);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4">
        {segments.map((segment) => (
          <button
            key={segment.name}
            onClick={() => setActiveSegment(segment.name)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              activeSegment === segment.name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {segment.name} <span className="ml-2 text-xs">{segment.count}</span>
          </button>
        ))}
        <Select>
          <SelectTrigger className="w-[180px] bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
            <SelectValue placeholder="+ More Segments" />
          </SelectTrigger>
          <SelectContent>
            {moreSegments.map((segment) => (
              <SelectItem key={segment.value} value={segment.value}>
                {segment.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-1/3">
          {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isRefreshing || isFetchingCustomersData}>
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Filter Customers'}
        </Button>
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

     

      {/* Customers Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Avg. Spend</th>
              <th className="px-6 py-3">Visits</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoadingCustomers ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">Loading customers...</td>
              </tr>
            ) : customers?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">No customers found.</td>
              </tr>
            ) : (
              customers?.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <td className="px-6 py-4">{customer.firstName}</td>
                  <td className="px-6 py-4">{customer.lastName}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phoneNumber}</td>
                  <td className="px-6 py-4">${numeral(
                        Utility.getAvgSpend(
                          customer.totalTransactionsCount || 1,
                          customer.totalTransactionsSum || 0
                        )
                      ).format("0.00")}</td>
                  <td className="px-6 py-4">{customer.totalTransactionsCount || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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