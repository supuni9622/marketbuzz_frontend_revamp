'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MessageTextArea } from './MessageTextArea'
import { BottomContainer } from './BottomContainer'
import { useOrganizationStore } from '@/store/useOrganizationStore'
import { useCustomersStore } from '@/store/useCustomersStore'
import { Utility } from '@/utility/Utility'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCampaign, updateCampaign, regenerateContent } from '@/services/CampaignService'
import { toast } from 'react-toastify'
import { 
  TCampaignModelJSON, 
  TCampaignCreateRequest, 
  TCampaignUpdateRequest,
  TTemplateModelJSON
} from '@shoutout-labs/market_buzz_crm_types'
import { ContentRegenerationIcon } from '@/components/icons/ContentRegenerationIcon'
import { CampaignChannel, CampaignStatus, CampaignType } from "@/app/campaigns/constants";

interface CampaignEditModalProps {
  campaign?: TCampaignModelJSON
  template?: TTemplateModelJSON
  onClose: () => void
}

export function CampaignEditModal({ campaign, template, onClose }: CampaignEditModalProps) {
  const [message, setMessage] = React.useState('')
  const organization = useOrganizationStore((state) => state.organization)
  const credits = useOrganizationStore((state) => state.credits)
  const totalCustomers = useCustomersStore((state) => state.totalCustomers)
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (campaign) {
      setMessage(Utility.replaceOrganizationCustomAttribute(campaign.content, organization?.name))
    } else if (template) {
      setMessage(Utility.replaceOrganizationCustomAttribute(template.messageBody, organization?.name))
    }
  }, [campaign, template, organization?.name])

  const createCampaignMutation = useMutation({
    mutationFn: (payload: TCampaignCreateRequest) => createCampaign(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Campaign created successfully')
      onClose()
    }
  })

  const updateCampaignMutation = useMutation({
    mutationFn: (params: { payload: TCampaignUpdateRequest; campaignId: string }) => {
      return updateCampaign(params.payload, params.campaignId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Campaign updated successfully')
      onClose()
    }
  })

  const handleRegenerateContent = async () => {
    try {
      const response = await regenerateContent({ content: message })
      setMessage(response.message?.content || '')
    } catch (error) {
      console.error('Error regenerating content:', error)
      toast.error('Failed to regenerate content')
    }
  }

  const handleSave = () => {
    if (campaign) {
      updateCampaignMutation.mutate({
        payload: {
          content: message,
          name: campaign.name
        },
        campaignId: campaign.id
      })
    } else if (template) {
      createCampaignMutation.mutate({
        content: message,
        name: template.type,
        channel: CampaignChannel.SMS,
        status: CampaignStatus.DRAFT,
        type: CampaignType.EVENT,
        event: template.event
      })
    }
  }

  const charCount = message.length
  const pageCount = Math.ceil(charCount / 160)
  const estimatedCredits = template?.costPerMessage ? template.costPerMessage * totalCustomers : 0
  const hasInsufficientCredits = credits < estimatedCredits

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {campaign ? campaign.name : 'Start Campaign'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Message Text</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#8772f9] text-white hover:bg-[#7b64f8]"
              onClick={handleRegenerateContent}
            >
              <ContentRegenerationIcon className="mr-2 h-4 w-4" />
              Generate Content
            </Button>
          </div>

          <MessageTextArea
            value={message}
            onChange={setMessage}
            footerText={`- ${organization?.name || ''} -`}
          />

          <BottomContainer
            charCount={charCount}
            pageCount={pageCount}
            message={message}
            isShowCustomAttributeNotification={true}
          />

          {hasInsufficientCredits && (
            <p className="text-red-500 text-sm italic">
              Insufficient Buzz credits. Please buy more credits to send this campaign.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={createCampaignMutation.isPending || updateCampaignMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              Utility.hasCustomAttributes(message) ||
              pageCount > 3 ||
              hasInsufficientCredits ||
              createCampaignMutation.isPending ||
              updateCampaignMutation.isPending
            }
          >
            {campaign ? 'Edit Template' : 'Start Campaign Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 