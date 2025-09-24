'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut()
      setIsLoading(false)
      // Redirect after a brief delay to show confirmation
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }

    signOut()
  }, [supabase, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLoading ? 'Signing you out...' : 'Signed out successfully'}
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Please wait...' : 'You have been signed out of AnalytIQ Campus'}
          </p>
        </div>

        {!isLoading && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}