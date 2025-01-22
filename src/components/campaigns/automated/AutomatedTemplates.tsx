'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-react'
import { useOrganizationStore } from '@/store/useOrganizationStore'
import { Utility } from '@/utility/Utility'
import { TTemplateModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { CampaignEditModal } from './CampaignEditModal'

interface AutomatedTemplatesProps {
  templates: TTemplateModelJSON[]
  isLoading: boolean
}

export function AutomatedTemplates({ templates, isLoading }: AutomatedTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = React.useState<TTemplateModelJSON | null>(null)
  const organization = useOrganizationStore((state) => state.organization)

  if (templates.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <h3 className="font-medium text-lg">You've Enabled All Templates!</h3>
          <p className="text-gray-600">
            All templates are now enabled. There are no templates left to enable at the moment. Stay tuned for new templates coming soon!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id} className="p-6">
          <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium">{template.type}</h3>
              </div>
              <p className="text-gray-600">
                {Utility.replaceOrganizationCustomAttribute(template.messageBody, organization?.name)}
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700">Channel</div>
              <div className="text-gray-600">{template.channel}</div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setSelectedTemplate(template)}
              >
                Enable Campaign
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {selectedTemplate && (
        <CampaignEditModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  )
} 