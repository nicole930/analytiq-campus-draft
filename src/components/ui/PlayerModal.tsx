'use client';

import { useState } from 'react';
import { Athlete } from '@/types/athlete';
import MediaGallery from './MediaGallery';

interface PlayerModalProps {
  athlete: Athlete | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWatchlist: (athlete: Athlete) => void;
  isOnWatchlist: boolean;
}

export default function PlayerModal({ athlete, isOpen, onClose, onAddToWatchlist, isOnWatchlist }: PlayerModalProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'media'>('stats');

  if (!isOpen || !athlete) return null;

  const renderDetailedStats = () => {
    const stats = athlete.stats as any;

    switch (athlete.sport) {
      case 'Football':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Offensive Stats</h4>
              <div className="space-y-2 text-sm">
                {stats.passingYards && (
                  <>
                    <div className="flex justify-between">
                      <span>Passing Yards:</span>
                      <span className="font-medium">{stats.passingYards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passing TDs:</span>
                      <span className="font-medium">{stats.passingTDs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completions:</span>
                      <span className="font-medium">{stats.completions}/{stats.attempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion %:</span>
                      <span className="font-medium">{((stats.completions / stats.attempts) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interceptions:</span>
                      <span className="font-medium">{stats.interceptions}</span>
                    </div>
                  </>
                )}
                {stats.rushingYards && (
                  <>
                    <div className="flex justify-between">
                      <span>Rushing Yards:</span>
                      <span className="font-medium">{stats.rushingYards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rushing TDs:</span>
                      <span className="font-medium">{stats.rushingTDs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carries:</span>
                      <span className="font-medium">{stats.carries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yards/Carry:</span>
                      <span className="font-medium">{(stats.rushingYards / stats.carries).toFixed(1)}</span>
                    </div>
                  </>
                )}
                {stats.receivingYards && (
                  <>
                    <div className="flex justify-between">
                      <span>Receiving Yards:</span>
                      <span className="font-medium">{stats.receivingYards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receiving TDs:</span>
                      <span className="font-medium">{stats.receivingTDs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receptions:</span>
                      <span className="font-medium">{stats.receptions}/{stats.targets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yards/Reception:</span>
                      <span className="font-medium">{(stats.receivingYards / stats.receptions).toFixed(1)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Defensive/Special Teams</h4>
              <div className="space-y-2 text-sm">
                {stats.tackles && (
                  <>
                    <div className="flex justify-between">
                      <span>Tackles:</span>
                      <span className="font-medium">{stats.tackles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sacks:</span>
                      <span className="font-medium">{stats.sacks || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interceptions:</span>
                      <span className="font-medium">{stats.interceptionsCaught || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pass Deflections:</span>
                      <span className="font-medium">{stats.passDeflections || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forced Fumbles:</span>
                      <span className="font-medium">{stats.forcedFumbles || 0}</span>
                    </div>
                  </>
                )}
                {stats.fieldGoalsMade && (
                  <>
                    <div className="flex justify-between">
                      <span>Field Goals:</span>
                      <span className="font-medium">{stats.fieldGoalsMade}/{stats.fieldGoalsAttempted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FG Percentage:</span>
                      <span className="font-medium">{((stats.fieldGoalsMade / stats.fieldGoalsAttempted) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extra Points:</span>
                      <span className="font-medium">{stats.extraPointsMade}/{stats.extraPointsAttempted}</span>
                    </div>
                  </>
                )}
                {stats.puntingAverage && (
                  <div className="flex justify-between">
                    <span>Punting Average:</span>
                    <span className="font-medium">{stats.puntingAverage} yards</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Basketball':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Scoring & Shooting</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Points Per Game:</span>
                  <span className="font-medium">{(stats.points / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Points:</span>
                  <span className="font-medium">{stats.points}</span>
                </div>
                <div className="flex justify-between">
                  <span>Field Goal %:</span>
                  <span className="font-medium">{((stats.fieldGoalsMade / stats.fieldGoalsAttempted) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>3-Point %:</span>
                  <span className="font-medium">{((stats.threePointersMade / stats.threePointersAttempted) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Free Throw %:</span>
                  <span className="font-medium">{((stats.freeThrowsMade / stats.freeThrowsAttempted) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Minutes/Game:</span>
                  <span className="font-medium">{(stats.minutesPlayed / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">All-Around Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rebounds/Game:</span>
                  <span className="font-medium">{(stats.rebounds / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assists/Game:</span>
                  <span className="font-medium">{(stats.assists / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Steals/Game:</span>
                  <span className="font-medium">{(stats.steals / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blocks/Game:</span>
                  <span className="font-medium">{(stats.blocks / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Turnovers/Game:</span>
                  <span className="font-medium">{(stats.turnovers / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fouls/Game:</span>
                  <span className="font-medium">{(stats.fouls / athlete.gamesPlayed).toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Baseball':
        return (
          <div className="grid grid-cols-2 gap-6">
            {stats.battingAverage ? (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Batting Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Batting Average:</span>
                    <span className="font-medium">{stats.battingAverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On-Base %:</span>
                    <span className="font-medium">{stats.onBasePercentage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slugging %:</span>
                    <span className="font-medium">{stats.sluggingPercentage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Runs:</span>
                    <span className="font-medium">{stats.homeRuns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RBIs:</span>
                    <span className="font-medium">{stats.rbi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Runs:</span>
                    <span className="font-medium">{stats.runs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hits:</span>
                    <span className="font-medium">{stats.hits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doubles:</span>
                    <span className="font-medium">{stats.doubles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Triples:</span>
                    <span className="font-medium">{stats.triples}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stolen Bases:</span>
                    <span className="font-medium">{stats.stolenBases}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Pitching Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ERA:</span>
                    <span className="font-medium">{stats.era}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WHIP:</span>
                    <span className="font-medium">{stats.whip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wins:</span>
                    <span className="font-medium">{stats.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Losses:</span>
                    <span className="font-medium">{stats.losses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saves:</span>
                    <span className="font-medium">{stats.saves}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Innings Pitched:</span>
                    <span className="font-medium">{stats.inningsPitched}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strikeouts:</span>
                    <span className="font-medium">{stats.strikeoutsPitched}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Walks:</span>
                    <span className="font-medium">{stats.walksAllowed}</span>
                  </div>
                </div>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Additional Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Games Played:</span>
                  <span className="font-medium">{athlete.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Games Started:</span>
                  <span className="font-medium">{athlete.gamesStarted}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Soccer':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Offensive Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Goals:</span>
                  <span className="font-medium">{stats.goals}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assists:</span>
                  <span className="font-medium">{stats.assists}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shots:</span>
                  <span className="font-medium">{stats.shots}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shots on Goal:</span>
                  <span className="font-medium">{stats.shotsOnGoal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shot Accuracy:</span>
                  <span className="font-medium">{stats.shots > 0 ? ((stats.shotsOnGoal / stats.shots) * 100).toFixed(1) : 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Minutes Played:</span>
                  <span className="font-medium">{stats.minutesPlayed}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Defensive/Disciplinary</h4>
              <div className="space-y-2 text-sm">
                {stats.saves && (
                  <>
                    <div className="flex justify-between">
                      <span>Saves:</span>
                      <span className="font-medium">{stats.saves}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goals Allowed:</span>
                      <span className="font-medium">{stats.goalsAllowed}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span>Yellow Cards:</span>
                  <span className="font-medium">{stats.yellowCards}</span>
                </div>
                <div className="flex justify-between">
                  <span>Red Cards:</span>
                  <span className="font-medium">{stats.redCards}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fouls:</span>
                  <span className="font-medium">{stats.fouls}</span>
                </div>
                <div className="flex justify-between">
                  <span>Offsides:</span>
                  <span className="font-medium">{stats.offsides}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Performance Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Games/Meets:</span>
                <span className="font-medium">{athlete.gamesPlayed}</span>
              </div>
              {stats.personalBest && (
                <div className="flex justify-between">
                  <span>Personal Best:</span>
                  <span className="font-medium">{stats.personalBest}</span>
                </div>
              )}
              {stats.seasonBest && (
                <div className="flex justify-between">
                  <span>Season Best:</span>
                  <span className="font-medium">{stats.seasonBest}</span>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b bg-blue-50">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">
                {athlete.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{athlete.name}</h2>
                <div className="flex gap-3 mt-1">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                    {athlete.sport}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                    {athlete.position}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                    {athlete.year}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Physical</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span className="font-medium">{athlete.height}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span className="font-medium">{athlete.weight} lbs</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Academic</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="font-medium">{athlete.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hometown:</span>
                  <span className="font-medium">{athlete.hometown}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Season</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Games Played:</span>
                  <span className="font-medium">{athlete.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Games Started:</span>
                  <span className="font-medium">{athlete.gamesStarted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-6 border-b mb-6">
            <button
              onClick={() => setActiveTab('stats')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Statistics
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'media'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎥 Media ({athlete.media?.length || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'stats' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Season Statistics</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  {renderDetailedStats()}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Media Gallery</h3>
                <MediaGallery
                  media={athlete.media || []}
                  athleteName={athlete.name}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onAddToWatchlist(athlete)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isOnWatchlist
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isOnWatchlist ? '✓ On Watchlist' : '★ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}