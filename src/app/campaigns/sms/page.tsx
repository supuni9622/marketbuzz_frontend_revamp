'use client'

import React, { useState } from 'react'
import { X, RefreshCw } from 'lucide-react'
import { useCampaignTemplates, useCampaigns } from '@/contexts/CampaignDataContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CampaignCreateModal } from '@/components/campaigns/sms/CampaignCreateModal';
import {
  TTemplateModelJSON,
  TCampaignModelJSON
} from "@shoutout-labs/market_buzz_crm_types";
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getTemplates,getCustomersCount  } from '@/services';
import { CampaignEditModal } from '@/components/campaigns/automated/CampaignEditModal'
import { Loader } from '@/components/common/Loader'
import {  CampaignStatus } from '@/app/campaigns/constants';
import { PerCreditValue } from "@shoutout-labs/marketbuzz-constants";

export default function SMSCampaignsPage() {
  const [activeTab, setActiveTab] = useState('Campaign Ideas')
  const [showBanner, setShowBanner] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<TTemplateModelJSON | null>(null)
  

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

  const { data: totalCustomers, isLoading } = useQuery<number>({
    queryKey: ["customerCount"],
    queryFn: async () => {
      const queryObj = {
        marketingAllowed: true,
        isRequiredPhoneNumber: true
      };
      const response = await getCustomersCount(queryObj);
      return response?.count;
    },
    refetchOnWindowFocus: false
  });

  const { data: templatesData, isLoading: templatesDataLoading } = useQuery({
    queryKey: ['templates', 0],
    queryFn: async () => {
      const response = await getTemplates({
        limit: 10,
        skip: 0
      })
      return response.items as TTemplateModelJSON[]
    },
    refetchOnWindowFocus: false
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (activeTab === 'Campaign Ideas') {
      await refetchTemplates()
    } else {
      await refetchCampaigns()
    }
    setIsRefreshing(false)
  }

  const handleSetupCampaign = (template: TTemplateModelJSON) => {
    setSelectedTemplate(template)
  }

  const handleCloseModal = () => {
    setSelectedTemplate(null)
  }

  if (templatesDataLoading) {
    return <Loader />
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
        <Button 
          className="bg-blue-600 hover:bg-blue-500"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New Campaign
        </Button>
      </div>

      {/* Campaign Create Modal */}
      <CampaignCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

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
          ) : templatesData?.length === 0 ? (
            <div className="text-center py-8">No templates found.</div>
          ) : (
            templatesData?.map((template: TTemplateModelJSON) => (
              <Card key={template.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">{template.type}</h2>
                    {template.isNewTemplate && (
                      <Badge className="bg-blue-500">New</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                      <p className="text-sm text-gray-500 mb-2">Message Text</p>
                      <p className="text-sm">{template.messageBody}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-2">No. Customers</p>
                      <p className="text-sm">{totalCustomers || 0}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-2">Estimated Cost</p>
                      <p className="text-sm">{template.costPerMessage * (totalCustomers || 0)} Buzz Credit/s</p>
                      <p className="text-sm text-gray-500">
                        ${((template.costPerMessage * (totalCustomers || 0) * PerCreditValue) || 0).toFixed(3)}
                      </p>
                    </div>

                    <div className="col-span-2 flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => handleSetupCampaign(template)}
                        className="w-full"
                      >
                        Setup Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
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
                  campaigns?.map((campaign: TCampaignModelJSON) => (
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

      {selectedTemplate && (
        <CampaignEditModal
          template={selectedTemplate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
} 