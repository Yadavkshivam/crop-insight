import { NextRequest, NextResponse } from 'next/server';
import { generateAIInsights } from '@/lib/aiService';
import { CropData, MarketData, FarmerReport } from '@/types';

interface AIRequestBody {
  cropData: CropData;
  marketData: MarketData;
  farmerReports: FarmerReport[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AIRequestBody = await request.json();

    const { cropData, marketData, farmerReports } = body;

    // Validate required data
    if (!cropData || !marketData || !farmerReports) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required data: cropData, marketData, and farmerReports are required' 
        },
        { status: 400 }
      );
    }

    // Generate AI insights
    const result = await generateAIInsights(cropData, marketData, farmerReports);

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Insights API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate AI insights' },
      { status: 500 }
    );
  }
}
