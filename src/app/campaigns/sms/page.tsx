'use client'

import React from 'react'
import { X } from 'lucide-react'

interface CampaignTemplate {
  id: string
  title: string
  messageText: string
  isNew?: boolean
  noCustomers: number
  estimatedCost: number
  buzzCredits: number
}

const campaignTemplates: CampaignTemplate[] = [
  {
    id: 'birthday-greetings',
    title: 'BIRTHDAY GREETINGS',
    messageText: 'Happy Birthday! Enjoy [Discount] off your next purchase. Have a wonderful year ahead!',
    isNew: true,
    noCustomers: 0,
    estimatedCost: 0,
    buzzCredits: 0
  },
  {
    id: 'first-purchase',
    title: 'FIRST PURCHASE',
    messageText: 'Welcome to our store! Use code [FirstTime] for 10% off your first purchase.',
    isNew: true,
    noCustomers: 0,
    estimatedCost: 0,
    buzzCredits: 0
  }
]

export default function SMSCampaignsPage() {
  const [activeTab, setActiveTab] = React.useState('Campaign Ideas')
  const [showBanner, setShowBanner] = React.useState(true)

  return (
    <div className="p-6 space-y-6">
      {/* Alert Banner */}
      {showBanner && (
        <div className="bg-[#FFF9E7] border border-[#FFE5A0] p-4 rounded-lg flex items-center justify-between">
          <p className="text-sm text-[#B59E41]">
            SMS campaigns can only be sent to customers who have provided a mobile number and opted in for marketing. Those without this information will not receive SMS.
          </p>
          <button 
            onClick={() => setShowBanner(false)}
            className="text-[#B59E41] hover:text-[#8A7831] ml-4 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Create Campaign Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center">
          + Create New Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {['Campaign Ideas', 'Campaign History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Templates */}
      <div className="space-y-4">
        {campaignTemplates.map((template) => (
          <div key={template.id} className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium">{template.title}</h3>
                {template.isNew && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Text
                </label>
                <p className="text-sm text-gray-600">{template.messageText}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Customers
                </label>
                <p className="text-sm text-gray-900">{template.noCustomers}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Cost
                </label>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">
                    {template.buzzCredits} Buzz Credit/s
                  </p>
                  <p className="text-sm text-gray-900">
                    ${template.estimatedCost.toFixed(3)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Setup Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 