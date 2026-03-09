import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { CropData, MarketData, FarmerReport, AIInsights, ApiResponse } from '@/types';

/**
 * Generate AI insights using OpenAI
 */
async function generateOpenAIInsights(
  cropData: CropData,
  marketData: MarketData,
  farmerReports: FarmerReport[]
): Promise<AIInsights> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = buildPrompt(cropData, marketData, farmerReports);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an agricultural expert AI assistant. Analyze crop data and provide insights in JSON format.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content || '';
  return parseAIResponse(content);
}

/**
 * Generate AI insights using Google Gemini
 */
async function generateGeminiInsights(
  cropData: CropData,
  marketData: MarketData,
  farmerReports: FarmerReport[]
): Promise<AIInsights> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  // Use gemini-2.0-flash or gemini-pro as fallback
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = buildPrompt(cropData, marketData, farmerReports);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text();

  return parseAIResponse(content);
}

/**
 * Build the prompt for AI analysis
 */
function buildPrompt(
  cropData: CropData,
  marketData: MarketData,
  farmerReports: FarmerReport[]
): string {
  const reportsText = farmerReports
    .map(
      (r, i) =>
        `Report ${i + 1} (${r.region}): Yield Rating: ${r.yieldRating}/5, Pest Issues: ${r.pestIssues}, Weather: ${r.weatherImpact}, Sentiment: ${r.overallSentiment}`
    )
    .join('\n');

  return `
Analyze the following agricultural data and provide insights:

CROP DETAILS:
- Name: ${cropData.cropName}
- Scientific Name: ${cropData.scientificName}
- Growing Season: ${cropData.growingSeason}
- Soil Requirements: ${cropData.soilRequirements}
- Climate Requirements: ${cropData.climateRequirements}
- Average Yield: ${cropData.averageYield}
- Water Requirements: ${cropData.waterRequirements}

MARKET DATA:
- Current Price: ${marketData.currentPrice}
- Price Change: ${marketData.priceChange}
- Price Trend: ${marketData.priceTrend}
- Demand Level: ${marketData.demandLevel}
- Top Markets: ${marketData.topMarkets.join(', ')}

FARMER REPORTS:
${reportsText}

Please provide your analysis in the following JSON format:
{
  "summary": "A comprehensive 2-3 sentence summary of the crop's current performance and outlook",
  "keyInsights": ["insight1", "insight2", "insight3", "insight4"],
  "overallCondition": "Good" or "Moderate" or "Poor",
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "riskFactors": ["risk1", "risk2"]
}

Only respond with the JSON object, no additional text.
`;
}

/**
 * Parse AI response to AIInsights object
 */
function parseAIResponse(content: string): AIInsights {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        summary: parsed.summary || 'Unable to generate summary',
        keyInsights: parsed.keyInsights || [],
        overallCondition: parsed.overallCondition || 'Moderate',
        recommendations: parsed.recommendations || [],
        riskFactors: parsed.riskFactors || [],
      };
    }
  } catch (error) {
    console.error('Error parsing AI response:', error);
  }

  // Return default insights if parsing fails
  return {
    summary: 'Unable to generate AI insights. Please check the API configuration.',
    keyInsights: ['Data analysis pending'],
    overallCondition: 'Moderate',
    recommendations: ['Ensure proper API key configuration'],
    riskFactors: ['AI service unavailable'],
  };
}

/**
 * Generate fallback insights without AI
 */
function generateFallbackInsights(
  cropData: CropData,
  marketData: MarketData,
  farmerReports: FarmerReport[]
): AIInsights {
  const avgYieldRating =
    farmerReports.reduce((sum, r) => sum + r.yieldRating, 0) / farmerReports.length;
  const positiveReports = farmerReports.filter((r) => r.overallSentiment === 'positive').length;
  const negativeReports = farmerReports.filter((r) => r.overallSentiment === 'negative').length;

  let condition: 'Good' | 'Moderate' | 'Poor';
  if (avgYieldRating >= 4 && positiveReports > negativeReports) {
    condition = 'Good';
  } else if (avgYieldRating < 3 || negativeReports > positiveReports) {
    condition = 'Poor';
  } else {
    condition = 'Moderate';
  }

  const summary = `${cropData.cropName} is currently showing ${condition.toLowerCase()} performance with an average farmer yield rating of ${avgYieldRating.toFixed(1)}/5. Market price is ${marketData.currentPrice} with ${marketData.priceTrend} trend and ${marketData.demandLevel.toLowerCase()} demand.`;

  return {
    summary,
    keyInsights: [
      `Average yield rating: ${avgYieldRating.toFixed(1)}/5 across ${farmerReports.length} regions`,
      `Market trend is ${marketData.priceTrend} with ${marketData.demandLevel.toLowerCase()} demand`,
      `${positiveReports} positive and ${negativeReports} negative farmer reports`,
      `Growing season: ${cropData.growingSeason}`,
    ],
    overallCondition: condition,
    recommendations: [
      `Monitor ${farmerReports[0]?.pestIssues?.toLowerCase() || 'pest conditions'} in affected areas`,
      'Ensure adequate water management during critical growth phases',
      `Consider ${marketData.topMarkets[0]} and ${marketData.topMarkets[1]} as primary markets`,
    ],
    riskFactors: farmerReports
      .filter((r) => r.overallSentiment === 'negative')
      .map((r) => `${r.region}: ${r.weatherImpact}`)
      .slice(0, 2),
  };
}

/**
 * Main function to generate AI insights
 */
export async function generateAIInsights(
  cropData: CropData,
  marketData: MarketData,
  farmerReports: FarmerReport[]
): Promise<ApiResponse<AIInsights>> {
  try {
    const provider = process.env.AI_PROVIDER || 'gemini';
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let insights: AIInsights;

    if (provider === 'openai' && openaiKey) {
      insights = await generateOpenAIInsights(cropData, marketData, farmerReports);
    } else if (provider === 'gemini' && geminiKey) {
      insights = await generateGeminiInsights(cropData, marketData, farmerReports);
    } else {
      // Use fallback insights generation if no API key is configured
      console.log('No AI API key configured, using fallback insights generation');
      insights = generateFallbackInsights(cropData, marketData, farmerReports);
    }

    return {
      success: true,
      data: insights,
    };
  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    // Return fallback insights on error
    const fallbackInsights = generateFallbackInsights(cropData, marketData, farmerReports);
    return {
      success: true,
      data: fallbackInsights,
    };
  }
}
