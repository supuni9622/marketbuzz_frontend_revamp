'use client'

import React from 'react'
import { AutomatedCampaignCard } from '@/components/campaigns/automated/AutomatedCampaignCard'
import { AutomatedTemplates } from '@/components/campaigns/automated/AutomatedTemplates'
import { useCampaignTemplates, useCampaigns } from '@/contexts/CampaignDataContext'
import { CampaignType } from "@/app/campaigns/constants";
import { Loader } from '@/components/common/Loader'

export default function AutomatedCampaignsPage() {
  const {
    templates,
    isLoadingTemplates
  } = useCampaignTemplates({
    limit: 10,
    skip: 0,
    type: CampaignType.EVENT
  })

  const {
    campaigns,
    isLoadingCampaigns
  } = useCampaigns({
    limit: 10,
    skip: 0,
    type: CampaignType.EVENT
  })

  const templatesNotInCampaigns = React.useMemo(() => {
    if (!campaigns) return templates
    if (!templates) return []

    const campaignEvents = new Set(
      campaigns.map(campaign => campaign.event)
    )
    return templates.filter(
      template => !campaignEvents.has(template.event)
    )
  }, [templates, campaigns])

  if (isLoadingTemplates || isLoadingCampaigns) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Campaigns</h2>
        <AutomatedCampaignCard 
          campaigns={campaigns || []} 
          isLoading={isLoadingCampaigns} 
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Templates</h2>
        <AutomatedTemplates 
          templates={templatesNotInCampaigns || []} 
          isLoading={isLoadingTemplates} 
        />
      </div>
    </div>
  )
} 