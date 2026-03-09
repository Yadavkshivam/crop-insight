import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            {message}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          )}

          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 w-full">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Tip:</strong> Try searching for common crops like Wheat, Rice, Soybean, Corn, Cotton, Sugarcane, Potato, Tomato, Onion, or Mustard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
