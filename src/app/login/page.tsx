'use client'

import React, { useCallback } from 'react'
import { Constants } from '@/constants'

export default function LoginPage() {
  const handleLoginClover = useCallback(() => {
    window.location.href = `${Constants.REACT_APP_API_BASE_URL}auth/clover/login`
  }, [])

  const handleLogin = useCallback(() => {
    window.location.href = `${Constants.REACT_APP_API_BASE_URL}auth/login`
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#00897B]">Welcome Back !</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to continue.</p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2.5 px-4 rounded border border-[#00897B] bg-white text-[#00897B] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00897B]"
            >
              Sign In
            </button>

            <button
              onClick={handleLoginClover}
              className="w-full flex justify-center py-2.5 px-4 rounded border border-transparent bg-[#00897B] text-white hover:bg-[#007A6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00897B]"
            >
              Sign In with Clover
            </button>

            <p className="text-xs text-center text-gray-500">
              <strong>Having trouble signing in?</strong>
              <br />
              Try signing in directly through Clover.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 