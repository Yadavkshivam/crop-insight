'use client';

import { useState, useCallback } from 'react';
import SearchInput from '@/components/SearchInput';
import CropDetailsCard from '@/components/CropDetailsCard';
import MarketDataCard from '@/components/MarketDataCard';
import FarmerReportsCard from '@/components/FarmerReportsCard';
import AIInsightsCard from '@/components/AIInsightsCard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import Header, { Footer } from '@/components/Header';
import { CropData, MarketData, FarmerReport, AIInsights } from '@/types';
import { Sparkles, Leaf, BarChart3, Users } from 'lucide-react';

// Available crops for suggestions (expanded list from data.gov.in)
const AVAILABLE_CROPS = [
  'Wheat', 'Rice', 'Soybean', 'Corn', 'Maize', 'Cotton',
  'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Mustard',
  'Groundnut', 'Gram', 'Chana', 'Arhar', 'Moong', 'Urad',
  'Bajra', 'Jowar', 'Barley', 'Sunflower', 'Banana', 'Mango',
  'Apple', 'Orange', 'Grapes', 'Cabbage', 'Cauliflower',
  'Brinjal', 'Carrot', 'Peas', 'Garlic', 'Ginger', 'Turmeric',
  'Chilli', 'Coconut', 'Pepper', 'Cardamom', 'Cumin', 'Coriander'
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropData | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [farmerReports, setFarmerReports] = useState<FarmerReport[] | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [searchedCrop, setSearchedCrop] = useState<string>('');

  const resetResults = () => {
    setCropData(null);
    setMarketData(null);
    setFarmerReports(null);
    setAiInsights(null);
    setError(null);
  };

  const handleSearch = useCallback(async (cropName: string) => {
    setIsLoading(true);
    setSearchedCrop(cropName);
    resetResults();

    try {
      // Fetch crop data
      const cropResponse = await fetch(`/api/crop?crop=${encodeURIComponent(cropName)}`);
      const cropResult = await cropResponse.json();

      if (!cropResult.success) {
        throw new Error(cropResult.error || 'Failed to fetch crop data');
      }
      setCropData(cropResult.data);

      // Fetch market data and farmer reports in parallel
      const [marketResponse, reportsResponse] = await Promise.all([
        fetch(`/api/market?crop=${encodeURIComponent(cropName)}`),
        fetch(`/api/reports?crop=${encodeURIComponent(cropName)}`),
      ]);

      const [marketResult, reportsResult] = await Promise.all([
        marketResponse.json(),
        reportsResponse.json(),
      ]);

      if (marketResult.success) {
        setMarketData(marketResult.data);
      }

      if (reportsResult.success) {
        setFarmerReports(reportsResult.data);
      }

      // Generate AI insights
      const insightsResponse = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropData: cropResult.data,
          marketData: marketResult.data,
          farmerReports: reportsResult.data,
        }),
      });

      const insightsResult = await insightsResponse.json();

      if (insightsResult.success) {
        setAiInsights(insightsResult.data);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, []);

  const hasResults = cropData || marketData || farmerReports || aiInsights;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            AI Agriculture
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              {' '}Insight Builder
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Enter a crop name to get comprehensive agricultural data, market insights, 
            farmer reports, and AI-powered analysis to make informed farming decisions.
          </p>

          {/* Search Input */}
          <SearchInput
            onSearch={handleSearch}
            isLoading={isLoading}
            suggestions={AVAILABLE_CROPS}
          />
        </section>

        {/* Features Section (shown when no results) */}
        {!hasResults && !isLoading && !error && (
          <section id="features" className="mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
              What You&apos;ll Get
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Leaf className="w-6 h-6" />,
                  title: 'Crop Details',
                  description: 'Scientific name, soil & climate requirements, growing season',
                  color: 'from-green-500 to-emerald-600',
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: 'Market Data',
                  description: 'Current prices, trends, and top markets for your crop',
                  color: 'from-blue-500 to-indigo-600',
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Farmer Reports',
                  description: 'Real insights from farmers across different regions',
                  color: 'from-purple-500 to-pink-600',
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: 'AI Insights',
                  description: 'AI-powered summary, recommendations, and risk analysis',
                  color: 'from-amber-500 to-orange-600',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorState 
            message={error} 
            onRetry={() => searchedCrop && handleSearch(searchedCrop)} 
          />
        )}


        {hasResults && !isLoading && !error && (
          <section className="mt-8 space-y-8">

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Results for <span className="text-green-600 dark:text-green-400">{searchedCrop}</span>
              </h2>
            </div>


            {aiInsights && (
              <div className="animate-fade-in">
                <AIInsightsCard insights={aiInsights} />
              </div>
            )}


            <div className="grid lg:grid-cols-2 gap-8">

              {cropData && (
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <CropDetailsCard cropData={cropData} />
                </div>
              )}


              {marketData && (
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <MarketDataCard marketData={marketData} />
                </div>
              )}
            </div>


            {farmerReports && farmerReports.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <FarmerReportsCard reports={farmerReports} />
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
