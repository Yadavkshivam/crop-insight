import { NextRequest, NextResponse } from 'next/server';
import { fetchRealMarketData, generateReportsFromApiData } from '@/lib/agricultureApi';

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

    // Fetch market data to get raw records for generating reports
    const { rawRecords } = await fetchRealMarketData(cropName);
    
    // Generate farmer reports from API data
    const reports = generateReportsFromApiData(cropName, rawRecords);

    return NextResponse.json({
      success: true,
      data: reports,
      source: rawRecords.length > 0 ? 'data.gov.in' : 'fallback',
    });
  } catch (error) {
    console.error('Reports API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
