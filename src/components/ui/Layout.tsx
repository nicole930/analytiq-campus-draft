'use client';

import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  background?: 'gradient' | 'light';
}

export default function Layout({ children, background = 'light' }: LayoutProps) {
  const bgClass = background === 'gradient'
    ? 'min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700'
    : 'min-h-screen bg-gray-50';

  return (
    <div className={bgClass}>
      {background === 'gradient' && <Navigation />}
      {children}
    </div>
  );
}