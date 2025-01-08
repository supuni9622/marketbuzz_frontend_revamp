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

interface CustomerData {
  date: string
  newCustomers: number
  repeatCustomers: number
}

const data: CustomerData[] = [
  { date: '2024-12-02', newCustomers: 0, repeatCustomers: 0 },
  { date: '2024-12-09', newCustomers: 0, repeatCustomers: 0 },
  { date: '2024-12-16', newCustomers: 0, repeatCustomers: 0 },
  { date: '2024-12-23', newCustomers: 0, repeatCustomers: 0 },
  { date: '2024-12-30', newCustomers: 0, repeatCustomers: 0 },
  { date: '2025-01-06', newCustomers: 0, repeatCustomers: 0 },
]

const timeRangeOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quaters', label: 'Quaters' },
  { value: 'yearly', label: 'Yearly' },
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
  const [timeRange, setTimeRange] = React.useState('weekly')
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(subMonths(new Date(), 1)),
    to: endOfMonth(subMonths(new Date(), 1))
  })

  const handleQuickSelect = (option: typeof quickSelectOptions[0]) => {
    const newDate = option.getValue()
    setDate(newDate)
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
          <div className="text-4xl font-bold">9</div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Average Visit Frequency</h3>
            <span className="text-sm">(All Time)</span>
          </div>
          <div className="text-4xl font-bold">0.00</div>
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
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Repeat Customers</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Average Visit Frequency</div>
            <div className="text-2xl font-semibold">0.00</div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-[400px]">
          <div className="absolute top-0 right-0 z-10">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm bg-white cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date: string) => new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="newCustomers"
                  name="New Customers"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 4 }}
                  activeDot={{ r: 6 }}
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 