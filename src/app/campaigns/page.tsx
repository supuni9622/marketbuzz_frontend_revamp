'use client'

import React from 'react'
import { Plus, Calendar, BarChart2 } from 'lucide-react'

export default function CampaignsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="col-span-full">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Active Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((campaign) => (
              <div key={campaign} className="rounded-lg border bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Ends in 5 days</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Summer Sale 2024</h3>
                <p className="text-sm text-gray-500 mb-4">Seasonal promotion for summer products with up to 50% discount.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">4.2k impressions</span>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draft Campaigns */}
        <div className="col-span-full">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Draft Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((campaign) => (
              <div key={campaign} className="rounded-lg border bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    Draft
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Back to School</h3>
                <p className="text-sm text-gray-500 mb-4">Special offers for students and teachers.</p>
                <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Continue Editing
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 