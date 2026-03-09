import { NextRequest, NextResponse } from 'next/server';
import { fetchCropData, validateCropName } from '@/lib/cropService';

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

    // Validate input
    const validation = validateCropName(cropName);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Fetch crop data
    const result = await fetchCropData(cropName);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Crop API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
