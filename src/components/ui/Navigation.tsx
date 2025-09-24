'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import UniversitySelector from './UniversitySelector';
import { University } from '@/types/university';
import { defaultUniversity } from '@/data/universities';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Navigation() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [selectedUniversity, setSelectedUniversity] = useState<University>(defaultUniversity);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Browse Athletes', href: '/browse' },
    { name: 'Draft', href: '/draft' },
    { name: 'My Team', href: '/team' },
    { name: 'Leaderboard', href: '/leaderboard' }
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-white text-2xl font-bold hover:text-yellow-300 transition-colors">
            AnalytIQ Campus
          </Link>

          {/* University Selector */}
          <div className="hidden md:block">
            <UniversitySelector
              selectedUniversity={selectedUniversity}
              onUniversityChange={setSelectedUniversity}
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md ${
                  pathname === item.href ? 'text-yellow-300 bg-white/10' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            {loading ? (
              <div className="w-20 h-8 bg-white/20 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-white">Welcome, {user.email?.split('@')[0]}</span>
                <Link
                  href="/account"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Account
                </Link>
                <Link
                  href="/logout"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="text-white hover:text-blue-200 transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}