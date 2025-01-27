'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useOrganizationStore } from '@/store/useOrganizationStore'
import GTMService from '@/services/GTMService'
import { Constants } from '@/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProfileDropdown() {
  const router = useRouter()
  const { logoutUser, organizationId, role } = useAuthStore()
  const organization = useOrganizationStore((state) => state.organization)

  const handleLogout = useCallback(() => {
    // Remove access token from session storage
    sessionStorage.removeItem("accessToken")
    // Call logout function from auth store which will clear the state
    logoutUser()
    // Track logout event with GTM
    GTMService.logoutEvent({
      organizationId: organizationId,
      role: role.toString()
    })
    // Redirect to login page using window.location
    window.location.href = `${Constants.REACT_APP_API_BASE_URL}auth/login`
  }, [logoutUser, organizationId, role])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
        <div className="relative h-8 w-8 rounded-full overflow-hidden">
          <Image
            src={organization.logo || '/avatar.png'}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium">
            {organization?.name || "Admin"}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={organization.logo || '/avatar.png'}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{organization?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground">{organization?.owner?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user-profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 