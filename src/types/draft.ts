import { Athlete } from './athlete';

export interface DraftPick {
  id: string;
  userId: string;
  userName: string;
  athlete: Athlete;
  pickNumber: number;
  round: number;
  timestamp: Date;
}

export interface DraftRoom {
  id: string;
  name: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'waiting' | 'drafting' | 'completed';
  currentPick: number;
  currentUserId: string;
  timePerPick: number; // seconds
  participants: DraftParticipant[];
  picks: DraftPick[];
  settings: DraftSettings;
}

export interface DraftParticipant {
  id: string;
  name: string;
  draftPosition: number;
  isReady: boolean;
  currentPick?: number;
  team: DraftedTeam;
}

export interface DraftedTeam {
  id: string;
  name: string;
  players: Athlete[];
  positionsFilled: Record<string, number>;
}

export interface DraftSettings {
  teamSize: number;
  positionLimits: Record<string, number>;
  sportCategories: string[];
  timePerPick: number;
  draftType: 'snake' | 'linear';
}

export interface DraftState {
  room: DraftRoom | null;
  currentUser: DraftParticipant | null;
  availableAthletes: Athlete[];
  loading: boolean;
  error: string | null;
}