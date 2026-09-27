import React, { createContext, useContext, useState } from 'react';
import type { Location } from '@/constants/mock-data';

interface TripState {
  pickup: Location | null;
  dropoff: Location | null;
  setPickup: (location: Location | null) => void;
  setDropoff: (location: Location | null) => void;
  swapLocations: () => void;
  clearTrip: () => void;
}

const TripContext = createContext<TripState | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);

  const swapLocations = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const clearTrip = () => {
    setPickup(null);
    setDropoff(null);
  };

  return (
    <TripContext.Provider
      value={{ pickup, dropoff, setPickup, setDropoff, swapLocations, clearTrip }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}
