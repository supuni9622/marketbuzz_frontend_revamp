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

  const { customers, isLoadingCustomers, refetchCustomersData, isFetchingCustomersData } = useCustomers({
    skip: 0,
    limit: 10
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchCustomersData();
    setIsRefreshing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing || isFetchingCustomersData}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>

      <Card>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Marketing Allowed</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingCustomers ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Loading customers...
                  </td>
                </tr>
              ) : customers?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers?.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="px-6 py-4">{customer.email}</td>
                    <td className="px-6 py-4">{customer.phoneNumber}</td>
                    <td className="px-6 py-4">
                      {customer.marketingAllowed ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 