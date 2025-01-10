'use client'

import React, { useState } from 'react'
import { X, RefreshCw } from 'lucide-react'
import { useCampaignTemplates, useCampaigns } from '@/contexts/CampaignDataContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { 
  CampaignModel,
  TemplateModel
} from '@/types/campaign'
import { format } from 'date-fns'

// Campaign status enum
export enum CampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export default function SMSCampaignsPage() {
  const [activeTab, setActiveTab] = useState('Campaign Ideas')
  const [showBanner, setShowBanner] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { 
    templates, 
    isLoadingTemplates, 
    refetchTemplates, 
    isFetchingTemplates,
    error: templatesError
  } = useCampaignTemplates()

  const {
    campaigns,
    isLoadingCampaigns,
    refetchCampaigns,
    isFetchingCampaigns,
    error: campaignsError
  } = useCampaigns()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (activeTab === 'Campaign Ideas') {
      await refetchTemplates()
    } else {
      await refetchCampaigns()
    }
    setIsRefreshing(false)
  }

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

      {/* Error Banner */}
      {(templatesError || campaignsError) && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center justify-between">
          <p className="text-sm text-red-800">
            {activeTab === 'Campaign Ideas' 
              ? 'Failed to load campaign templates. Please try refreshing the page.'
              : 'Failed to load campaigns. Please try refreshing the page.'
            }
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-red-800 hover:text-red-900"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Retry
          </Button>
        </div>
      )}

      {/* Create Campaign Button */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing || isFetchingTemplates || isFetchingCampaigns}
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-500">
          + Create New Campaign
        </Button>
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
          {isLoadingTemplates ? (
            <div className="text-center py-8">Loading templates...</div>
          ) : templates?.length === 0 ? (
            <div className="text-center py-8">No templates found.</div>
          ) : (
            templates?.map((template: TemplateModel) => (
              <div key={template.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">{template.name}</h3>
                    {template.isNewTemplate && (
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
                    <p className="text-sm text-gray-600">{template.messageBody}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <p className="text-sm text-gray-900">{template.type}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost
                    </label>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        ${template.costPerMessage.toFixed(3)} per message
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-500">
                    Setup Campaign
                  </Button>
                </div>
              </div>
            ))
          )}
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
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processed Messages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent Messages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoadingCampaigns ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      Loading campaigns...
                    </td>
                  </tr>
                ) : campaigns?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      No campaigns found.
                    </td>
                  </tr>
                ) : (
                  campaigns?.map((campaign: CampaignModel) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2">
                          {campaign.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(campaign.createdOn), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                          {
                            "bg-green-100 text-green-800": campaign.status === CampaignStatus.COMPLETED,
                            "bg-yellow-100 text-yellow-800": campaign.status === CampaignStatus.SCHEDULED,
                            "bg-gray-100 text-gray-800": campaign.status === CampaignStatus.DRAFT,
                            "bg-red-100 text-red-800": campaign.status === CampaignStatus.FAILED
                          }
                        )}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.report?.processedMessageCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.report?.sentMessageCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-900">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 