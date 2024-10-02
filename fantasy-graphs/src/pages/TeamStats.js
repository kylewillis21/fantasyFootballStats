import React, { useEffect, useState, useContext } from "react";
import { BarLoader } from "react-spinners";

import { LeagueContext } from "../context/LeagueId";
import StatsCard from "../components/Stats";
import "../styles/Stats.css";

export default function TeamStats() {
  const [teamData, setTeamData] = useState(null); // Default
  const [singleTeam, setSingleTeam] = useState(null); // Default
  const [year, setYear] = useState(2024); // Default
  const [isLoading, setLoading] = useState(false);
  const { currentLeagueId } = useContext(LeagueContext);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTeamChange = (e) => {
    const newTeamId = Number(e.target.value);
    const team = teamData.find(({ teamId }) => teamId === newTeamId);
    setSingleTeam(team);
    console.log("team ", team);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const abort = new AbortController();
      try {
        const response = await fetch(
          `https://api.ffhindsight.com/api/teams/${currentLeagueId}/${year}`
        );
        const data = await response.json();
        console.log("fetched data: ", data);
        setTeamData(data);
      } catch (err) {
        console.error("error fetching team data ", err);
      } finally {
        setLoading(false);
      }

      return () => {
        abort.abort();
      };
    };

    fetchData();
  }, [year, currentLeagueId]);

  return (
    <div className="statsContainer">
      <div className="dropdownContainer">
        <div className="dropdown">
          <label htmlFor="yearSelect">Select Year</label>
          <select id="yearSelect" value={year} onChange={handleYearChange}>
            <option value="" disabled>
              Select a Year
            </option>
            {Array.from({ length: 16 }, (_, i) => 2009 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label>Select Team</label>
          <select id="teamSelect" value={singleTeam?.teamId || ""} onChange={handleTeamChange}>
            <option value="" disabled>
              Select Team
            </option>
            {teamData?.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="loader">
          <BarLoader color="#a4161a" />
        </div>
      ) : (
        singleTeam && <StatsCard data={singleTeam} />
      )}
    </div>
  );
}
