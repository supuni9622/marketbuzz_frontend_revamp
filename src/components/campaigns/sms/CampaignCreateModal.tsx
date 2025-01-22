'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { useOrganizationStore } from "@/store/useOrganizationStore"
import { PreDefinedSegments, isMarketingAllowedRule } from "@/app/campaigns/sms/Constants"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getSegments, getCustomersCount, filterCustomersCount } from "@/services"
import { toast } from "sonner"
import { Utility } from "@/utils/Utility"
import { filterConfig } from "../../../app/campaigns/sms/CustomersFilterConfig"
import { MessageTextArea } from "./MessageTextArea"
import { BottomContainer } from "./BottomContainer"
import { createCampaign } from "@/services/CampaignService";
import { TCampaignCreateRequest } from "@shoutout-labs/market_buzz_crm_types";
import { CampaignChannel, CampaignStatus, CampaignType } from "@/app/campaigns/constants";

interface CampaignCreateModalProps {
  open: boolean
  onClose: () => void
}

export function CampaignCreateModal({ open, onClose }: CampaignCreateModalProps) {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("")
  const [selectedSegmentName, setSelectedSegmentName] = useState("")
  const [customersCountOfSegment, setCustomersCountOfSegment] = useState(0)
  const [isCheckedMarketing, setIsCheckedMarketing] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [segmentError, setSegmentError] = useState(false)
  const [messageError, setMessageError] = useState(false)

  const { organization } = useOrganizationStore()

  const charCount = useMemo(() => message.length, [message])
  const pageCount = useMemo(() => Math.ceil(message.length / 160), [message])

  const { data: segmentsData } = useQuery({
    queryKey: ["segments"],
    queryFn: () => getSegments({ limit: 100, skip: 0 })
  })

  const { data: totalCustomers } = useQuery({
    queryKey: ["customerCount", selectedSegment === "all_customers", isCheckedMarketing],
    queryFn: () => getCustomersCount({
      marketingAllowed: isCheckedMarketing,
      isRequiredPhoneNumber: true
    })
  })

  const allSegments = useMemo(() => {
    if (segmentsData?.items?.length > 0) {
      return [...PreDefinedSegments, ...segmentsData.items]
    }
    return [...PreDefinedSegments]
  }, [segmentsData])

  const getCustomersCountInSegment = useCallback(async (filterObj: any) => {
    const res = await filterCustomersCount({ filterObj })
    setCustomersCountOfSegment(res.count ?? 0)
  }, [])

  const handleNameChange = useCallback((value: string) => {
    setName(value)
    setNameError(!value.trim())
  }, [])

  const handleSegmentChange = useCallback((value: string) => {
    setSelectedSegment(value)
    setSegmentError(!value)
    
    if (value === "all_customers") {
      setCustomersCountOfSegment(totalCustomers?.count ?? 0)
      setSelectedSegmentName("All Customers")
    } else {
      const segmentData = allSegments?.find((segment) => segment.id === value)
      setSelectedSegmentName(segmentData?.name ?? "")
      const customerFilters = Utility.getMongoDBQuery(segmentData?.filter, filterConfig)
      getCustomersCountInSegment(customerFilters)
    }
  }, [allSegments, totalCustomers, getCustomersCountInSegment])

  const handleMessageChange = useCallback((value: string) => {
    setMessage(value)
    setMessageError(!value.trim())
  }, [])

  const handleMarketingChange = useCallback((checked: boolean) => {
    setIsCheckedMarketing(checked)
  }, [])

  const createCampaignMutation = useMutation({
    mutationFn: (payload: TCampaignCreateRequest) => {
      return createCampaign(payload)
    },
    onSuccess: () => {
      toast.success("Campaign created successfully")
      onClose()
    },
    onError: () => {
      toast.error("Failed to create campaign")
    }
  })

  const handleSubmit = useCallback(() => {
    setNameError(!name.trim())
    setSegmentError(!selectedSegment)
    setMessageError(!message.trim())

    if (!name.trim() || !selectedSegment || !message.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    const payload: TCampaignCreateRequest = {
        content: message,
        name: name,
        channel: CampaignChannel.SMS,
        status: CampaignStatus.DRAFT,
        type: CampaignType.BROADCAST
    } as const

    if (selectedSegment !== "all_customers") {
      const segmentData = allSegments?.find((segment) => segment.id === selectedSegment)
      const customerFilters = Utility.getMongoDBQuery(segmentData?.filter, filterConfig)
      ;(payload as any).segmentId = selectedSegment
      ;(payload as any).filter = customerFilters
    }

    createCampaignMutation.mutate(payload)
  }, [name, selectedSegment, message, isCheckedMarketing, allSegments, createCampaignMutation])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Campaign Name <span className="text-red-500">*</span></Label>
            <Input 
              placeholder="Enter campaign name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={nameError ? "border-red-500" : ""}
            />
            {nameError && <p className="text-sm text-red-500">Campaign name cannot be empty!</p>}
          </div>

          <div className="space-y-2">
            <Label>Customer Segment <span className="text-red-500">*</span></Label>
            <Select value={selectedSegment} onValueChange={handleSegmentChange}>
              <SelectTrigger className={segmentError ? "border-red-500" : ""}>
                <SelectValue placeholder="Select Customer Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_customers">All Customers</SelectItem>
                {allSegments.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id}>
                    {segment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {segmentError && <p className="text-sm text-red-500">Please select a customer segment!</p>}

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox 
                id="marketing"
                checked={isCheckedMarketing}
                onCheckedChange={handleMarketingChange}
              />
              <label htmlFor="marketing" className="text-sm">
                Send only to customers who have opted in for marketing.
              </label>
            </div>

            {selectedSegmentName && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <span>No. of Customers: <strong>{customersCountOfSegment}</strong></span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>SMS campaigns are sent only to customers who have provided a mobile number.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-2">
            <Label>Message Text <span className="text-red-500">*</span></Label>
            <MessageTextArea
              value={message}
              onChange={handleMessageChange}
              footerText={organization.shortName ?? `- ${organization.name} -`}
              error={messageError}
            />
            <BottomContainer
              charCount={charCount}
              pageCount={pageCount}
              message={message}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={createCampaignMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={createCampaignMutation.isPending}>
            {createCampaignMutation.isPending ? "Creating..." : "Start Campaign Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 