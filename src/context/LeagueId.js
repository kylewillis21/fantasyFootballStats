import { createContext, useState, useEffect } from "react";

// Creating the context
export const LeagueContext = createContext();

// Provider component
export function LeagueContextProvider({ children }) {
  const [currentLeagueId, setCurrentLeagueId] = useState(0);
  const [currentLeagueName, setCurrentLeagueName] = useState(null);
  const [allLeagues, setAllLeagues] = useState(null);

  // Keeps data even after refresh
  useEffect(() => {
    const storedLeagues = localStorage.getItem("allLeagues");
    if (storedLeagues) {
      setAllLeagues(JSON.parse(storedLeagues));
    }
  }, []);

  // Saves leagues to localStorage whenever they change
  useEffect(() => {
    if (allLeagues) {
      localStorage.setItem("allLeagues", JSON.stringify(allLeagues));
    }
  }, [allLeagues]);

  return (
    <LeagueContext.Provider
      value={{
        allLeagues,
        setAllLeagues,
        currentLeagueId,
        setCurrentLeagueId,
        currentLeagueName,
        setCurrentLeagueName
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
}
