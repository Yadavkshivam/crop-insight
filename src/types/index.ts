// Crop Data Types
export interface CropData {
  cropName: string;
  scientificName: string;
  growingSeason: string;
  soilRequirements: string;
  climateRequirements: string;
  averageYield: string;
  waterRequirements: string;
  harvestTime: string;
}

// Market Data Types
export interface MarketData {
  currentPrice: string;
  priceChange: string;
  priceTrend: 'up' | 'down' | 'stable';
  demandLevel: string;
  topMarkets: string[];
}

// Farmer Report Types
export interface FarmerReport {
  region: string;
  reportDate: string;
  yieldRating: number;
  pestIssues: string;
  weatherImpact: string;
  overallSentiment: 'positive' | 'neutral' | 'negative';
  comments: string;
}

// AI Insights Types
export interface AIInsights {
  summary: string;
  keyInsights: string[];
  overallCondition: 'Good' | 'Moderate' | 'Poor';
  recommendations: string[];
  riskFactors: string[];
}

// Combined Agriculture Data
export interface AgricultureData {
  cropData: CropData;
  marketData: MarketData;
  farmerReports: FarmerReport[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Search State
export interface SearchState {
  isLoading: boolean;
  error: string | null;
  cropData: CropData | null;
  marketData: MarketData | null;
  farmerReports: FarmerReport[] | null;
  aiInsights: AIInsights | null;
}
