import { NextRequest, NextResponse } from 'next/server';
import { mockSportsData, getAthletesBySport, getAllAthletes, getSportCategories } from '@/data/mockAthletes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get('sport');
  const category = searchParams.get('category');

  try {
    // Return specific sport data
    if (sport) {
      const athletes = getAthletesBySport(sport);
      if (athletes.length === 0) {
        return NextResponse.json(
          { error: 'Sport not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        sport,
        athletes,
        count: athletes.length
      });
    }

    // Return sport categories list
    if (category === 'list') {
      const categories = getSportCategories();
      return NextResponse.json({
        categories,
        totalSports: categories.length,
        totalAthletes: categories.reduce((sum, cat) => sum + cat.count, 0)
      });
    }

    // Return all data
    return NextResponse.json({
      sports: mockSportsData,
      summary: {
        totalSports: mockSportsData.length,
        totalAthletes: mockSportsData.reduce((sum, sport) => sum + sport.totalCount, 0)
      }
    });

  } catch (error) {
    console.error('Error fetching athletes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}