'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gift } from 'lucide-react'
import { useOrganizationStore } from '@/store/useOrganizationStore'
import { Utility } from '@/utility/Utility'
import {  TCampaignModelJSON, TCampaignUpdateRequest } from '@shoutout-labs/market_buzz_crm_types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCampaign } from '@/services/CampaignService'
import { toast } from 'react-toastify'
import { CampaignEditModal } from './CampaignEditModal';
import {  CampaignStatus } from "@/app/campaigns/constants";

interface AutomatedCampaignCardProps {
  campaigns: TCampaignModelJSON[]
  isLoading: boolean
}

export function AutomatedCampaignCard({ campaigns, isLoading }: AutomatedCampaignCardProps) {
  const [selectedCampaign, setSelectedCampaign] = React.useState<TCampaignModelJSON | null>(null)
  const [isEnableMap, setIsEnableMap] = React.useState<Record<string, boolean>>({})
  const organization = useOrganizationStore((state) => state.organization)
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (campaigns?.length > 0) {
      const initialMap = campaigns.reduce((acc, campaign) => {
        acc[campaign.id] = campaign.status === CampaignStatus.ACTIVE
        return acc
      }, {} as Record<string, boolean>)
      setIsEnableMap(initialMap)
    }
  }, [campaigns])

  const updateCampaignMutation = useMutation({
    mutationFn: (params: { payload: TCampaignUpdateRequest; campaignId: string }) => {
      return updateCampaign(params.payload, params.campaignId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Campaign updated successfully')
    }
  })

  const handleToggleSwitch = (campaignId: string) => {
    setIsEnableMap(prev => {
      const newState = { ...prev, [campaignId]: !prev[campaignId] }
      const updatePayload = {
        status: newState[campaignId] ? CampaignStatus.ACTIVE : CampaignStatus.INACTIVE
      }
      updateCampaignMutation.mutate({ payload: updatePayload, campaignId })
      return newState
    })
  }

  if (campaigns.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <h3 className="font-medium text-lg">Let's Get Your Automated Campaigns Started!</h3>
          <p className="text-gray-600">
            You haven't activated any campaigns yet. Pick a template and enable it to start sending automated messages to your customers.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="p-6">
          <div className="grid grid-cols-[2fr,1fr,1fr,2fr] gap-4 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium">{campaign.name}</h3>
                <Badge variant="secondary">{campaign.channel}</Badge>
              </div>
              <p className="text-gray-600">
                {Utility.replaceOrganizationCustomAttribute(campaign.content, organization?.name)}
              </p>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Triggered</div>
              <div className="text-lg font-medium">{campaign.report?.processedMessageCount || 0}</div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Sent</div>
              <div className="text-lg font-medium">{campaign.report?.sentMessageCount || 0}</div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isEnableMap[campaign.id] || false}
                  onCheckedChange={() => handleToggleSwitch(campaign.id)}
                />
                <span className="text-sm text-gray-600">
                  {isEnableMap[campaign.id] ? 'Active' : 'Inactive'}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCampaign(campaign)}
              >
                Edit Template
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {selectedCampaign && (
        <CampaignEditModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  )
} 