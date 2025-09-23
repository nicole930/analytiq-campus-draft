import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAllAthletes } from '@/data/mockAthletes';
import { Athlete } from '@/types/athlete';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SearchCriteria {
  sports?: string[];
  positions?: string[];
  years?: string[];
  minHeight?: number;
  maxHeight?: number;
  minWeight?: number;
  maxWeight?: number;
  hometowns?: string[];
  statsFilters?: {
    [key: string]: {
      min?: number;
      max?: number;
      operation?: 'greater' | 'less' | 'equal' | 'range';
    };
  };
  keywords?: string[];
}

async function parseSearchQuery(query: string): Promise<SearchCriteria> {
  try {
    const prompt = `
Parse this natural language search query for athletes and extract search criteria in JSON format:
"${query}"

Available sports: Football, Basketball, Baseball, Soccer, Track & Field, Swimming, Tennis, Volleyball
Available positions: QB, RB, WR, TE, OL, DL, LB, CB, S, K, P (Football), PG, SG, SF, PF, C (Basketball), P, C, 1B, 2B, 3B, SS, LF, CF, RF, DH (Baseball), GK, D, M, F (Soccer), etc.
Available years: FR, SO, JR, SR, GR

Return JSON with these possible fields:
{
  "sports": ["sport names"],
  "positions": ["position codes"],
  "years": ["year codes"],
  "minHeight": number_in_inches,
  "maxHeight": number_in_inches,
  "minWeight": number_in_pounds,
  "maxWeight": number_in_pounds,
  "hometowns": ["city, state"],
  "statsFilters": {
    "statName": {"min": number, "max": number, "operation": "greater|less|equal|range"}
  },
  "keywords": ["descriptive words"]
}

Examples:
- "tall basketball centers" → {"sports": ["Basketball"], "positions": ["C"], "minHeight": 78}
- "fast running backs from California" → {"sports": ["Football"], "positions": ["RB"], "hometowns": ["CA"], "keywords": ["fast"]}
- "quarterbacks with over 3000 passing yards" → {"sports": ["Football"], "positions": ["QB"], "statsFilters": {"passingYards": {"min": 3000, "operation": "greater"}}}

Only return valid JSON, no explanation.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 500,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No response from OpenAI');

    return JSON.parse(result);
  } catch (error) {
    console.error('Error parsing search query:', error);
    // Fallback to keyword search
    return { keywords: [query] };
  }
}

function heightStringToInches(heightStr: string): number {
  const match = heightStr.match(/(\d+)'(\d+)"/);
  if (match) {
    return parseInt(match[1]) * 12 + parseInt(match[2]);
  }
  return 0;
}

function matchesSearchCriteria(athlete: Athlete, criteria: SearchCriteria): boolean {
  // Check sport
  if (criteria.sports && !criteria.sports.includes(athlete.sport)) {
    return false;
  }

  // Check position
  if (criteria.positions && !criteria.positions.includes(athlete.position)) {
    return false;
  }

  // Check year
  if (criteria.years && !criteria.years.includes(athlete.year)) {
    return false;
  }

  // Check height
  const heightInches = heightStringToInches(athlete.height);
  if (criteria.minHeight && heightInches < criteria.minHeight) {
    return false;
  }
  if (criteria.maxHeight && heightInches > criteria.maxHeight) {
    return false;
  }

  // Check weight
  if (criteria.minWeight && athlete.weight < criteria.minWeight) {
    return false;
  }
  if (criteria.maxWeight && athlete.weight > criteria.maxWeight) {
    return false;
  }

  // Check hometown
  if (criteria.hometowns && criteria.hometowns.length > 0) {
    const matchesHometown = criteria.hometowns.some(location =>
      athlete.hometown.toLowerCase().includes(location.toLowerCase())
    );
    if (!matchesHometown) {
      return false;
    }
  }

  // Check stats
  if (criteria.statsFilters) {
    const stats = athlete.stats as any;
    for (const [statName, filter] of Object.entries(criteria.statsFilters)) {
      const statValue = stats[statName];
      if (statValue === undefined || statValue === null) continue;

      switch (filter.operation) {
        case 'greater':
          if (filter.min !== undefined && statValue <= filter.min) return false;
          break;
        case 'less':
          if (filter.max !== undefined && statValue >= filter.max) return false;
          break;
        case 'equal':
          if (filter.min !== undefined && statValue !== filter.min) return false;
          break;
        case 'range':
          if (filter.min !== undefined && statValue < filter.min) return false;
          if (filter.max !== undefined && statValue > filter.max) return false;
          break;
      }
    }
  }

  // Check keywords (fuzzy match on name, position, sport, hometown)
  if (criteria.keywords && criteria.keywords.length > 0) {
    const searchText = `${athlete.name} ${athlete.position} ${athlete.sport} ${athlete.hometown}`.toLowerCase();
    const matchesKeywords = criteria.keywords.some(keyword =>
      searchText.includes(keyword.toLowerCase())
    );
    if (!matchesKeywords) {
      return false;
    }
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { query, useAI = false } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json({ athletes: [], criteria: null, aiUsed: false });
    }

    const allAthletes = getAllAthletes();
    let searchCriteria: SearchCriteria;
    let aiUsed = false;

    if (useAI) {
      // Use AI to parse the query
      searchCriteria = await parseSearchQuery(query);
      aiUsed = true;
    } else {
      // Simple keyword search
      searchCriteria = { keywords: [query] };
    }

    // Filter athletes based on criteria
    const matchingAthletes = allAthletes.filter(athlete =>
      matchesSearchCriteria(athlete, searchCriteria)
    );

    // Sort by relevance (you could implement more sophisticated scoring)
    const sortedAthletes = matchingAthletes.sort((a, b) => {
      // Prioritize exact name matches
      if (searchCriteria.keywords) {
        const aNameMatch = searchCriteria.keywords.some(keyword =>
          a.name.toLowerCase().includes(keyword.toLowerCase())
        );
        const bNameMatch = searchCriteria.keywords.some(keyword =>
          b.name.toLowerCase().includes(keyword.toLowerCase())
        );
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({
      athletes: sortedAthletes.slice(0, 50), // Limit to 50 results
      criteria: searchCriteria,
      aiUsed,
      total: matchingAthletes.length
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}