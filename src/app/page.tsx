'use client'

import React from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DateRange } from '@/types/enums'
import { getDateRange, extractNumericValueFromString } from '@/lib/utils/date'
import { SummaryCard } from '@/components/dashboard/SummaryCard'
import { useDashboardAnalytics } from '@/contexts/DashboardAnalyticsContext'
import { Loader } from '@/components/common/Loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<DateRange>(DateRange.LAST_28_DAYS);
  const [selectedRange, setSelectedRange] = React.useState<number>(28);
  const [queryParams, setQueryParams] = React.useState(() => {
    const dates = getDateRange(DateRange.LAST_28_DAYS);
    return {
      fromDate: dates.startDate,
      toDate: dates.endDate,
      compareFromDate: dates.compareStartDate,
      compareToDate: dates.compareEndDate
    };
  });

  const {
    sales,
    transactions,
    newCustomers,
    repeatCustomers,
    isLoading
  } = useDashboardAnalytics(queryParams, selectedFilter === DateRange.ALL_TIME);

  const handleFilterChange = (value: string) => {
    const filter = value as DateRange;
    setSelectedFilter(filter);

    if (filter === DateRange.ALL_TIME) {
      setQueryParams({
        fromDate: '',
        toDate: '',
        compareFromDate: '',
        compareToDate: ''
      });
      setSelectedRange(-1);
    } else {
      const selectedDateRange = getDateRange(filter);
      const numericValue = extractNumericValueFromString(filter);
      setQueryParams({
        fromDate: selectedDateRange.startDate,
        toDate: selectedDateRange.endDate,
        compareFromDate: selectedDateRange.compareStartDate,
        compareToDate: selectedDateRange.compareEndDate
      });
      setSelectedRange(numericValue);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-6">
      <Alert>
        <AlertDescription>
          Your dashboard highlights the past 3 months for streamlined, actionable insights.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end mb-6">
        <Select
          value={selectedFilter}
          onValueChange={handleFilterChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DateRange.TODAY}>{DateRange.TODAY}</SelectItem>
            <SelectItem value={DateRange.LAST_7_DAYS}>{DateRange.LAST_7_DAYS}</SelectItem>
            <SelectItem value={DateRange.LAST_28_DAYS}>{DateRange.LAST_28_DAYS}</SelectItem>
            <SelectItem value={DateRange.LAST_90_DAYS}>{DateRange.LAST_90_DAYS}</SelectItem>
            <SelectItem value={DateRange.LAST_365_DAYS}>{DateRange.LAST_365_DAYS}</SelectItem>
            <SelectItem value={DateRange.ALL_TIME}>{DateRange.ALL_TIME}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          title="New Customers"
          id="new_customers"
          count={newCustomers?.count || 0}
          percentageValue={newCustomers?.comparisonPercentage || 0}
          dateRange={selectedRange}
          isAllowDecimal={true}
        />
        <SummaryCard
          title="Sales"
          id="sales"
          count={sales?.sum || 0}
          percentageValue={sales?.comparisonPercentage || 0}
          dateRange={selectedRange}
          isAllowDecimal={true}
        />
        <SummaryCard
          title="Return Customers"
          id="return_customers"
          count={repeatCustomers?.count || 0}
          percentageValue={repeatCustomers?.comparisonPercentage || 0}
          dateRange={selectedRange}
          isAllowDecimal={true}
        />
        <SummaryCard
          title="Transaction Count"
          id="transactions"
          count={transactions?.count || 0}
          percentageValue={transactions?.comparisonPercentage || 0}
          dateRange={selectedRange}
          isAllowDecimal={true}
        />
      </div>
    </div>
  );
}
