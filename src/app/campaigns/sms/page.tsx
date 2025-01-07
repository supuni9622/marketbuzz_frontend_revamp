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

interface CampaignHistory {
  name: string
  messageText: string
  sentDateTime: string
  status: 'ACTIVE' | 'INACTIVE'
  noCustomers: number
  credits: number
  processedCount: number
  sentCount: number
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

const campaignHistory: CampaignHistory[] = [
  {
    name: 'FIRST PURCHASE',
    messageText: 'Thank you for shopping with us! We hope you love your purchase. Stay tuned for more exciting...',
    sentDateTime: 'January 2, 2025 2:17:36 PM',
    status: 'ACTIVE',
    noCustomers: 0,
    credits: 0,
    processedCount: 0,
    sentCount: 0
  },
  {
    name: 'BIRTHDAY GREETINGS',
    messageText: 'Happy Birthday! Enjoy 10% off your next purchase. Have a wonderful year ahead!',
    sentDateTime: 'December 30, 2024 6:36:40 PM',
    status: 'INACTIVE',
    noCustomers: 0,
    credits: 0,
    processedCount: 0,
    sentCount: 0
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

      {/* Content based on active tab */}
      {activeTab === 'Campaign Ideas' ? (
        /* Campaign Templates */
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
      ) : (
        /* Campaign History Table */
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message Text
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Customers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processed Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaignHistory.map((campaign, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-md">
                      {campaign.messageText}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sentDateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.noCustomers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.processedCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sentCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 