import { SportCategory } from '../types/athlete';
import {
  generateFootballPlayers,
  generateBasketballPlayers,
  generateBaseballPlayers,
  generateSoccerPlayers,
  generateTrackFieldAthletes,
  generateSwimmingAthletes,
  generateTennisPlayers,
  generateVolleyballPlayers
} from './generator';

// Generate athletes for each sport with counts between 23-100
const footballCount = 85;
const basketballMCount = 67;
const basketballWCount = 43;
const baseballCount = 78;
const softballCount = 34;
const soccerMCount = 56;
const soccerWCount = 48;
const trackFieldMCount = 92;
const trackFieldWCount = 87;
const swimmingMCount = 45;
const swimmingWCount = 52;
const tennisMCount = 29;
const tennisWCount = 31;
const volleyballCount = 38;

export const mockSportsData: SportCategory[] = [
  {
    name: 'Football',
    athletes: generateFootballPlayers(footballCount),
    totalCount: footballCount
  },
  {
    name: 'Men\'s Basketball',
    athletes: generateBasketballPlayers(basketballMCount),
    totalCount: basketballMCount
  },
  {
    name: 'Women\'s Basketball',
    athletes: generateBasketballPlayers(basketballWCount),
    totalCount: basketballWCount
  },
  {
    name: 'Baseball',
    athletes: generateBaseballPlayers(baseballCount),
    totalCount: baseballCount
  },
  {
    name: 'Softball',
    athletes: generateBaseballPlayers(softballCount),
    totalCount: softballCount
  },
  {
    name: 'Men\'s Soccer',
    athletes: generateSoccerPlayers(soccerMCount),
    totalCount: soccerMCount
  },
  {
    name: 'Women\'s Soccer',
    athletes: generateSoccerPlayers(soccerWCount),
    totalCount: soccerWCount
  },
  {
    name: 'Men\'s Track & Field',
    athletes: generateTrackFieldAthletes(trackFieldMCount),
    totalCount: trackFieldMCount
  },
  {
    name: 'Women\'s Track & Field',
    athletes: generateTrackFieldAthletes(trackFieldWCount),
    totalCount: trackFieldWCount
  },
  {
    name: 'Men\'s Swimming',
    athletes: generateSwimmingAthletes(swimmingMCount),
    totalCount: swimmingMCount
  },
  {
    name: 'Women\'s Swimming',
    athletes: generateSwimmingAthletes(swimmingWCount),
    totalCount: swimmingWCount
  },
  {
    name: 'Men\'s Tennis',
    athletes: generateTennisPlayers(tennisMCount),
    totalCount: tennisMCount
  },
  {
    name: 'Women\'s Tennis',
    athletes: generateTennisPlayers(tennisWCount),
    totalCount: tennisWCount
  },
  {
    name: 'Volleyball',
    athletes: generateVolleyballPlayers(volleyballCount),
    totalCount: volleyballCount
  }
];

// Helper function to get athletes by sport
export function getAthletesBySport(sportName: string) {
  const sport = mockSportsData.find(s => s.name === sportName);
  return sport ? sport.athletes : [];
}

// Helper function to get all athletes
export function getAllAthletes() {
  return mockSportsData.flatMap(sport => sport.athletes);
}

// Helper function to get sport categories
export function getSportCategories() {
  return mockSportsData.map(sport => ({
    name: sport.name,
    count: sport.totalCount
  }));
}

// Summary statistics
export const mockDataSummary = {
  totalSports: mockSportsData.length,
  totalAthletes: mockSportsData.reduce((sum, sport) => sum + sport.totalCount, 0),
  sportBreakdown: mockSportsData.map(sport => ({
    sport: sport.name,
    count: sport.totalCount
  }))
};

console.log('Mock Data Generated:', mockDataSummary);