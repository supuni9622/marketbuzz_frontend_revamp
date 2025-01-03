'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { User, CreditCard, Bell, Lock } from 'lucide-react'

const tabs = [
  { name: 'Profile', icon: User },
  { name: 'Billing', icon: CreditCard },
  { name: 'Notifications', icon: Bell },
  { name: 'Security', icon: Lock },
]

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = React.useState('Profile')

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h1>
        
        <div className="flex space-x-4 border-b">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === name
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'Profile' && (
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Acme Inc."
                />
              </div>
              <div className="pt-4">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Other tab contents will be implemented similarly */}
          {activeTab !== 'Profile' && (
            <div className="bg-white rounded-lg border p-6">
              <p className="text-gray-500">Content for {activeTab} tab</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 