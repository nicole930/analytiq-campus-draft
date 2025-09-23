'use client';

import { useState, useEffect } from 'react';
import { SportCategory, Athlete } from '@/types/athlete';
import PlayerModal from '@/components/ui/PlayerModal';
import AISearchBar from '@/components/ui/AISearchBar';

export default function BrowsePage() {
  const [sportsData, setSportsData] = useState<SportCategory[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]); // Store athlete IDs
  const [searchResults, setSearchResults] = useState<Athlete[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<any>(null);

  useEffect(() => {
    fetchSportsCategories();
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('athleteWatchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const fetchSportsCategories = async () => {
    try {
      const response = await fetch('/api/athletes?category=list');
      const data = await response.json();
      setSportsData(data.categories.map((cat: any) => ({
        name: cat.name,
        athletes: [],
        totalCount: cat.count
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sports categories:', error);
      setLoading(false);
    }
  };

  const fetchAthletesBySport = async (sportName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/athletes?sport=${encodeURIComponent(sportName)}`);
      const data = await response.json();
      setAthletes(data.athletes);
      setSelectedSport(sportName);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching athletes:', error);
      setLoading(false);
    }
  };

  const openPlayerModal = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const closePlayerModal = () => {
    setSelectedAthlete(null);
    setIsModalOpen(false);
  };

  const addToWatchlist = (athlete: Athlete) => {
    const newWatchlist = watchlist.includes(athlete.id)
      ? watchlist.filter(id => id !== athlete.id)
      : [...watchlist, athlete.id];

    setWatchlist(newWatchlist);
    localStorage.setItem('athleteWatchlist', JSON.stringify(newWatchlist));
  };

  const isOnWatchlist = (athleteId: string) => {
    return watchlist.includes(athleteId);
  };

  const handleSearchResults = (results: any) => {
    setSearchResults(results.athletes);
    setSearchCriteria(results.criteria);
    setIsSearchMode(true);
    setSelectedSport(''); // Clear sport selection when searching
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchCriteria(null);
    setIsSearchMode(false);
  };

  const getCurrentAthletes = () => {
    if (isSearchMode) {
      return searchResults;
    }
    return athletes;
  };

  const getCurrentTitle = () => {
    if (isSearchMode) {
      return searchCriteria?.aiUsed ? 'AI Search Results' : 'Search Results';
    }
    return selectedSport || 'Select a Sport';
  };

  const getCurrentSubtitle = () => {
    if (isSearchMode) {
      const count = searchResults.length;
      const aiText = searchCriteria?.aiUsed ? ' (powered by AI)' : '';
      return `${count} ${count === 1 ? 'athlete' : 'athletes'} found${aiText}`;
    }
    return selectedSport ? `${athletes.length} athletes` : 'Choose a sport category to view athletes';
  };

  const renderAthleteStats = (athlete: Athlete) => {
    const stats = athlete.stats as any;

    return (
      <div className="mt-2 text-sm text-gray-600">
        {athlete.sport === 'Football' && (
          <div className="grid grid-cols-2 gap-1">
            {stats.passingYards && <span>Pass Yds: {stats.passingYards}</span>}
            {stats.passingTDs && <span>Pass TDs: {stats.passingTDs}</span>}
            {stats.rushingYards && <span>Rush Yds: {stats.rushingYards}</span>}
            {stats.rushingTDs && <span>Rush TDs: {stats.rushingTDs}</span>}
            {stats.receivingYards && <span>Rec Yds: {stats.receivingYards}</span>}
            {stats.receivingTDs && <span>Rec TDs: {stats.receivingTDs}</span>}
            {stats.tackles && <span>Tackles: {stats.tackles}</span>}
            {stats.sacks && <span>Sacks: {stats.sacks}</span>}
          </div>
        )}

        {athlete.sport === 'Basketball' && (
          <div className="grid grid-cols-3 gap-1">
            <span>PPG: {(stats.points / athlete.gamesPlayed).toFixed(1)}</span>
            <span>RPG: {(stats.rebounds / athlete.gamesPlayed).toFixed(1)}</span>
            <span>APG: {(stats.assists / athlete.gamesPlayed).toFixed(1)}</span>
            <span>FG%: {((stats.fieldGoalsMade / stats.fieldGoalsAttempted) * 100).toFixed(1)}%</span>
            <span>3P%: {((stats.threePointersMade / stats.threePointersAttempted) * 100).toFixed(1)}%</span>
            <span>FT%: {((stats.freeThrowsMade / stats.freeThrowsAttempted) * 100).toFixed(1)}%</span>
          </div>
        )}

        {athlete.sport === 'Baseball' && (
          <div className="grid grid-cols-2 gap-1">
            {stats.battingAverage && <span>AVG: {stats.battingAverage}</span>}
            {stats.homeRuns && <span>HR: {stats.homeRuns}</span>}
            {stats.rbi && <span>RBI: {stats.rbi}</span>}
            {stats.era && <span>ERA: {stats.era}</span>}
            {stats.wins && <span>W: {stats.wins}</span>}
            {stats.strikeoutsPitched && <span>K: {stats.strikeoutsPitched}</span>}
          </div>
        )}

        {athlete.sport === 'Soccer' && (
          <div className="grid grid-cols-3 gap-1">
            <span>Goals: {stats.goals}</span>
            <span>Assists: {stats.assists}</span>
            <span>Shots: {stats.shots}</span>
            {stats.saves && <span>Saves: {stats.saves}</span>}
            {stats.goalsAllowed && <span>GA: {stats.goalsAllowed}</span>}
          </div>
        )}

        {(athlete.sport === 'Track & Field' || athlete.sport === 'Swimming') && (
          <div>
            <span>Best: {stats.personalBest}</span>
            <span className="ml-4">Events: {stats.events?.length || 0}</span>
          </div>
        )}

        {athlete.sport === 'Tennis' && (
          <div className="grid grid-cols-2 gap-1">
            <span>W-L: {stats.wins}-{stats.losses}</span>
            <span>Win%: {stats.winPercentage}%</span>
            <span>Aces: {stats.aces}</span>
            <span>Rank: #{stats.ranking}</span>
          </div>
        )}

        {athlete.sport === 'Volleyball' && (
          <div className="grid grid-cols-3 gap-1">
            <span>Kills: {stats.kills}</span>
            <span>Kill%: {stats.killPercentage}%</span>
            <span>Digs: {stats.digs}</span>
            <span>Aces: {stats.aces}</span>
            <span>Blocks: {stats.blocks}</span>
            <span>Assists: {stats.assists}</span>
          </div>
        )}
      </div>
    );
  };

  if (loading && sportsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sports data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Browse Athletes</h1>
          <p className="text-gray-600 mt-2">
            Explore our comprehensive database of NCAA athletes across all sports
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Search Bar */}
        <div className="mb-8">
          <AISearchBar
            onResults={handleSearchResults}
            onClear={handleClearSearch}
            placeholder="Search for athletes by name, sport, or stats..."
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sports Categories Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Sports Categories</h2>
              <div className="space-y-2">
                {sportsData.map((sport) => (
                  <button
                    key={sport.name}
                    onClick={() => fetchAthletesBySport(sport.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSport === sport.name
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{sport.name}</div>
                    <div className="text-sm text-gray-500">{sport.totalCount} athletes</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Watchlist Summary */}
            {watchlist.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  My Watchlist
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{watchlist.length}</div>
                  <div className="text-sm text-gray-600">
                    {watchlist.length === 1 ? 'Player' : 'Players'} watched
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    Keep track of your favorite players for draft day!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Athletes List */}
          <div className="md:col-span-3">
            {!selectedSport && !isSearchMode ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Sport or Search
                </h3>
                <p className="text-gray-600">
                  Choose a sport category from the sidebar or use the AI search bar to find specific athletes
                </p>
              </div>
            ) : loading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading athletes...</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold">{getCurrentTitle()}</h2>
                      <p className="text-gray-600">{getCurrentSubtitle()}</p>
                    </div>
                    {isSearchMode && (
                      <button
                        onClick={handleClearSearch}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>

                  {/* Search criteria display */}
                  {isSearchMode && searchCriteria && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        {searchCriteria.aiUsed && <span className="font-medium">🤖 AI found: </span>}
                        {searchCriteria.sports && <span>Sports: {searchCriteria.sports.join(', ')} • </span>}
                        {searchCriteria.positions && <span>Positions: {searchCriteria.positions.join(', ')} • </span>}
                        {searchCriteria.keywords && <span>Keywords: {searchCriteria.keywords.join(', ')}</span>}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 p-6">
                  {getCurrentAthletes().length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No athletes found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search criteria or selecting a different sport category
                      </p>
                    </div>
                  ) : (
                    getCurrentAthletes().map((athlete) => (
                    <div key={athlete.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{athlete.name}</h3>
                            {isOnWatchlist(athlete.id) && (
                              <span className="text-yellow-500 text-lg" title="On your watchlist">⭐</span>
                            )}
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>{athlete.position}</span>
                            <span>{athlete.year}</span>
                            <span>{athlete.height}, {athlete.weight} lbs</span>
                            <span>{athlete.hometown}</span>
                          </div>
                          {renderAthleteStats(athlete)}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right text-sm text-gray-500">
                            <div>GP: {athlete.gamesPlayed}</div>
                            <div>GS: {athlete.gamesStarted}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => addToWatchlist(athlete)}
                              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                isOnWatchlist(athlete.id)
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              title={isOnWatchlist(athlete.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                            >
                              {isOnWatchlist(athlete.id) ? '⭐' : '☆'}
                            </button>
                            <button
                              onClick={() => openPlayerModal(athlete)}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Details Modal */}
      <PlayerModal
        athlete={selectedAthlete}
        isOpen={isModalOpen}
        onClose={closePlayerModal}
        onAddToWatchlist={addToWatchlist}
        isOnWatchlist={selectedAthlete ? isOnWatchlist(selectedAthlete.id) : false}
      />
    </div>
  );
}