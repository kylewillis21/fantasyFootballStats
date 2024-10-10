import "../styles/Stats.css";

export default function StatsCard({ data }) {
  if (!data) return null;

  return (
    <div className="statsTable">
      <table>
        <thead>
          <tr>
            <th></th>
            {data?.map((team) => (
              <th>{team.teamName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Standing</th>
            {data?.map((team) => (
              <td>{team.standing}</td>
            ))}
          </tr>
          <tr>
            <th>Projected Rank</th>
            {data?.map((team) => (
              <td>{team.draftProjectedRank}</td>
            ))}
          </tr>
          <tr>
            <th>Wins</th>
            {data?.map((team) => (
              <td>{team.wins}</td>
            ))}
          </tr>
          <tr>
            <th>Losses</th>
            {data?.map((team) => (
              <td>{team.losses}</td>
            ))}
          </tr>
          <tr>
            <th>Ties</th>
            {data?.map((team) => (
              <td>{team.ties}</td>
            ))}
          </tr>
          <tr>
            <th>Win Percentage</th>
            {data?.map((team) => (
              <td>
                {((team.wins + team.ties * 0.5) / (team.wins + team.losses + team.ties)) * 100}%
              </td>
            ))}
          </tr>
          <tr>
            <th>Playoff Percentage</th>
            {data?.map((team) => (
              <td>{Math.round(team.playoffPct * 100)}%</td>
            ))}
          </tr>
          <tr>
            <th>Points For</th>
            {data?.map((team) => (
              <td>{team.pointsFor}</td>
            ))}
          </tr>
          <tr>
            <th>Points Against</th>
            {data?.map((team) => (
              <td>{team.pointsAgainst}</td>
            ))}
          </tr>
          <tr>
            <th>Average Points</th>
            {data?.map((team) => (
              <td>
                {(
                  Math.round((team.pointsFor / (team.wins + team.losses + team.ties)) * 100) / 100
                ).toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <th># of Trades</th>
            {data?.map((team) => (
              <td>{team.trades}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
