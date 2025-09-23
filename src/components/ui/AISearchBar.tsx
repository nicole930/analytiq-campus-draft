'use client';

import { useState, useRef, useEffect } from 'react';
import { Athlete } from '@/types/athlete';

interface SearchResult {
  athletes: Athlete[];
  criteria: any;
  aiUsed: boolean;
  total: number;
}

interface AISearchBarProps {
  onResults: (results: SearchResult) => void;
  onClear: () => void;
  placeholder?: string;
}

export default function AISearchBar({ onResults, onClear, placeholder = "Search for athletes..." }: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [aiMode, setAiMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiSuggestions = [
    "tall basketball centers over 6'8\"",
    "quarterbacks with over 3000 passing yards",
    "fast running backs from California",
    "freshman soccer goalkeepers",
    "tennis players with high win rates",
    "swimmers who compete in multiple events",
    "defensive players with high tackle counts",
    "baseball pitchers with low ERA",
    "volleyball players from the midwest",
    "track athletes who run sprints"
  ];

  const basicSuggestions = [
    "Basketball",
    "Football",
    "Soccer",
    "Baseball",
    "Tennis",
    "Swimming",
    "Volleyball",
    "Track & Field"
  ];

  useEffect(() => {
    if (query.length > 0) {
      const currentSuggestions = aiMode ? aiSuggestions : basicSuggestions;
      const filtered = currentSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions(aiMode ? aiSuggestions.slice(0, 5) : basicSuggestions);
      setShowSuggestions(false);
    }
  }, [query, aiMode]);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      onClear();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          useAI: aiMode
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const results = await response.json();
      onResults(results);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Search error:', error);
      // You could add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onClear();
  };

  const toggleAiMode = () => {
    setAiMode(!aiMode);
    if (query) {
      // Re-search with new mode if there's a query
      setTimeout(() => handleSearch(), 100);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className={`relative flex items-center bg-white rounded-lg shadow-sm border-2 transition-colors ${
        aiMode ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50' : 'border-gray-300'
      }`}>
        {/* AI Mode Indicator */}
        {aiMode && (
          <div className="absolute left-3 flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="ml-2 text-xs font-medium text-purple-600">AI</span>
          </div>
        )}

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder={aiMode ? "Ask me anything about athletes... (e.g., 'tall basketball players from Texas')" : placeholder}
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent ${
            aiMode ? 'pl-16' : ''
          }`}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-16 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="absolute right-2 p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
        >
          🔍
        </button>
      </div>

      {/* AI Toggle */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={toggleAiMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            aiMode
              ? 'bg-purple-100 text-purple-700 border border-purple-300'
              : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{aiMode ? '🤖' : '🔍'}</span>
          {aiMode ? 'AI Assistant Mode' : 'Basic Search'}
          {aiMode && <span className="text-xs bg-purple-200 px-1.5 py-0.5 rounded">NEW</span>}
        </button>

        {aiMode && (
          <div className="text-xs text-gray-500">
            Try: "freshman quarterbacks", "tall centers", "players from California"
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2 px-2">
              {aiMode ? '💡 AI Suggestions' : '🏷️ Categories'}
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="mr-2">{aiMode ? '🤖' : '🏷️'}</span>
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}