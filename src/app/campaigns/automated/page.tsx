'use client'

import React from 'react'
import { Gift, ShoppingBag } from 'lucide-react'

interface AutomatedCampaign {
  name: string
  type: 'SMS'
  message: string
  triggered: number
  sent: number
  isActive: boolean
}

interface Template {
  id: string
  name: string
  message: string
  channel: 'SMS'
  icon: React.ReactNode
}

const campaigns: AutomatedCampaign[] = [
  {
    name: 'SECRET SANTA CAMPAIGN',
    type: 'SMS',
    message: 'Secret Santa Alert! Unwrap surprises with every purchase over 1000',
    triggered: 3,
    sent: 0,
    isActive: false
  },
  {
    name: 'BIRTHDAY GREETINGS',
    type: 'SMS',
    message: 'Happy Birthday! Enjoy 3% off your next purchase. Have a wonderful year ahead!',
    triggered: 0,
    sent: 0,
    isActive: true
  }
]

const templates: Template[] = [
  {
    id: '1',
    name: 'BIRTHDAY GREETINGS',
    message: 'Happy Birthday! Enjoy [Discount] off your next purchase. Have a wonderful year ahead!',
    channel: 'SMS',
    icon: <Gift className="h-5 w-5 text-gray-500" />
  },
  {
    id: '2',
    name: 'FIRST PURCHASE',
    message: 'Thank you for shopping with us! We hope you love your purchase. Stay tuned for more exciting deals!',
    channel: 'SMS',
    icon: <ShoppingBag className="h-5 w-5 text-gray-500" />
  }
]

export default function AutomatedCampaignsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
      </div>

      <div className="space-y-4 mb-8">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-[2fr,1fr,1fr,2fr] gap-4 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium">{campaign.name}</h3>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    {campaign.type}
                  </span>
                </div>
                <p className="text-gray-600">{campaign.message}</p>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-1">Triggered</div>
                <div className="text-lg font-medium">{campaign.triggered}</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-1">Sent</div>
                <div className="text-lg font-medium">{campaign.sent}</div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={campaign.isActive}
                      className="sr-only peer"
                      onChange={() => {}}
                    />
                    <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${campaign.isActive ? 'peer-checked:bg-blue-600' : ''}`}></div>
                  </label>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {campaign.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                  Edit Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Templates</h2>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {template.icon}
                    <h3 className="text-lg font-medium">{template.name}</h3>
                  </div>
                  <p className="text-gray-600">{template.message}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700">Channel</div>
                  <div className="text-gray-600">{template.channel}</div>
                </div>

                <div className="flex justify-end">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                    Enable Campaign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 