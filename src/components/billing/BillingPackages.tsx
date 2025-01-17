import { useCallback, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfigStore } from '../../store/useConfigStore'
import { useOrganizationStore } from '../../store/useOrganizationStore'

export function BillingPackages() {
  const { config } = useConfigStore()
  const { organization } = useOrganizationStore()

  const packages = useMemo(() => {
    return (config?.packages ?? []).sort(
      (a, b) => (a.credits ?? 0) - (b.credits ?? 0)
    )
  }, [config])

  const handleSubscribe = useCallback(() => {
    window.open(
      `https://clover.com/appmarket/m/${organization.referenceId}/apps/${organization.appReferenceId}`,
      '_blank'
    )
  }, [organization])

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6">Available packages to subscribe on Clover</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {packages.map((pkg) => (
            <Card key={pkg.packageId.toString()} className="border-primary">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">{pkg.name}</h4>
                <div className="font-medium">
                  ${((pkg.amount ?? 0) / 100).toFixed(2)} ({pkg.interval?.toLowerCase()})
                </div>
                {pkg.credits && (
                  <div className="text-gray-600 mt-1">{pkg.credits} credits</div>
                )}
              </CardContent>
            </Card>
          ))}
          {packages.length === 0 && (
            <div className="text-center col-span-4 text-gray-500">No packages found</div>
          )}
        </div>

        <Button onClick={handleSubscribe} className="bg-green-600 hover:bg-green-700">
          Subscribe on Clover
        </Button>
      </CardContent>
    </Card>
  )
} 