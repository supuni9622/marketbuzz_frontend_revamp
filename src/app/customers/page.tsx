'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCustomers } from '@/contexts/CustomerDataContext';
import { RefreshCw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState('All Customers');

  const { customers, isLoadingCustomers, refetchCustomersData, isFetchingCustomersData } = useCustomers({
    skip: 0,
    limit: 10
  });

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
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          + More Segments
        </button>
      </div>

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
        <Button variant="outline">Filter Customers</Button>
      </div>

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
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{customer.firstName}</td>
                  <td className="px-6 py-4">{customer.lastName}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phoneNumber}</td>
                  <td className="px-6 py-4">${customer.avgSpend || '0.00'}</td>
                  <td className="px-6 py-4">{customer.visits || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 