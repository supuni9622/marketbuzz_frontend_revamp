'use client'

import React, { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Constants } from "@/constants"

export default function LoginPage() {
  const handleLoginClover = useCallback(() => {
    window.location.href = `${Constants.REACT_APP_API_BASE_URL}auth/clover/login`
  }, [])

  const handleLogin = useCallback(() => {
    window.location.href = `${Constants.REACT_APP_API_BASE_URL}auth/login`
  }, [])

  return (
    <div className="auth-page-content">
      <div className="container mx-auto mt-[10%]">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-5/12 pt-4 mb-3">
            <Card className="mt-4">
              <CardHeader className="text-center mt-2">
                <h5 className="text-2xl font-semibold text-primary">Welcome Back !</h5>
                <p className="text-muted">Sign in to continue.</p>
              </CardHeader>
              <CardContent className="p-4">
                <div className="p-2 mt-4 space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleLoginClover}
                    >
                      Sign In with Clover
                    </Button>
                    <p className="text-sm text-muted text-center">
                      <strong>Having trouble signing in?</strong>
                      <br />
                      Try signing in directly through Clover.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 