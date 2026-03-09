import { CropData, ApiResponse } from '@/types';
import { cropDatabase } from './mockData';

/**
 * Fetch crop data from API or mock database
 * In production, this would call an actual agriculture API
 */
export async function fetchCropData(cropName: string): Promise<ApiResponse<CropData>> {
  try {
    // Normalize crop name for lookup
    const normalizedName = cropName.toLowerCase().trim();
    
    // Check mock database first
    const cropData = cropDatabase[normalizedName];
    
    if (cropData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: cropData,
      };
    }

    // If not in database, try to fetch from external API
    // This is where you would integrate with a real agriculture API
    const apiKey = process.env.AGRICULTURE_API_KEY;
    
    if (apiKey) {
      // Example: Integration with a real API would go here
      // const response = await fetch(`https://api.agriculture.com/crops/${normalizedName}`, {
      //   headers: { 'Authorization': `Bearer ${apiKey}` }
      // });
      // const data = await response.json();
      // return { success: true, data };
    }

    // Return error if crop not found
    return {
      success: false,
      error: `Crop "${cropName}" not found in database. Try: wheat, rice, soybean, corn, cotton, sugarcane, potato, tomato, onion, or mustard.`,
    };
  } catch (error) {
    console.error('Error fetching crop data:', error);
    return {
      success: false,
      error: 'Failed to fetch crop data. Please try again.',
    };
  }
}

/**
 * Get list of available crops
 */
export function getAvailableCrops(): string[] {
  return Object.keys(cropDatabase).map(
    crop => crop.charAt(0).toUpperCase() + crop.slice(1)
  );
}

/**
 * Validate crop name input
 */
export function validateCropName(cropName: string): { valid: boolean; error?: string } {
  if (!cropName || cropName.trim().length === 0) {
    return { valid: false, error: 'Please enter a crop name' };
  }
  
  if (cropName.trim().length < 2) {
    return { valid: false, error: 'Crop name must be at least 2 characters' };
  }
  
  if (cropName.trim().length > 50) {
    return { valid: false, error: 'Crop name is too long' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(cropName.trim())) {
    return { valid: false, error: 'Crop name should only contain letters' };
  }
  
  return { valid: true };
}
