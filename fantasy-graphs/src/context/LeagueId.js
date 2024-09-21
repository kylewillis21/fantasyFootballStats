import { createContext, useState } from "react";

// Creating the context
export const LeagueContext = createContext();

// Provider component
export function LeagueContextProvider({ children }) {
  const [currentLeagueId, setCurrentLeagueId] = useState(0);

  return (
    <LeagueContext.Provider value={{ currentLeagueId, setCurrentLeagueId }}>
      {children}
    </LeagueContext.Provider>
  );
}
