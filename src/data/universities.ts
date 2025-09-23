import { University } from '@/types/university';

export const universities: University[] = [
  {
    id: 'uri',
    name: 'University of Rhode Island',
    shortName: 'URI',
    mascot: 'Rams',
    colors: {
      primary: '#002147', // Navy Blue
      secondary: '#C8C9C7'  // Light Blue
    },
    location: {
      city: 'Kingston',
      state: 'Rhode Island'
    },
    isActive: true,
    comingSoon: false
  },
  {
    id: 'northeastern',
    name: 'Northeastern University',
    shortName: 'NEU',
    mascot: 'Huskies',
    colors: {
      primary: '#C41E3A',
      secondary: '#000000'
    },
    location: {
      city: 'Boston',
      state: 'Massachusetts'
    },
    isActive: false,
    comingSoon: true
  },
  {
    id: 'pennstate',
    name: 'Pennsylvania State University',
    shortName: 'PSU',
    mascot: 'Nittany Lions',
    colors: {
      primary: '#041E42',
      secondary: '#FFFFFF'
    },
    location: {
      city: 'University Park',
      state: 'Pennsylvania'
    },
    isActive: false,
    comingSoon: true
  },
  {
    id: 'unh',
    name: 'University of New Hampshire',
    shortName: 'UNH',
    mascot: 'Wildcats',
    colors: {
      primary: '#003366',
      secondary: '#FFFFFF'
    },
    location: {
      city: 'Durham',
      state: 'New Hampshire'
    },
    isActive: false,
    comingSoon: true
  }
];

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(uni => uni.id === id);
};

export const getActiveUniversities = (): University[] => {
  return universities.filter(uni => uni.isActive);
};

export const getComingSoonUniversities = (): University[] => {
  return universities.filter(uni => uni.comingSoon);
};

export const defaultUniversity = universities[0]; // URI is default