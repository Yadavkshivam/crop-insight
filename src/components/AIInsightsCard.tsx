import { AIInsights } from '@/types';
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  MinusCircle,
  ArrowRight
} from 'lucide-react';

interface AIInsightsCardProps {
  insights: AIInsights;
}

export default function AIInsightsCard({ insights }: AIInsightsCardProps) {
  const getConditionStyles = () => {
    switch (insights.overallCondition) {
      case 'Good':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
          badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
          icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
        };
      case 'Poor':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-rose-600',
          badge: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
          icon: <MinusCircle className="w-8 h-8 text-amber-500" />,
        };
    }
  };

  const styles = getConditionStyles();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className={`${styles.bg} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Insights</h2>
              <p className="text-white/80 text-sm">Powered by AI Analysis</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl font-bold text-lg ${styles.badge}`}>
            {insights.overallCondition}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Overall Condition Card */}
        <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-start gap-4">
            {styles.icon}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Overall Condition: {insights.overallCondition}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {insights.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Key Insights
            </h3>
          </div>
          <div className="space-y-2">
            {insights.keyInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800"
              >
                <ArrowRight className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-200">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Recommendations
            </h3>
          </div>
          <div className="space-y-2">
            {insights.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800"
              >
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-200">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        {insights.riskFactors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Risk Factors
              </h3>
            </div>
            <div className="space-y-2">
              {insights.riskFactors.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-200">{risk}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
