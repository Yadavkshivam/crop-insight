import { MarketData, FarmerReport, ApiResponse } from '@/types';
import { generateMarketData, generateFarmerReports } from './mockData';

/**
 * Fetch market data for a crop
 * In production, this would call market price APIs
 */
export async function fetchMarketData(cropName: string): Promise<ApiResponse<MarketData>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate mock market data
    const marketData = generateMarketData(cropName);
    
    return {
      success: true,
      data: marketData,
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    return {
      success: false,
      error: 'Failed to fetch market data',
    };
  }
}

/**
 * Fetch farmer reports for a crop
 * In production, this would aggregate reports from various sources
 */
export async function fetchFarmerReports(cropName: string): Promise<ApiResponse<FarmerReport[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate mock farmer reports
    const reports = generateFarmerReports(cropName);
    
    return {
      success: true,
      data: reports,
    };
  } catch (error) {
    console.error('Error fetching farmer reports:', error);
    return {
      success: false,
      error: 'Failed to fetch farmer reports',
    };
  }
}
