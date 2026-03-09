import { MarketData } from '@/types';
import { TrendingUp, TrendingDown, Minus, IndianRupee, Store, BarChart2 } from 'lucide-react';

interface MarketDataCardProps {
  marketData: MarketData;
}

export default function MarketDataCard({ marketData }: MarketDataCardProps) {
  const getTrendIcon = () => {
    switch (marketData.priceTrend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (marketData.priceTrend) {
      case 'up':
        return 'text-green-500 bg-green-50 dark:bg-green-900/30';
      case 'down':
        return 'text-red-500 bg-red-50 dark:bg-red-900/30';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-700/30';
    }
  };

  const getDemandBadgeColor = () => {
    switch (marketData.demandLevel.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Market Data</h2>
            <p className="text-blue-100 text-sm">Price Trends & Market Analysis</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price Section */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700 rounded-xl mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Current Market Price
            </p>
            <div className="flex items-center gap-2 mt-1">
              <IndianRupee className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              <span className="text-3xl font-bold text-gray-800 dark:text-white">
                {marketData.currentPrice.replace('₹', '')}
              </span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="font-semibold">{marketData.priceChange}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Price Trend
            </p>
            <div className="flex items-center gap-2 mt-2">
              {getTrendIcon()}
              <span className="font-semibold text-gray-800 dark:text-white capitalize">
                {marketData.priceTrend}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Demand Level
            </p>
            <div className="mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDemandBadgeColor()}`}>
                {marketData.demandLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Top Markets */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <p className="font-semibold text-indigo-800 dark:text-indigo-200">
              Top Markets
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {marketData.topMarkets.map((market, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm border border-indigo-100 dark:border-gray-600"
              >
                {market}
              </span>
            ))}
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>📊</span>
            <span>Data sourced from </span>
            <a 
              href="https://data.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              data.gov.in
            </a>
            <span> (Agmarknet)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
