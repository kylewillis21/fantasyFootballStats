import React, { useEffect, useState, useContext } from "react";
import { BarLoader } from "react-spinners";

import { LeagueContext } from "../context/LeagueId";
import StatsCard from "../components/Stats";
import Tag from "../components/Tag";
import SubmitButton from "../components/buttons/SubmitButton";

import "../styles/Stats.css";

export default function TeamStats() {
  const [teams, setTeams] = useState([]); // empty array of all the teams being compared to one another
  const [teamData, setTeamData] = useState(null); // Default
  const [singleTeam, setSingleTeam] = useState(null); // Default
  const [year, setYear] = useState(2024); // Default
  const [leagueLoading, setLeagueLoading] = useState(false);
  const { currentLeagueId } = useContext(LeagueContext);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = () => {
    if (!teams.includes(singleTeam)) {
      setTeams([...teams, singleTeam]);
      console.log("Added team: ", teams);
    }
  };

  const removeTeam = (teamId) => {
    setTeams(teams.filter((team) => team.teamId !== teamId));
    console.log("Removed team: ", teams);
  };

  const handleTeamChange = (e) => {
    const newTeamId = Number(e.target.value);
    const team = teamData.find(({ teamId }) => teamId === newTeamId);
    setSingleTeam(team);
    console.log("Current teams: ", teams);
  };

  useEffect(() => {
    const fetchData = async () => {
      setTeams([]);
      setSingleTeam(null);
      setLeagueLoading(true);
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
        setLeagueLoading(false);
      }

      return () => {
        abort.abort();
      };
    };

    fetchData();
  }, [year, currentLeagueId]);

  return (
    <div className="statsContainer">
      {leagueLoading ? (
        <div className="loader">
          <BarLoader color="#a4161a" />
          <p className="loadingDesc">Loading your league</p>
        </div>
      ) : (
        <>
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
                    {team.teamName} ({team.teamAbbrev})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <button className="submit" onClick={handleSubmit}>
            Add Team
          </button> */}
          <SubmitButton text="Add Team" onPress={handleSubmit} />
          <div className="tags">
            {teams?.map((team) => (
              <Tag
                key={team.teamId}
                text={team.teamAbbrev}
                onPress={() => removeTeam(team.teamId)}
              />
            ))}
          </div>
          {teams.length !== 0 && <StatsCard data={teams} />}
        </>
      )}
    </div>
  );
}
