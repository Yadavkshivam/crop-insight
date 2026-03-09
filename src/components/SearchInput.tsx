'use client';

import { useState, FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchInputProps {
  onSearch: (cropName: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

export default function SearchInput({ onSearch, isLoading, suggestions }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setError('Please enter a crop name');
      return false;
    }
    if (value.trim().length < 2) {
      setError('Crop name must be at least 2 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
      setError('Crop name should only contain letters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateInput(query)) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError('');
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Enter crop name (e.g., Wheat, Rice, Soybean)"
            className="w-full px-6 py-4 pr-32 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 shadow-lg placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2 text-red-500 text-sm font-medium animate-fade-in">
            {error}
          </p>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-green-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-3"
              >
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  🌾
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Available crops hint */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Available crops:{' '}
          <span className="text-gray-600 dark:text-gray-300">
            {suggestions.slice(0, 5).join(', ')}...
          </span>
        </p>
      </div>
    </div>
  );
}
