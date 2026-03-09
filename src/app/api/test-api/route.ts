import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const crop = searchParams.get('crop') || 'Wheat';
  
  const apiKey = process.env.AGRICULTURE_API_KEY;
  const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=10&filters[commodity]=${encodeURIComponent(crop)}`;
  
  try {
    console.log('\n🔍 Testing API with crop:', crop);
    console.log('📡 API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('\n✅ API RESPONSE RECEIVED:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('\n📊 DATA STRUCTURE:');
    console.log(JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      statusCode: response.status,
      crop: crop,
      apiUrl: apiUrl.replace(apiKey || '', '***API_KEY***'),
      data: data,
    }, { status: 200 });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
