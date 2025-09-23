'use client';

import Layout from '@/components/ui/Layout';
import EmailSignup from '@/components/ui/EmailSignup';

export default function Home() {
  return (
    <Layout background="gradient">

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Draft Your
            <span className="text-yellow-300"> Campus Champions</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Create your ultimate fantasy team from University of Rhode Island's athletic programs.
            Draft players from football, basketball, baseball, and more. Compete weekly based on real performance stats.
          </p>

          {/* University Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-200"></div>
                <span className="text-white font-medium">University of Rhode Island</span>
                <span className="text-blue-200">Rams</span>
              </div>
            </div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              Now Available
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/draft" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg text-center">
              Start Your Draft
            </a>
            <a href="/browse" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors text-center">
              Browse Athletes
            </a>
            <a href="/leaderboard" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors text-center">
              View Leaderboard
            </a>
          </div>

          {/* Quick Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search: try 'tall basketball centers' or 'fast quarterbacks'..."
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                onFocus={(e) => {
                  // Redirect to browse page with focus on search
                  window.location.href = '/browse';
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-medium">AI</span>
                <span className="text-gray-500">🔍</span>
              </div>
            </div>
            <p className="text-center text-blue-100 text-sm mt-2">
              🤖 AI-powered search • Find athletes by any criteria
            </p>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">🚀 More Schools Coming Soon</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="text-white/70">
                <div className="w-8 h-8 bg-red-600 rounded-full mx-auto mb-2"></div>
                <div className="text-sm">NEU Huskies</div>
              </div>
              <div className="text-white/70">
                <div className="w-8 h-8 bg-blue-900 rounded-full mx-auto mb-2"></div>
                <div className="text-sm">PSU Nittany Lions</div>
              </div>
              <div className="text-white/70">
                <div className="w-8 h-8 bg-blue-800 rounded-full mx-auto mb-2"></div>
                <div className="text-sm">UNH Wildcats</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-center text-white font-medium mb-3">Don't see your school?</h4>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <input
                  type="text"
                  placeholder="Enter your university name..."
                  className="px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex-1 max-w-xs"
                />
                <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Request School
                </button>
              </div>
              <p className="text-center text-blue-200 text-xs mt-3">
                Or email us at support@analytiqcampus.com
              </p>
            </div>
          </div>

          {/* Email Signup */}
          <div className="mb-16">
            <EmailSignup />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-4">🏈</div>
              <h3 className="text-xl font-bold mb-2">Multi-Sport Draft</h3>
              <p className="text-blue-100">
                Draft players from football, basketball, baseball, soccer, and more NCAA sports
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Real-Time Scoring</h3>
              <p className="text-blue-100">
                Your team scores points based on actual player performance stats each week
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Compete & Win</h3>
              <p className="text-blue-100">
                Compete against other fans and climb the leaderboard for ultimate bragging rights
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mock Data Disclaimer */}
      <div className="bg-orange-100/10 backdrop-blur-sm border border-orange-300/30 rounded-xl p-6 mx-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="text-lg font-semibold text-orange-200 mb-2">Development Preview</h3>
            <p className="text-orange-100 text-sm">
              This platform currently uses mock data for demonstration purposes. All athlete statistics,
              performance metrics, and player information are simulated and not based on real NCAA data.
              Real data integration will be available upon full launch.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900/50 text-center py-8 text-blue-200">
        <p>&copy; 2024 AnalytIQ Campus. Bringing fantasy sports to universities nationwide.</p>
        <p className="text-sm mt-2">Starting with University of Rhode Island • More schools coming soon</p>
      </footer>
    </Layout>
  );
}
