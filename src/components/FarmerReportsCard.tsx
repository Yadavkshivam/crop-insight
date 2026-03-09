import { FarmerReport } from '@/types';
import { MapPin, Calendar, Bug, Cloud, MessageSquare, Star } from 'lucide-react';

interface FarmerReportsCardProps {
  reports: FarmerReport[];
}

export default function FarmerReportsCard({ reports }: FarmerReportsCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      case 'negative':
        return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Farmer Reports</h2>
            <p className="text-purple-100 text-sm">
              {reports.length} reports from different regions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {report.region}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{report.reportDate}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getSentimentColor(
                    report.overallSentiment
                  )}`}
                >
                  <span>{getSentimentIcon(report.overallSentiment)}</span>
                  <span className="capitalize">{report.overallSentiment}</span>
                </span>
              </div>

              {/* Yield Rating */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Yield Rating:
                </span>
                {renderStars(report.yieldRating)}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({report.yieldRating}/5)
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <Bug className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Pest Issues
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {report.pestIssues}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <Cloud className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Weather Impact
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {report.weatherImpact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  &ldquo;{report.comments}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Data Source */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>📊</span>
            <span>Market data aggregated from </span>
            <a 
              href="https://agmarknet.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              Agmarknet
            </a>
            <span> via </span>
            <a 
              href="https://data.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              data.gov.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
