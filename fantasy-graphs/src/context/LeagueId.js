import { createContext, useState } from "react";

// Creating the context
export const LeagueContext = createContext();

// Provider component
export function LeagueContextProvider({ children }) {
  const [leagueId, setLeagueId] = useState(0);

  return (
    <LeagueContext.Provider value={{ leagueId, setLeagueId }}>{children}</LeagueContext.Provider>
  );
}
