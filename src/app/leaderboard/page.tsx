'use client';

import { useState } from 'react';
import Layout from '@/components/ui/Layout';

interface LeaderboardEntry {
  rank: number;
  username: string;
  teamName: string;
  totalPoints: number;
  weeklyPoints: number;
  wins: number;
  losses: number;
  trend: 'up' | 'down' | 'same';
}

export default function LeaderboardPage() {
  const [selectedWeek, setSelectedWeek] = useState('overall');

  // Mock leaderboard data
  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: 'CampusChamp23',
      teamName: 'Thunderbirds',
      totalPoints: 1247.5,
      weeklyPoints: 167.5,
      wins: 4,
      losses: 1,
      trend: 'up'
    },
    {
      rank: 2,
      username: 'You',
      teamName: 'Your Team',
      totalPoints: 1195.0,
      weeklyPoints: 145.2,
      wins: 3,
      losses: 2,
      trend: 'same'
    },
    {
      rank: 3,
      username: 'SportsGuru2024',
      teamName: 'Dynasty Dreams',
      totalPoints: 1178.5,
      weeklyPoints: 132.0,
      wins: 3,
      losses: 2,
      trend: 'down'
    },
    {
      rank: 4,
      username: 'FantasyFan',
      teamName: 'Blue Lightning',
      totalPoints: 1156.0,
      weeklyPoints: 128.5,
      wins: 2,
      losses: 3,
      trend: 'up'
    },
    {
      rank: 5,
      username: 'AthleteAnalyst',
      teamName: 'Stat Masters',
      totalPoints: 1134.5,
      weeklyPoints: 155.0,
      wins: 2,
      losses: 3,
      trend: 'up'
    },
    {
      rank: 6,
      username: 'DraftDominator',
      teamName: 'Campus Kings',
      totalPoints: 1098.0,
      weeklyPoints: 119.5,
      wins: 2,
      losses: 3,
      trend: 'down'
    },
    {
      rank: 7,
      username: 'RookieManager',
      teamName: 'Rising Stars',
      totalPoints: 1045.5,
      weeklyPoints: 134.0,
      wins: 1,
      losses: 4,
      trend: 'up'
    },
    {
      rank: 8,
      username: 'VeteranCoach',
      teamName: 'Old School',
      totalPoints: 987.0,
      weeklyPoints: 102.5,
      wins: 1,
      losses: 4,
      trend: 'down'
    }
  ]);

  const weeks = [
    { value: 'overall', label: 'Season Total' },
    { value: 'week5', label: 'Week 5' },
    { value: 'week4', label: 'Week 4' },
    { value: 'week3', label: 'Week 3' },
    { value: 'week2', label: 'Week 2' },
    { value: 'week1', label: 'Week 1' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗️</span>;
      case 'down':
        return <span className="text-red-500">↘️</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <Layout background="light">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-600 mt-2">See how you stack up against other managers</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {weeks.map((week) => (
                    <option key={week.value} value={week.value}>
                      {week.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">
                    {selectedWeek === 'overall' ? 'Season Standings' : `Week ${selectedWeek.slice(-1)} Results`}
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Record
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard.map((entry) => (
                        <tr
                          key={entry.rank}
                          className={`hover:bg-gray-50 ${
                            entry.username === 'You' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{getRankBadge(entry.rank)}</span>
                              <span className="text-lg font-bold text-gray-900">#{entry.rank}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{entry.teamName}</div>
                              <div className="text-sm text-gray-500">@{entry.username}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-blue-600">
                              {selectedWeek === 'overall' ? entry.totalPoints : entry.weeklyPoints}
                            </div>
                            {selectedWeek === 'overall' && (
                              <div className="text-sm text-gray-500">
                                Last week: {entry.weeklyPoints}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {entry.wins}-{entry.losses}
                            </span>
                            <div className="text-xs text-gray-500">
                              {((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(0)}% win rate
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getTrendIcon(entry.trend)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Your Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Your Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Rank</span>
                    <span className="text-2xl font-bold text-blue-600">#2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Points</span>
                    <span className="font-semibold">1,195.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Season Record</span>
                    <span className="font-semibold">3-2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Points Behind #1</span>
                    <span className="font-semibold text-red-600">52.5</span>
                  </div>
                </div>
              </div>

              {/* This Week's Top Performers */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Week 5 Top Performers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium">CampusChamp23</div>
                      <div className="text-sm text-gray-600">Thunderbirds</div>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">167.5</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">AthleteAnalyst</div>
                      <div className="text-sm text-gray-600">Stat Masters</div>
                    </div>
                    <div className="text-lg font-bold text-gray-600">155.0</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">You</div>
                      <div className="text-sm text-gray-600">Your Team</div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">145.2</div>
                  </div>
                </div>
              </div>

              {/* League Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">League Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Teams</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weeks Completed</span>
                    <span className="font-medium">5/12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">136.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Highest Score</span>
                    <span className="font-medium">178.5</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/team"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View My Team
                  </a>
                  <a
                    href="/browse"
                    className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Research Players
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}