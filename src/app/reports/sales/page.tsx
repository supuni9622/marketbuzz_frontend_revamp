'use client'

import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useSalesAnalytics } from '@/contexts/SalesAnalyticsContext'
import { Loader } from '@/components/common/Loader'
import moment from 'moment'

enum DateBucketEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year'
}

const timeRangeOptions = [
  { value: DateBucketEnum.DAY, label: 'Daily' },
  { value: DateBucketEnum.WEEK, label: 'Weekly' },
  { value: DateBucketEnum.MONTH, label: 'Monthly' },
  { value: DateBucketEnum.QUARTER, label: 'Quarters' },
  { value: DateBucketEnum.YEAR, label: 'Yearly' },
]

const quickSelectOptions = [
  { 
    label: 'Today',
    getValue: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date())
    })
  },
  { 
    label: 'Yesterday',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1))
    })
  },
  { 
    label: 'This Week',
    getValue: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date())
    })
  },
  { 
    label: 'Last Week',
    getValue: () => ({
      from: startOfWeek(subDays(new Date(), 7)),
      to: endOfWeek(subDays(new Date(), 7))
    })
  },
  { 
    label: 'This Month',
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  { 
    label: 'Last Month',
    getValue: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1))
    })
  }
]

export default function SalesReportPage() {
  const [timeRange, setTimeRange] = React.useState(DateBucketEnum.WEEK)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subMonths(startOfDay(new Date()), 1),
    to: endOfDay(new Date())
  })

  const queryObj = React.useMemo(() => ({
    fromDate: date?.from ? format(date.from, 'yyyy-MM-dd') : '',
    toDate: date?.to ? format(date.to, 'yyyy-MM-dd') : '',
    bucketBy: timeRange
  }), [date, timeRange])

  const dateRangeQueryObj = React.useMemo(() => ({
    fromDate: date?.from ? format(date.from, 'yyyy-MM-dd') : '',
    toDate: date?.to ? format(date.to, 'yyyy-MM-dd') : ''
  }), [date])

  const {
    totalSales,
    totalTransactions,
    totalSalesComparison,
    totalTransactionsComparison,
    periodSales,
    periodSalesComparison,
    periodTransactions,
    averageSales,
    salesBucket,
    isLoading
  } = useSalesAnalytics(queryObj, dateRangeQueryObj)

  const chartData = React.useMemo(() => {
    if (!date?.from || !salesBucket) return [];

    // Get all dates between start and end
    const dates = [];
    const currentDate = moment(date.from);
    const endDate = moment(date.to);

    while (currentDate.isSameOrBefore(endDate)) {
      if (timeRange === DateBucketEnum.QUARTER) {
        dates.push(`${currentDate.format('YYYY')}-Q${currentDate.quarter()}`);
        currentDate.add(1, 'quarter');
      } else if (timeRange === DateBucketEnum.MONTH) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'month');
      } else if (timeRange === DateBucketEnum.WEEK) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'week');
      } else if (timeRange === DateBucketEnum.YEAR) {
        dates.push(currentDate.format('YYYY'));
        currentDate.add(1, 'year');
      } else {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');
      }
    }

    // Ensure we have at least one date
    if (dates.length === 0) {
      dates.push(moment(date.from).format('YYYY-MM-DD'));
    }

    // Create data map with default zero values for all dates
    const dataMap = new Map(dates.map(date => [date, {
      date,
      amount: 0,
      transactions: 0
    }]));

    // Update with actual data if available
    if (salesBucket?.length) {
      salesBucket.forEach((item) => {
        const key = item.dateBucketKey;
        const existing = dataMap.get(key);
        if (existing) {
          existing.amount = item.totalAmount || 0;
          existing.transactions = item.transactionCount || 0;
        }
      });
    }

    // Convert map to array and ensure it's sorted by date
    return Array.from(dataMap.values()).sort((a, b) => {
      if (timeRange === DateBucketEnum.QUARTER) {
        return moment(a.date, 'YYYY-[Q]Q').valueOf() - moment(b.date, 'YYYY-[Q]Q').valueOf();
      }
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    });
  }, [salesBucket, date, timeRange]);

  const handleQuickSelect = (option: typeof quickSelectOptions[0]) => {
    const newDate = option.getValue()
    setDate(newDate)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-600 text-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Total Sales</h3>
            <span className="text-sm">(All Time)</span>
          </div>
          <div className="text-4xl font-bold">${totalSales.toFixed(2)}</div>
          <div className="mt-2 text-sm">
            {totalSalesComparison > 0 ? '+' : ''}{totalSalesComparison.toFixed(1)}% vs previous period
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Total Transaction Count</h3>
            <span className="text-sm">(All Time)</span>
          </div>
          <div className="text-4xl font-bold">{totalTransactions}</div>
          <div className="mt-2 text-sm">
            {totalTransactionsComparison > 0 ? '+' : ''}{totalTransactionsComparison.toFixed(1)}% vs previous period
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center bg-white border rounded-lg px-4 py-2">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd yyyy")} - {format(date.to, "LLL dd yyyy")}
                    </>
                  ) : (
                    format(date.from, "LLL dd yyyy")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className="p-3"
            />
            <div className="border-t p-3">
              <div className="space-y-2">
                {quickSelectOptions.map((option) => (
                  <button
                    key={option.label}
                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md"
                    onClick={() => handleQuickSelect(option)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {date?.from && date?.to && (
          <div className="text-blue-600">
            Processed Between {format(date.from, "yyyy-MM-dd")} to {format(date.to, "yyyy-MM-dd")}
          </div>
        )}
      </div>

      {/* Sales Summary */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Sales Summary</h3>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Period Sales</div>
            <div className="text-2xl font-semibold">$ {periodSales.toFixed(2)}</div>
            <div className="mt-1 text-sm text-gray-500">
              {periodSalesComparison > 0 ? '+' : ''}{periodSalesComparison.toFixed(1)}% vs previous period
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Period Transactions</div>
            <div className="text-2xl font-semibold">{periodTransactions}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Avg. Transaction Amount</div>
            <div className="text-2xl font-semibold">$ {averageSales.toFixed(2)}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-[400px]">
          <div className="absolute top-0 right-0 z-10">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as DateBucketEnum)}
              className="border rounded-md px-3 py-1.5 text-sm bg-white cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date: string) => {
                  if (timeRange === DateBucketEnum.QUARTER) {
                    return date;
                  }
                  if (timeRange === DateBucketEnum.MONTH) {
                    return moment(date).format('MMM YY');
                  }
                  if (timeRange === DateBucketEnum.YEAR) {
                    return date;
                  }
                  return moment(date).format('MM/DD');
                }}
              />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                labelFormatter={(date: string) => {
                  if (timeRange === DateBucketEnum.QUARTER) {
                    return date;
                  }
                  if (timeRange === DateBucketEnum.MONTH) {
                    return moment(date).format('MMMM YYYY');
                  }
                  if (timeRange === DateBucketEnum.YEAR) {
                    return date;
                  }
                  return moment(date).format('MMM DD, YYYY');
                }}
                formatter={(value: number) => value}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="amount"
                name="Sales Amount"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: '#2563EB', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="transactions"
                name="Transactions"
                stroke="#9CA3AF"
                strokeWidth={2}
                dot={{ fill: '#9CA3AF', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 