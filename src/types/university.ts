export interface University {
  id: string;
  name: string;
  shortName: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
  };
  logo?: string;
  location: {
    city: string;
    state: string;
  };
  isActive: boolean;
  comingSoon?: boolean;
}

export interface League {
  id: string;
  universityId: string;
  name: string;
  participants: string[];
  maxParticipants: number;
  status: 'open' | 'drafting' | 'active' | 'completed';
  seasonStart: string;
  seasonEnd: string;
  settings: {
    teamSize: number;
    positionLimits: Record<string, number>;
    sportCategories: string[];
  };
}

export interface UserUniversityAccess {
  userId: string;
  universityId: string;
  leagues: string[];
  favoriteTeams: string[];
  isActive: boolean;
}