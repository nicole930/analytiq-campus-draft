import { Athlete, FootballPlayer, BasketballPlayer, BaseballPlayer, SoccerPlayer, TrackFieldAthlete, SwimmingAthlete, TennisPlayer, VolleyballPlayer, MediaItem } from '../types/athlete';

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Cameron', 'Quinn', 'Sage',
  'Michael', 'Chris', 'David', 'James', 'John', 'Robert', 'Daniel', 'Matthew', 'Anthony', 'Mark',
  'Sarah', 'Jessica', 'Ashley', 'Emily', 'Samantha', 'Amanda', 'Nicole', 'Elizabeth', 'Rebecca', 'Lauren',
  'Tyler', 'Justin', 'Andrew', 'Joshua', 'Ryan', 'Brandon', 'Jason', 'Aaron', 'Kevin', 'Noah',
  'Maya', 'Grace', 'Sophia', 'Isabella', 'Emma', 'Olivia', 'Ava', 'Mia', 'Abigail', 'Madison'
];

const lastNames = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez',
  'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez'
];

const cities = [
  'Atlanta, GA', 'Austin, TX', 'Boston, MA', 'Charlotte, NC', 'Chicago, IL', 'Dallas, TX',
  'Denver, CO', 'Houston, TX', 'Los Angeles, CA', 'Miami, FL', 'New York, NY', 'Orlando, FL',
  'Philadelphia, PA', 'Phoenix, AZ', 'Portland, OR', 'San Antonio, TX', 'San Diego, CA',
  'Seattle, WA', 'Tampa, FL', 'Washington, DC', 'Birmingham, AL', 'Memphis, TN', 'Nashville, TN',
  'Jacksonville, FL', 'Indianapolis, IN', 'Columbus, OH', 'Detroit, MI', 'Milwaukee, WI',
  'Kansas City, MO', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD'
];

