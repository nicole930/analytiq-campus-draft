'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/ui/Layout';
import { Athlete } from '@/types/athlete';
import { DraftRoom, DraftParticipant, DraftPick } from '@/types/draft';
import { getAllAthletes } from '@/data/mockAthletes';

export default function DraftPage() {
  const [draftStarted, setDraftStarted] = useState(false);
  const [selectedAthletes, setSelectedAthletes] = useState<Athlete[]>([]);
  const [availableAthletes, setAvailableAthletes] = useState<Athlete[]>([]);
  const [currentPickNumber, setCurrentPickNumber] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock participants
  const [participants] = useState<DraftParticipant[]>([
    { id: '1', name: 'You', draftPosition: 1, isReady: true, team: { id: '1', name: 'Your Team', players: [], positionsFilled: {} } },
    { id: '2', name: 'Alex Chen', draftPosition: 2, isReady: true, team: { id: '2', name: 'The Wildcats', players: [], positionsFilled: {} } },
    { id: '3', name: 'Morgan Davis', draftPosition: 3, isReady: true, team: { id: '3', name: 'Blue Thunder', players: [], positionsFilled: {} } },
    { id: '4', name: 'Jordan Smith', draftPosition: 4, isReady: true, team: { id: '4', name: 'Campus Kings', players: [], positionsFilled: {} } }
  ]);

  const [picks, setPicks] = useState<DraftPick[]>([]);
  const currentParticipant = participants[(currentPickNumber - 1) % participants.length];

  useEffect(() => {
    // Load all athletes
    const athletes = getAllAthletes();
    setAvailableAthletes(athletes);
  }, []);

  useEffect(() => {
    if (draftStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-pick if time runs out
      autoPickPlayer();
    }
  }, [draftStarted, timeRemaining]);

  const startDraft = () => {
    setDraftStarted(true);
    setTimeRemaining(60);
  };

  const autoPickPlayer = () => {
    const available = getFilteredAthletes();
    if (available.length > 0) {
      const randomPlayer = available[Math.floor(Math.random() * available.length)];
      draftPlayer(randomPlayer);
    }
  };

  const draftPlayer = (athlete: Athlete) => {
    const newPick: DraftPick = {
      id: `pick-${currentPickNumber}`,
      userId: currentParticipant.id,
      userName: currentParticipant.name,
      athlete,
      pickNumber: currentPickNumber,
      round: Math.ceil(currentPickNumber / participants.length),
      timestamp: new Date()
    };

    setPicks([...picks, newPick]);
    setSelectedAthletes([...selectedAthletes, athlete]);
    setCurrentPickNumber(currentPickNumber + 1);
    setTimeRemaining(60);

    // Update participant's team
    currentParticipant.team.players.push(athlete);
  };

  const getFilteredAthletes = () => {
    let filtered = availableAthletes.filter(athlete =>
      !selectedAthletes.some(selected => selected.id === athlete.id)
    );

    if (selectedSport !== 'All') {
      filtered = filtered.filter(athlete => athlete.sport === selectedSport);
    }

    if (searchTerm) {
      filtered = filtered.filter(athlete =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const sports = ['All', 'Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field', 'Swimming', 'Tennis', 'Volleyball'];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isYourTurn = currentParticipant.id === '1';

  if (!draftStarted) {
    return (
      <Layout background="gradient">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl w-full">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-6">Draft Room</h1>
              <p className="text-xl mb-8">Get ready to draft your ultimate campus team!</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Draft Settings</h3>
                  <div className="space-y-2 text-left">
                    <p>• Team Size: 12 players</p>
                    <p>• Draft Type: Snake Draft</p>
                    <p>• Time per Pick: 60 seconds</p>
                    <p>• Sports: All NCAA Sports</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Participants ({participants.length})</h3>
                  <div className="space-y-2">
                    {participants.map((participant, index) => (
                      <div key={participant.id} className="flex justify-between items-center">
                        <span>{index + 1}. {participant.name}</span>
                        <span className={participant.isReady ? 'text-green-400' : 'text-yellow-400'}>
                          {participant.isReady ? '✓ Ready' : '⏳ Waiting'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startDraft}
                className="bg-yellow-400 text-blue-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Start Draft
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout background="light">
      <div className="bg-gray-50 min-h-screen">
        {/* Draft Header */}
        <div className="bg-blue-900 text-white p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Live Draft</h1>
                <p>Round {Math.ceil(currentPickNumber / participants.length)} • Pick #{currentPickNumber}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{formatTime(timeRemaining)}</div>
                <div className="text-sm">Time Remaining</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {isYourTurn ? "YOUR TURN!" : `${currentParticipant.name}'s turn`}
                </div>
                <div className="text-sm">Pick #{currentPickNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
          {/* Available Players */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Available Players</h2>

                {/* Filters */}
                <div className="flex gap-4 mb-4">
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg px-3 py-2 flex-1"
                  />
                </div>
              </div>

              {/* Player List */}
              <div className="max-h-96 overflow-y-auto">
                {getFilteredAthletes().slice(0, 50).map((athlete) => (
                  <div
                    key={athlete.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !isYourTurn ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => isYourTurn && draftPlayer(athlete)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{athlete.name}</h3>
                        <p className="text-sm text-gray-600">
                          {athlete.sport} • {athlete.position} • {athlete.year}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{athlete.height}, {athlete.weight} lbs</div>
                        <div>{athlete.hometown}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Draft Order */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Draft Order</h3>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`p-3 rounded-lg ${
                      currentParticipant.id === participant.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{index + 1}. {participant.name}</span>
                      <span className="text-sm text-gray-600">
                        {participant.team.players.length}/12
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Picks */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Picks</h3>
              <div className="space-y-3">
                {picks.slice(-5).reverse().map((pick) => (
                  <div key={pick.id} className="border-l-4 border-blue-500 pl-3">
                    <div className="font-medium text-sm">{pick.athlete.name}</div>
                    <div className="text-xs text-gray-600">
                      Pick #{pick.pickNumber} • {pick.userName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}