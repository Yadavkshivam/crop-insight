import { NextRequest, NextResponse } from 'next/server';
import { fetchRealMarketData } from '@/lib/agricultureApi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cropName = searchParams.get('crop');

    if (!cropName) {
      return NextResponse.json(
        { success: false, error: 'Crop name is required' },
        { status: 400 }
      );
    }

    // Fetch real market data from data.gov.in API
    const { marketData, rawRecords } = await fetchRealMarketData(cropName);

    return NextResponse.json({
      success: true,
      data: marketData,
      recordCount: rawRecords.length,
      source: rawRecords.length > 0 ? 'data.gov.in' : 'fallback',
    });
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
