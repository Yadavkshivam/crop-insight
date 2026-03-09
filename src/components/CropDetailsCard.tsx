import { CropData } from '@/types';
import { Sprout, Sun, Droplets, Calendar, FlaskConical, BarChart3 } from 'lucide-react';

interface CropDetailsCardProps {
  cropData: CropData;
}

export default function CropDetailsCard({ cropData }: CropDetailsCardProps) {
  const details = [
    {
      icon: <FlaskConical className="w-5 h-5" />,
      label: 'Scientific Name',
      value: cropData.scientificName,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Growing Season',
      value: cropData.growingSeason,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
    },
    {
      icon: <Sprout className="w-5 h-5" />,
      label: 'Soil Requirements',
      value: cropData.soilRequirements,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
    },
    {
      icon: <Sun className="w-5 h-5" />,
      label: 'Climate Requirements',
      value: cropData.climateRequirements,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/30',
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      label: 'Water Requirements',
      value: cropData.waterRequirements,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/30',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Average Yield',
      value: cropData.averageYield,
      color: 'text-green-500 bg-green-50 dark:bg-green-900/30',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{cropData.cropName}</h2>
            <p className="text-green-100 text-sm">Crop Details & Requirements</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid gap-4">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className={`p-2.5 rounded-lg ${detail.color}`}>
                {detail.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {detail.label}
                </p>
                <p className="mt-1 text-gray-800 dark:text-gray-200 font-medium">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Harvest Time Badge */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl border border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Harvest Time
              </p>
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                {cropData.harvestTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
