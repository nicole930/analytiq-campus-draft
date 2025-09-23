export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'highlight';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
}

export interface BaseAthlete {
  id: string;
  name: string;
  position: string;
  year: 'FR' | 'SO' | 'JR' | 'SR' | 'GR';
  sport: string;
  team: string;
  height: string;
  weight: number;
  hometown: string;
  gamesPlayed: number;
  gamesStarted: number;
  media?: MediaItem[];
}

export interface FootballPlayer extends BaseAthlete {
  sport: 'Football';
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'CB' | 'S' | 'K' | 'P';
  stats: {
    // Offensive stats
    passingYards?: number;
    passingTDs?: number;
    interceptions?: number;
    completions?: number;
    attempts?: number;
    rushingYards?: number;
    rushingTDs?: number;
    carries?: number;
    receivingYards?: number;
    receivingTDs?: number;
    receptions?: number;
    targets?: number;
    // Defensive stats
    tackles?: number;
    sacks?: number;
    interceptionsCaught?: number;
    passDeflections?: number;
    forcedFumbles?: number;
    // Special teams
    fieldGoalsMade?: number;
    fieldGoalsAttempted?: number;
    extraPointsMade?: number;
    extraPointsAttempted?: number;
    puntingAverage?: number;
    kickoffAverage?: number;
  };
}

export interface BasketballPlayer extends BaseAthlete {
  sport: 'Basketball';
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    fieldGoalsMade: number;
    fieldGoalsAttempted: number;
    threePointersMade: number;
    threePointersAttempted: number;
    freeThrowsMade: number;
    freeThrowsAttempted: number;
    turnovers: number;
    fouls: number;
    minutesPlayed: number;
  };
}

export interface BaseballPlayer extends BaseAthlete {
  sport: 'Baseball';
  position: 'P' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'DH';
  stats: {
    // Batting stats
    atBats?: number;
    hits?: number;
    runs?: number;
    rbi?: number;
    doubles?: number;
    triples?: number;
    homeRuns?: number;
    walks?: number;
    strikeouts?: number;
    stolenBases?: number;
    battingAverage?: number;
    onBasePercentage?: number;
    sluggingPercentage?: number;
    // Pitching stats
    wins?: number;
    losses?: number;
    saves?: number;
    inningsPitched?: number;
    hittersAllowed?: number;
    runsAllowed?: number;
    earnedRuns?: number;
    walksAllowed?: number;
    strikeoutsPitched?: number;
    era?: number;
    whip?: number;
  };
}

export interface SoccerPlayer extends BaseAthlete {
  sport: 'Soccer';
  position: 'GK' | 'D' | 'M' | 'F';
  stats: {
    goals: number;
    assists: number;
    shots: number;
    shotsOnGoal: number;
    saves?: number;
    goalsAllowed?: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
    fouls: number;
    offsides: number;
  };
}

export interface TrackFieldAthlete extends BaseAthlete {
  sport: 'Track & Field';
  position: string; // Event name
  stats: {
    personalBest: string;
    seasonBest: string;
    events: string[];
    meets: number;
    placings: {
      first: number;
      second: number;
      third: number;
    };
  };
}

export interface SwimmingAthlete extends BaseAthlete {
  sport: 'Swimming';
  position: string; // Stroke/Distance specialty
  stats: {
    personalBest: string;
    seasonBest: string;
    events: string[];
    meets: number;
    placings: {
      first: number;
      second: number;
      third: number;
    };
  };
}

export interface TennisPlayer extends BaseAthlete {
  sport: 'Tennis';
  position: 'Singles' | 'Doubles';
  stats: {
    wins: number;
    losses: number;
    setsWon: number;
    setsLost: number;
    aces: number;
    doubleFaults: number;
    winPercentage: number;
    ranking: number;
  };
}

export interface VolleyballPlayer extends BaseAthlete {
  sport: 'Volleyball';
  position: 'OH' | 'MB' | 'OPP' | 'S' | 'L' | 'DS';
  stats: {
    kills: number;
    attacks: number;
    killPercentage: number;
    assists: number;
    digs: number;
    blocks: number;
    aces: number;
    serviceErrors: number;
    receptionErrors: number;
    setsPlayed: number;
  };
}

export type Athlete =
  | FootballPlayer
  | BasketballPlayer
  | BaseballPlayer
  | SoccerPlayer
  | TrackFieldAthlete
  | SwimmingAthlete
  | TennisPlayer
  | VolleyballPlayer;

export interface SportCategory {
  name: string;
  athletes: Athlete[];
  totalCount: number;
}