const years = ['FR', 'SO', 'JR', 'SR', 'GR'] as const;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName(): string {
  return `${randomChoice(firstNames)} ${randomChoice(lastNames)}`;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function generateMediaData(athleteName: string, sport: string): MediaItem[] {
  const mediaItems: MediaItem[] = [];
  const mediaCount = randomInt(3, 8);

  const photoTitles = [
    'Game Action Shot',
    'Team Photo',
    'Training Session',
    'Championship Celebration',
    'Warm-up',
    'Post-Game Interview',
    'Award Ceremony',
    'Practice Drill'
  ];

  const videoTitles = [
    'Season Highlights',
    'Best Plays Compilation',
    'Training Footage',
    'Game Winning Moment',
    'Interview Highlights',
    'Skills Showcase',
    'Behind the Scenes'
  ];

  const highlightTitles = [
    'Amazing Touchdown Run',
    'Clutch Three-Pointer',
    'Game-Saving Tackle',
    'Perfect Strike',
    'Championship-Winning Shot',
    'Record-Breaking Performance',
    'Incredible Catch',
    'Dominant Performance'
  ];

  for (let i = 0; i < mediaCount; i++) {
    const mediaType = randomChoice(['photo', 'video', 'highlight'] as const);
    let title = '';
    let tags: string[] = [sport];

    switch (mediaType) {
      case 'photo':
        title = randomChoice(photoTitles);
        tags.push('action', 'team');
        break;
      case 'video':
        title = randomChoice(videoTitles);
        tags.push('highlights', 'season');
        break;
      case 'highlight':
        title = randomChoice(highlightTitles);
        tags.push('highlights', 'clutch', 'performance');
        break;
    }

    // Generate placeholder URLs (in a real app, these would be actual media URLs)
    const baseUrl = 'https://picsum.photos';
    const videoPlaceholder = 'https://www.w3schools.com/html/mov_bbb.mp4';

    mediaItems.push({
      id: generateId(),
      type: mediaType,
      url: mediaType === 'video' || mediaType === 'highlight'
        ? videoPlaceholder
        : `${baseUrl}/800/600?random=${generateId()}`,
      thumbnail: mediaType === 'video' || mediaType === 'highlight'
        ? `${baseUrl}/400/300?random=${generateId()}`
        : undefined,
      title: `${athleteName} - ${title}`,
      description: `${title} featuring ${athleteName} from ${sport}`,
      date: new Date(2024, randomInt(0, 11), randomInt(1, 28)).toISOString(),
      tags
    });
  }

  return mediaItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateHeight(): string {
  const feet = randomInt(5, 7);
  const inches = randomInt(0, 11);
  return `${feet}'${inches}"`;
}

export function generateFootballPlayers(count: number): FootballPlayer[] {
  const positions = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K', 'P'] as const;

  return Array.from({ length: count }, () => {
    const position = randomChoice(positions);
    const gamesPlayed = randomInt(8, 14);

    const name = generateName();
    const player: FootballPlayer = {
      id: generateId(),
      name,
      position,
      year: randomChoice(years),
      sport: 'Football',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(170, 320),
      hometown: randomChoice(cities),
      gamesPlayed,
      gamesStarted: randomInt(0, gamesPlayed),
      stats: {},
      media: generateMediaData(name, 'Football')
    };

    // Generate position-specific stats
    switch (position) {
      case 'QB':
        player.stats = {
          passingYards: randomInt(1200, 4500),
          passingTDs: randomInt(8, 35),
          interceptions: randomInt(2, 15),
          completions: randomInt(150, 320),
          attempts: randomInt(250, 450),
          rushingYards: randomInt(-50, 800),
          rushingTDs: randomInt(0, 12),
          carries: randomInt(20, 120)
        };
        break;
      case 'RB':
        player.stats = {
          rushingYards: randomInt(400, 1800),
          rushingTDs: randomInt(3, 20),
          carries: randomInt(80, 300),
          receivingYards: randomInt(100, 600),
          receivingTDs: randomInt(0, 8),
          receptions: randomInt(15, 60),
          targets: randomInt(20, 80)
        };
        break;
      case 'WR':
      case 'TE':
        player.stats = {
          receivingYards: randomInt(200, 1400),
          receivingTDs: randomInt(2, 15),
          receptions: randomInt(20, 90),
          targets: randomInt(35, 130),
          rushingYards: randomInt(0, 100),
          rushingTDs: randomInt(0, 2)
        };
        break;
      case 'DL':
      case 'LB':
        player.stats = {
          tackles: randomInt(25, 120),
          sacks: randomFloat(0, 15, 1),
          interceptionsCaught: randomInt(0, 5),
          passDeflections: randomInt(2, 15),
          forcedFumbles: randomInt(0, 4)
        };
        break;
      case 'CB':
      case 'S':
        player.stats = {
          tackles: randomInt(15, 80),
          interceptionsCaught: randomInt(0, 8),
          passDeflections: randomInt(3, 20),
          sacks: randomFloat(0, 5, 1),
          forcedFumbles: randomInt(0, 3)
        };
        break;
      case 'K':
        player.stats = {
          fieldGoalsMade: randomInt(8, 25),
          fieldGoalsAttempted: randomInt(12, 35),
          extraPointsMade: randomInt(15, 55),
          extraPointsAttempted: randomInt(16, 58),
          kickoffAverage: randomFloat(58, 68, 1)
        };
        break;
      case 'P':
        player.stats = {
          puntingAverage: randomFloat(38, 48, 1)
        };
        break;
    }

    return player;
  });
}

export function generateBasketballPlayers(count: number): BasketballPlayer[] {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'] as const;

  return Array.from({ length: count }, () => {
    const gamesPlayed = randomInt(20, 35);
    const minutesPlayed = randomInt(400, 1200);
    const fieldGoalsAttempted = randomInt(100, 600);
    const fieldGoalsMade = Math.floor(fieldGoalsAttempted * randomFloat(0.35, 0.65));
    const threePointersAttempted = randomInt(20, 250);
    const threePointersMade = Math.floor(threePointersAttempted * randomFloat(0.25, 0.45));
    const freeThrowsAttempted = randomInt(30, 200);
    const freeThrowsMade = Math.floor(freeThrowsAttempted * randomFloat(0.65, 0.90));
    const name = generateName();

    return {
      id: generateId(),
      name,
      position: randomChoice(positions),
      year: randomChoice(years),
      sport: 'Basketball',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(160, 280),
      hometown: randomChoice(cities),
      gamesPlayed,
      gamesStarted: randomInt(0, gamesPlayed),
      stats: {
        points: fieldGoalsMade * 2 + threePointersMade + freeThrowsMade,
        rebounds: randomInt(50, 350),
        assists: randomInt(20, 200),
        steals: randomInt(10, 80),
        blocks: randomInt(5, 120),
        fieldGoalsMade,
        fieldGoalsAttempted,
        threePointersMade,
        threePointersAttempted,
        freeThrowsMade,
        freeThrowsAttempted,
        turnovers: randomInt(20, 120),
        fouls: randomInt(15, 100),
        minutesPlayed
      },
      media: generateMediaData(name, 'Basketball')
    } as BasketballPlayer;
  });
}

export function generateBaseballPlayers(count: number): BaseballPlayer[] {
  const positions = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'] as const;

  return Array.from({ length: count }, () => {
    const position = randomChoice(positions);
    const gamesPlayed = randomInt(35, 56);

    const name = generateName();
    const player: BaseballPlayer = {
      id: generateId(),
      name,
      position,
      year: randomChoice(years),
      sport: 'Baseball',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(160, 250),
      hometown: randomChoice(cities),
      gamesPlayed,
      gamesStarted: randomInt(0, gamesPlayed),
      stats: {},
      media: generateMediaData(name, 'Baseball')
    };

    if (position === 'P') {
      const inningsPitched = randomFloat(40, 120, 1);
      const hittersAllowed = randomInt(30, 120);
      const runsAllowed = randomInt(10, 60);
      const earnedRuns = Math.floor(runsAllowed * randomFloat(0.7, 0.95));
      const walksAllowed = randomInt(8, 45);
      const strikeoutsPitched = randomInt(30, 150);

      player.stats = {
        wins: randomInt(2, 12),
        losses: randomInt(1, 8),
        saves: randomInt(0, 15),
        inningsPitched,
        hittersAllowed,
        runsAllowed,
        earnedRuns,
        walksAllowed,
        strikeoutsPitched,
        era: randomFloat(2.50, 6.50, 2),
        whip: randomFloat(1.10, 1.80, 2)
      };
    } else {
      const atBats = randomInt(80, 220);
      const hits = Math.floor(atBats * randomFloat(0.200, 0.400));
      const doubles = Math.floor(hits * randomFloat(0.15, 0.35));
      const triples = randomInt(0, Math.floor(hits * 0.1));
      const homeRuns = randomInt(0, Math.floor(hits * 0.25));
      const walks = randomInt(10, 50);

      player.stats = {
        atBats,
        hits,
        runs: randomInt(15, 65),
        rbi: randomInt(12, 75),
        doubles,
        triples,
        homeRuns,
        walks,
        strikeouts: randomInt(15, 75),
        stolenBases: randomInt(0, 25),
        battingAverage: randomFloat(0.200, 0.400, 3),
        onBasePercentage: randomFloat(0.250, 0.500, 3),
        sluggingPercentage: randomFloat(0.300, 0.700, 3)
      };
    }

    return player;
  });
}

export function generateSoccerPlayers(count: number): SoccerPlayer[] {
  const positions = ['GK', 'D', 'M', 'F'] as const;

  return Array.from({ length: count }, () => {
    const position = randomChoice(positions);
    const gamesPlayed = randomInt(15, 22);
    const minutesPlayed = randomInt(500, 1980);

    const name = generateName();
    const player: SoccerPlayer = {
      id: generateId(),
      name,
      position,
      year: randomChoice(years),
      sport: 'Soccer',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(140, 200),
      hometown: randomChoice(cities),
      gamesPlayed,
      gamesStarted: randomInt(0, gamesPlayed),
      stats: {
        goals: position === 'GK' ? 0 : randomInt(0, position === 'F' ? 15 : position === 'M' ? 8 : 3),
        assists: position === 'GK' ? 0 : randomInt(0, position === 'M' ? 12 : 8),
        shots: position === 'GK' ? 0 : randomInt(5, 65),
        shotsOnGoal: position === 'GK' ? 0 : randomInt(2, 30),
        saves: position === 'GK' ? randomInt(40, 120) : undefined,
        goalsAllowed: position === 'GK' ? randomInt(8, 35) : undefined,
        minutesPlayed,
        yellowCards: randomInt(0, 8),
        redCards: randomInt(0, 2),
        fouls: randomInt(5, 45),
        offsides: position === 'GK' ? 0 : randomInt(0, 15)
      },
      media: generateMediaData(name, 'Soccer')
    };

    return player;
  });
}

export function generateTrackFieldAthletes(count: number): TrackFieldAthlete[] {
  const events = [
    '100m', '200m', '400m', '800m', '1500m', '5000m', '10000m', 'Marathon',
    '110m Hurdles', '400m Hurdles', '3000m Steeplechase',
    'High Jump', 'Long Jump', 'Triple Jump', 'Pole Vault',
    'Shot Put', 'Discus', 'Hammer Throw', 'Javelin',
    '4x100m Relay', '4x400m Relay'
  ];

  return Array.from({ length: count }, () => {
    const primaryEvent = randomChoice(events);
    const numEvents = randomInt(1, 4);
    const athleteEvents = [primaryEvent];

    while (athleteEvents.length < numEvents) {
      const event = randomChoice(events);
      if (!athleteEvents.includes(event)) {
        athleteEvents.push(event);
      }
    }

    const meets = randomInt(6, 15);
    const totalPlacings = randomInt(0, meets);
    const first = randomInt(0, Math.floor(totalPlacings * 0.4));
    const second = randomInt(0, Math.floor((totalPlacings - first) * 0.6));
    const third = totalPlacings - first - second;
    const name = generateName();

    return {
      id: generateId(),
      name,
      position: primaryEvent,
      year: randomChoice(years),
      sport: 'Track & Field',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(120, 220),
      hometown: randomChoice(cities),
      gamesPlayed: meets,
      gamesStarted: meets,
      stats: {
        personalBest: generateTrackTime(primaryEvent),
        seasonBest: generateTrackTime(primaryEvent),
        events: athleteEvents,
        meets,
        placings: { first, second, third }
      },
      media: generateMediaData(name, 'Track & Field')
    } as TrackFieldAthlete;
  });
}

function generateTrackTime(event: string): string {
  if (event.includes('100m')) return `${randomFloat(10.5, 12.0, 2)}s`;
  if (event.includes('200m')) return `${randomFloat(21.0, 24.5, 2)}s`;
  if (event.includes('400m')) return `${randomFloat(48.0, 55.0, 2)}s`;
  if (event.includes('800m')) return `${Math.floor(randomFloat(1, 2, 0))}:${randomFloat(50, 59, 2).toFixed(2)}`;
  if (event.includes('1500m')) return `${Math.floor(randomFloat(3, 4, 0))}:${randomFloat(45, 59, 2).toFixed(2)}`;
  if (event.includes('High Jump')) return `${randomFloat(1.6, 2.2, 2)}m`;
  if (event.includes('Long Jump')) return `${randomFloat(6.0, 8.5, 2)}m`;
  if (event.includes('Shot Put')) return `${randomFloat(12.0, 20.0, 2)}m`;
  return `${randomFloat(10.0, 15.0, 2)}s`;
}

export function generateSwimmingAthletes(count: number): SwimmingAthlete[] {
  const events = [
    '50 Free', '100 Free', '200 Free', '500 Free', '1000 Free', '1650 Free',
    '100 Back', '200 Back', '100 Breast', '200 Breast',
    '100 Fly', '200 Fly', '200 IM', '400 IM',
    '200 Free Relay', '400 Free Relay', '800 Free Relay',
    '200 Medley Relay', '400 Medley Relay'
  ];

  return Array.from({ length: count }, () => {
    const primaryEvent = randomChoice(events);
    const numEvents = randomInt(2, 6);
    const athleteEvents = [primaryEvent];

    while (athleteEvents.length < numEvents) {
      const event = randomChoice(events);
      if (!athleteEvents.includes(event)) {
        athleteEvents.push(event);
      }
    }

    const meets = randomInt(8, 15);
    const totalPlacings = randomInt(0, meets * 2);
    const first = randomInt(0, Math.floor(totalPlacings * 0.3));
    const second = randomInt(0, Math.floor((totalPlacings - first) * 0.5));
    const third = Math.min(totalPlacings - first - second, meets);
    const name = generateName();

    return {
      id: generateId(),
      name,
      position: primaryEvent,
      year: randomChoice(years),
      sport: 'Swimming',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(140, 200),
      hometown: randomChoice(cities),
      gamesPlayed: meets,
      gamesStarted: meets,
      stats: {
        personalBest: generateSwimTime(primaryEvent),
        seasonBest: generateSwimTime(primaryEvent),
        events: athleteEvents,
        meets,
        placings: { first, second, third }
      },
      media: generateMediaData(name, 'Swimming')
    } as SwimmingAthlete;
  });
}

function generateSwimTime(event: string): string {
  if (event.includes('50')) return `${randomFloat(20.5, 25.0, 2)}`;
  if (event.includes('100')) return `${randomFloat(45.0, 55.0, 2)}`;
  if (event.includes('200')) return `${Math.floor(randomFloat(1, 2, 0))}:${randomFloat(40, 59, 2).toFixed(2)}`;
  if (event.includes('500')) return `${Math.floor(randomFloat(4, 5, 0))}:${randomFloat(20, 59, 2).toFixed(2)}`;
  return `${randomFloat(45.0, 60.0, 2)}`;
}

export function generateTennisPlayers(count: number): TennisPlayer[] {
  return Array.from({ length: count }, () => {
    const wins = randomInt(8, 25);
    const losses = randomInt(3, 20);
    const setsWon = randomInt(15, 50);
    const setsLost = randomInt(8, 40);
    const name = generateName();

    return {
      id: generateId(),
      name,
      position: randomChoice(['Singles', 'Doubles']),
      year: randomChoice(years),
      sport: 'Tennis',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(130, 190),
      hometown: randomChoice(cities),
      gamesPlayed: wins + losses,
      gamesStarted: wins + losses,
      stats: {
        wins,
        losses,
        setsWon,
        setsLost,
        aces: randomInt(20, 120),
        doubleFaults: randomInt(15, 80),
        winPercentage: parseFloat((wins / (wins + losses) * 100).toFixed(1)),
        ranking: randomInt(1, 120)
      },
      media: generateMediaData(name, 'Tennis')
    } as TennisPlayer;
  });
}

export function generateVolleyballPlayers(count: number): VolleyballPlayer[] {
  const positions = ['OH', 'MB', 'OPP', 'S', 'L', 'DS'] as const;

  return Array.from({ length: count }, () => {
    const setsPlayed = randomInt(60, 120);
    const attacks = randomInt(100, 600);
    const kills = Math.floor(attacks * randomFloat(0.15, 0.45));
    const name = generateName();

    return {
      id: generateId(),
      name,
      position: randomChoice(positions),
      year: randomChoice(years),
      sport: 'Volleyball',
      team: 'URI Rams',
      height: generateHeight(),
      weight: randomInt(140, 210),
      hometown: randomChoice(cities),
      gamesPlayed: randomInt(20, 35),
      gamesStarted: randomInt(15, 35),
      stats: {
        kills,
        attacks,
        killPercentage: parseFloat((kills / attacks * 100).toFixed(1)),
        assists: randomInt(20, 800),
        digs: randomInt(50, 400),
        blocks: randomInt(10, 150),
        aces: randomInt(5, 45),
        serviceErrors: randomInt(8, 35),
        receptionErrors: randomInt(5, 25),
        setsPlayed
      },
      media: generateMediaData(name, 'Volleyball')
    } as VolleyballPlayer;
  });
}