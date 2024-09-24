import { useContext, useState } from "react";
import { LeagueContext } from "../context/LeagueId";
import "../styles/Navbar.css";

export default function LeagueDropdown() {
  const { allLeagues, setCurrentLeagueId } = useContext(LeagueContext);
  const [selectedLeague, setSelectedLeague] = useState("");

  const handleLeagueChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLeague(selectedValue);
    setCurrentLeagueId(selectedValue); // Updating context
  };

  return (
    <div className="league-dropdown">
      <select id="leagueSelect" value={selectedLeague} onChange={handleLeagueChange}>
        <option value="" disabled>
          Select a league
        </option>
        {allLeagues?.map((league) => (
          <option key={league.leagueId} value={league.leagueId}>
            {league.leagueNickname ? league.leagueNickname : league.leagueId}
          </option>
        ))}
      </select>
    </div>
  );
}
