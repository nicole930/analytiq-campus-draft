import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'
import Link from 'next/link'
import Layout from '@/components/ui/Layout'

export default async function AccountPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <Layout background="gradient">
      <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account</h1>
            <p className="text-gray-600">Manage your AnalytIQ Campus profile</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <p className="text-gray-600 text-sm font-mono">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Joined</label>
                <p className="text-gray-600">
                  {new Date(user.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">🏆 Fantasy Teams</h2>
            <p className="text-blue-700 mb-4">
              Ready to start drafting? Create your ultimate fantasy team from URI's athletic programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/draft"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Start Draft
              </Link>
              <Link
                href="/browse"
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors text-center"
              >
                Browse Athletes
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to home
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}