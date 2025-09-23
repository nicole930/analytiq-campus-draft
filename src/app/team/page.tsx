'use client';

import { useState } from 'react';
import Layout from '@/components/ui/Layout';
import { Athlete } from '@/types/athlete';

export default function TeamPage() {
  // Mock team data - in a real app this would come from a database
  const [team] = useState<Athlete[]>([
    {
      id: '1',
      name: 'Marcus Johnson',
      position: 'QB',
      year: 'JR',
      sport: 'Football',
      team: 'University Team',
      height: '6\'2"',
      weight: 205,
      hometown: 'Atlanta, GA',
      gamesPlayed: 12,
      gamesStarted: 12,
      stats: {
        passingYards: 3245,
        passingTDs: 28,
        interceptions: 8,
        completions: 245,
        attempts: 380,
        rushingYards: 450,
        rushingTDs: 6
      }
    },
    {
      id: '2',
      name: 'Sarah Williams',
      position: 'PG',
      year: 'SR',
      sport: 'Basketball',
      team: 'University Team',
      height: '5\'7"',
      weight: 140,
      hometown: 'Chicago, IL',
      gamesPlayed: 28,
      gamesStarted: 28,
      stats: {
        points: 420,
        rebounds: 112,
        assists: 168,
        steals: 56,
        blocks: 8,
        fieldGoalsMade: 145,
        fieldGoalsAttempted: 320,
        threePointersMade: 78,
        threePointersAttempted: 195,
        freeThrowsMade: 52,
        freeThrowsAttempted: 65,
        turnovers: 89,
        fouls: 67,
        minutesPlayed: 840
      }
    }
  ]);

  const [weeklyScores] = useState([
    { week: 1, score: 145.5, rank: 2 },
    { week: 2, score: 132.0, rank: 4 },
    { week: 3, score: 167.5, rank: 1 },
    { week: 4, score: 128.5, rank: 5 },
    { week: 5, score: 155.0, rank: 3 }
  ]);

  const calculateFantasyPoints = (athlete: Athlete): number => {
    const stats = athlete.stats as any;
    let points = 0;

    // Football scoring
    if (athlete.sport === 'Football') {
      points += (stats.passingYards || 0) * 0.04; // 1 point per 25 yards
      points += (stats.passingTDs || 0) * 4;
      points += (stats.interceptions || 0) * -2;
      points += (stats.rushingYards || 0) * 0.1; // 1 point per 10 yards
      points += (stats.rushingTDs || 0) * 6;
      points += (stats.receivingYards || 0) * 0.1;
      points += (stats.receivingTDs || 0) * 6;
      points += (stats.tackles || 0) * 1;
      points += (stats.sacks || 0) * 2;
    }

    // Basketball scoring
    if (athlete.sport === 'Basketball') {
      points += (stats.points || 0) * 1;
      points += (stats.rebounds || 0) * 1.2;
      points += (stats.assists || 0) * 1.5;
      points += (stats.steals || 0) * 2;
      points += (stats.blocks || 0) * 2;
      points += (stats.turnovers || 0) * -1;
    }

    return Math.round(points * 10) / 10;
  };

  const totalSeasonPoints = team.reduce((sum, athlete) => sum + calculateFantasyPoints(athlete), 0);
  const averageWeeklyScore = weeklyScores.reduce((sum, week) => sum + week.score, 0) / weeklyScores.length;

  return (
    <Layout background="light">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900">My Team</h1>
            <p className="text-gray-600 mt-2">Manage your fantasy roster and track performance</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Team Overview */}
            <div className="lg:col-span-2">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Points</p>
                      <p className="text-2xl font-bold text-blue-600">{totalSeasonPoints.toFixed(1)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Avg/Week</p>
                      <p className="text-2xl font-bold text-green-600">{averageWeeklyScore.toFixed(1)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Roster Size</p>
                      <p className="text-2xl font-bold text-yellow-600">{team.length}/12</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Roster */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Current Roster</h2>
                </div>
                <div className="p-6">
                  {team.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Ready to Draft?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        You haven't drafted any players yet. Join a draft to start building your team!
                      </p>
                      <a
                        href="/draft"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Join Draft
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {team.map((athlete) => {
                        const fantasyPoints = calculateFantasyPoints(athlete);
                        return (
                          <div key={athlete.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">{athlete.name}</h3>
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {athlete.sport}
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    {athlete.position}
                                  </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600">
                                  <span>{athlete.year}</span>
                                  <span>{athlete.height}, {athlete.weight} lbs</span>
                                  <span>{athlete.hometown}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                  {fantasyPoints}
                                </div>
                                <div className="text-sm text-gray-500">Fantasy Pts</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly Performance */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
                <div className="space-y-3">
                  {weeklyScores.map((week) => (
                    <div key={week.week} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Week {week.week}</div>
                        <div className="text-sm text-gray-600">Rank #{week.rank}</div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {week.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/draft"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Join New Draft
                  </a>
                  <a
                    href="/browse"
                    className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Browse Players
                  </a>
                  <a
                    href="/leaderboard"
                    className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View Rankings
                  </a>
                </div>
              </div>

              {/* Team Needs */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Team Composition</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Football</span>
                    <span>{team.filter(p => p.sport === 'Football').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basketball</span>
                    <span>{team.filter(p => p.sport === 'Basketball').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Baseball</span>
                    <span>{team.filter(p => p.sport === 'Baseball').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Sports</span>
                    <span>{team.filter(p => !['Football', 'Basketball', 'Baseball'].includes(p.sport)).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}