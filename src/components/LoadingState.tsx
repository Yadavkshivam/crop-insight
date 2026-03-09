import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  const steps = [
    { label: 'Fetching crop data', emoji: '🌾' },
    { label: 'Loading market information', emoji: '📊' },
    { label: 'Gathering farmer reports', emoji: '👨‍🌾' },
    { label: 'Generating AI insights', emoji: '🤖' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute -inset-4 border-4 border-green-200 dark:border-green-800 rounded-full animate-ping opacity-30" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
            Analyzing Crop Data
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
            Please wait while we gather insights for you
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-pulse"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span className="text-2xl">{step.emoji}</span>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
              </div>
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
