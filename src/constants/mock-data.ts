// Mock/static data for the trip planner app

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'recent' | 'saved';
  coordinates?: { lat: number; lng: number };
}

export const SUGGESTED_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Home',
    address: 'Villa 12, Street 840, Zone 61 · West Bay',
    type: 'home',
    coordinates: { lat: 25.3278, lng: 51.5151 },
  },
  {
    id: '2',
    name: 'Marina Office Tower',
    address: 'Level 14, Al Fardan Rd · Lusail Marina',
    type: 'work',
    coordinates: { lat: 25.4108, lng: 51.5223 },
  },
  {
    id: '3',
    name: 'Corniche Ferry Terminal',
    address: 'Gate 3, Corniche Promenade',
    type: 'recent',
    coordinates: { lat: 25.2942, lng: 51.5314 },
  },
  {
    id: '4',
    name: 'Msheireb Metro Station',
    address: 'Al Kinana St · Msheireb Downtown',
    type: 'recent',
    coordinates: { lat: 25.2867, lng: 51.5358 },
  },
  {
    id: '5',
    name: 'Hamad International Airport',
    address: 'Airport Road · Doha',
    type: 'recent',
    coordinates: { lat: 25.2609, lng: 51.6138 },
  },
  {
    id: '6',
    name: 'Souq Waqif',
    address: 'Al Jasra · Old Doha',
    type: 'recent',
    coordinates: { lat: 25.2867, lng: 51.5358 },
  },
];

export interface TurnByTurn {
  id: string;
  instruction: string;
  hint: string;
  distance: string;
}

export const MOCK_TURN_BY_TURN: TurnByTurn[] = [
  {
    id: '1',
    instruction: 'Head north on Street 840',
    hint: 'Keep right past the service road',
    distance: '450 m',
  },
  {
    id: '2',
    instruction: 'Turn right onto Al Istiqlal St',
    hint: 'Moderate traffic near the roundabout',
    distance: '1.8 km',
  },
  {
    id: '3',
    instruction: 'Continue onto Al Fardan Rd',
    hint: 'Keep left at the fork',
    distance: '3.2 km',
  },
  {
    id: '4',
    instruction: 'Arrive at destination',
    hint: 'Marina Office Tower is on your right',
    distance: '',
  },
];

export const MOCK_ROUTE_INFO = {
  duration: '24 min',
  distance: '9.6 km',
  arrivalTime: '10:42',
};
