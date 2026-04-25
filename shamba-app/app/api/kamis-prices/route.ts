import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop') || 'Maize';
  const market = searchParams.get('market') || 'Kitale';

  const url = 'https://kamis.kilimo.go.ke/site/market';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ShambaNegotiatorAI/1.0 (Hackathon Demo)',
      },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch KAMIS');

    const html = await response.text();
    const $ = cheerio.load(html);

    const prices: any[] = [];

    // The KAMIS table structure typically has multiple rows
    // We look for rows that contain our crop or market
    $('table tr').each((i, row) => {
      const text = $(row).text().toLowerCase();
      if (text.includes(crop.toLowerCase()) && text.includes(market.toLowerCase())) {
        const cells = $(row).find('td').map((_, el) => $(el).text().trim()).get();
        if (cells.length >= 8) {
          prices.push({
            market: cells[0],
            commodity: cells[1],
            unit: cells[2],
            weight: cells[3],
            variety: cells[4],
            wholesale: cells[5],
            retail: cells[6],
            supply: cells[7],
            county: cells[8],
            date: cells[9],
          });
        }
      }
    });

    // If no data found on the live site, return the mock data for hackathon stability
    if (prices.length === 0) {
        return NextResponse.json({
            success: true,
            crop,
            market,
            data: [
                {
                    market: "Kitale",
                    commodity: "Maize",
                    wholesale: "3100",
                    retail: "3400",
                    supply: "Low",
                    county: "Trans Nzoia",
                    date: new Date().toLocaleDateString()
                }
            ],
            note: "Using fallback hackathon data as no live records matched the filters."
        });
    }

    return NextResponse.json({
      success: true,
      crop,
      market,
      data: prices.slice(0, 10),
      lastUpdated: new Date().toISOString(),
      source: 'KAMIS scraped',
    });

  } catch (error: any) {
    console.error("KAMIS Scraping Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
    }, { status: 500 });
  }
}
