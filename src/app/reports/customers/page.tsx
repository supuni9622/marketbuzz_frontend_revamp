'use client'

import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, subMonths, startOfMonth, endOfMonth } from 'date-fns'
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
  Bar,
  ComposedChart
} from 'recharts'
import { useCustomerAnalytics } from '@/contexts/AnalyticsDataContext'
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
  { value: DateBucketEnum.QUARTER, label: 'Quaters' },
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

export default function CustomersReportPage() {
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
    newCustomerCount,
    repeatCustomerCount,
    visitFrequency,
    customersBucket,
    repeatCustomersBucket,
    isLoading
  } = useCustomerAnalytics(queryObj, dateRangeQueryObj)

  const chartData = React.useMemo(() => {
    // Generate default data if no date range
    if (!date?.from || !date?.to) {
      const today = moment();
      return Array(7).fill(0).map((_, i) => ({
        date: today.clone().subtract(i, 'days').format('YYYY-MM-DD'),
        newCustomers: 0,
        repeatCustomers: 0
      })).reverse();
    }

    const dates: string[] = [];
    const start = moment(date.from);
    const end = moment(date.to);
    let current = start.clone();

    // First generate all dates in the range
    if (timeRange === DateBucketEnum.QUARTER) {
      const startQ = moment(date.from).startOf('quarter');
      const endQ = moment(date.to).endOf('quarter');
      let currentQ = startQ.clone();

      while (currentQ.isSameOrBefore(endQ)) {
        dates.push(currentQ.format('YYYY-[Q]Q'));
        currentQ.add(1, 'quarters');
      }
    } else {
      while (current.isSameOrBefore(end)) {
        let dateKey: string;
        switch (timeRange) {
          case DateBucketEnum.DAY:
            dateKey = current.format('YYYY-MM-DD');
            current.add(1, 'days');
            break;
          case DateBucketEnum.WEEK:
            dateKey = current.startOf('isoWeek').format('YYYY-MM-DD');
            current.add(1, 'weeks');
            break;
          case DateBucketEnum.MONTH:
            dateKey = current.format('YYYY-MM');
            current.add(1, 'months');
            break;
          case DateBucketEnum.YEAR:
            dateKey = current.format('YYYY');
            current.add(1, 'years');
            break;
          default:
            dateKey = current.format('YYYY-MM-DD');
            current.add(1, 'days');
        }
        dates.push(dateKey);
      }
    }

    // Ensure we have at least one date
    if (dates.length === 0) {
      dates.push(moment(date.from).format('YYYY-MM-DD'));
    }

    // Create data maps with default zero values for all dates
    const dataMap = new Map(dates.map(date => [date, {
      date,
      newCustomers: 0,
      repeatCustomers: 0
    }]));

    // Update with actual data if available
    if (customersBucket?.length) {
      customersBucket.forEach((item: any) => {
        const key = item.dateBucketKey;
        const existing = dataMap.get(key);
        if (existing) {
          existing.newCustomers = item.customerCount || 0;
        }
      });
    }

    if (repeatCustomersBucket?.length) {
      repeatCustomersBucket.forEach((item: any) => {
        const key = item.dateBucketKey;
        const existing = dataMap.get(key);
        if (existing) {
          existing.repeatCustomers = item.customerCount || 0;
        }
      });
    }

    // Convert map to array and ensure it's sorted by date
    const result = Array.from(dataMap.values()).sort((a, b) => {
      if (timeRange === DateBucketEnum.QUARTER) {
        return moment(a.date, 'YYYY-[Q]Q').valueOf() - moment(b.date, 'YYYY-[Q]Q').valueOf();
      }
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    });

    console.log('Chart Data:', result); // Debug log
    return result;
  }, [customersBucket, repeatCustomersBucket, date, timeRange]);

  // Update Y-axis domain based on actual data
  const maxValue = React.useMemo(() => {
    if (!chartData?.length) return 1;
    const max = Math.max(
      ...chartData.map(d => Math.max(d.newCustomers, d.repeatCustomers))
    );
    return max === 0 ? 1 : max;
  }, [chartData]);

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
            <h3 className="text-lg font-medium">Total Customers</h3>
            <span className="text-sm">(All Time)</span>
          </div>
          <div className="text-4xl font-bold">{newCustomerCount + repeatCustomerCount}</div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Average Visit Frequency</h3>
            <span className="text-sm">(All Time)</span>
          </div>
          <div className="text-4xl font-bold">{visitFrequency.toFixed(2)}</div>
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

      {/* Customer Summary */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Customer Summary</h3>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">New Customers</div>
            <div className="text-2xl font-semibold">{newCustomerCount}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Repeat Customers</div>
            <div className="text-2xl font-semibold">{repeatCustomerCount}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Average Visit Frequency</div>
            <div className="text-2xl font-semibold">{visitFrequency.toFixed(2)}</div>
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
          <div className="mt-12 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                <YAxis 
                  yAxisId="left" 
                  orientation="left"
                  tickCount={3}
                  domain={[0, maxValue]}
                  allowDecimals={false}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tickCount={3}
                  domain={[0, maxValue]}
                  allowDecimals={false}
                />
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
                <Bar
                  yAxisId="left"
                  dataKey="newCustomers"
                  name="New Customers"
                  fill="#2563EB"
                  barSize={20}
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="repeatCustomers"
                  name="Repeat Customers"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  dot={{ fill: '#9CA3AF', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 