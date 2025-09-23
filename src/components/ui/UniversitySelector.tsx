'use client';

import { useState, useRef, useEffect } from 'react';
import { University } from '@/types/university';
import { universities, getUniversityById, defaultUniversity } from '@/data/universities';

interface UniversitySelectorProps {
  selectedUniversity: University;
  onUniversityChange: (university: University) => void;
  className?: string;
}

export default function UniversitySelector({ selectedUniversity, onUniversityChange, className = "" }: UniversitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUniversitySelect = (university: University) => {
    if (university.isActive) {
      onUniversityChange(university);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected University Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-white min-w-48"
      >
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedUniversity.colors.primary }}
          ></div>
          <span className="font-medium">{selectedUniversity.shortName}</span>
          <span className="text-sm opacity-80">{selectedUniversity.mascot}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
          <div className="p-3 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-800">Select University</h3>
            <p className="text-xs text-gray-600">Choose your school to access leagues</p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* Active Universities */}
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1">Available Now</div>
              {universities.filter(uni => uni.isActive).map((university) => (
                <button
                  key={university.id}
                  onClick={() => handleUniversitySelect(university)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    selectedUniversity.id === university.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: university.colors.primary }}
                  ></div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{university.name}</div>
                    <div className="text-sm text-gray-600">{university.location.city}, {university.location.state}</div>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Active
                  </div>
                </button>
              ))}
            </div>

            {/* Coming Soon Universities */}
            <div className="p-2 border-t bg-gray-50">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 flex items-center gap-2">
                <span>🚀</span>
                Coming Soon
              </div>
              {universities.filter(uni => uni.comingSoon).map((university) => (
                <div
                  key={university.id}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg opacity-60 cursor-not-allowed"
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: university.colors.primary }}
                  ></div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-700">{university.name}</div>
                    <div className="text-sm text-gray-500">{university.location.city}, {university.location.state}</div>
                  </div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Soon
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Message */}
            <div className="p-3 border-t bg-blue-50">
              <div className="text-center">
                <p className="text-sm text-blue-800 font-medium">More schools coming soon!</p>
                <p className="text-xs text-blue-600 mt-1">
                  Request your university at support@analytiqcampus.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}