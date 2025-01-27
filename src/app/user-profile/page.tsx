'use client'

import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import { useOrganizationStore } from '@/store/useOrganizationStore'
import { useAuthStore } from '@/store/useAuthStore'
import { UserRole } from '@/constants'

interface Employee {
  id: string
  name: string
  email?: string
  role: string
}

export default function UserProfilePage() {
  const role = useAuthStore((state) => state.role)
  const organization = useOrganizationStore((state) => state.organization)

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={organization.logo || '/avatar.png'}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{organization.name || 'Admin'}</h2>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Created On: {moment(organization?.organizationCreatedOn).format('LL LTS')}</p>
                  <p>Updated On: {moment(organization?.updatedOn).format('LL LTS')}</p>
                  <p>Clover Created On: {moment(organization?.createdOn).format('LL LTS')}</p>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div>
              <h3 className="text-lg font-medium mb-4">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-sm text-gray-900">{organization?.address?.address1}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <p className="text-sm text-gray-900">{organization?.address?.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <p className="text-sm text-gray-900">{organization?.address?.city}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
                  <p className="text-sm text-gray-900">{organization?.address?.zip}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <p className="text-sm text-gray-900">{organization?.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                  <p className="text-sm text-gray-900">{organization?.timeZone}</p>
                </div>
              </div>
            </div>

            {/* Admin Contact */}
            <div>
              <h3 className="text-lg font-medium mb-4">Admin Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-sm text-gray-900">{organization?.owner?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900">{organization?.owner?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <p className="text-sm text-gray-900">{organization?.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Employees */}
            <div>
              <h3 className="text-lg font-medium mb-4">Employees</h3>
              <div className="border rounded-lg divide-y">
                {organization?.metadata?.employees?.map((employee: Employee) => (
                  <div key={employee.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">{employee.name}</p>
                        {employee.email && (
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">Role: {employee.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Information - Only visible to SUPERADMIN */}
            {role === UserRole.SUPERADMIN && (
              <div>
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="border rounded-lg p-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Status</label>
                    <p className="text-sm text-gray-900">
                      {organization?.metadata?.isBillable ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 