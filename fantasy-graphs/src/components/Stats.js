import "../styles/Stats.css";

export default function StatsCard({ data }) {
  if (!data) return null;

  return (
    <div className="statsTable">
      <table>
        <thead>
          <tr>
            <th>Standing</th>
            <th>Projected Rank</th>
            <th>Points For</th>
            <th>Points Against</th>
            <th>Average Points</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Win Percentage</th>
            <th>Playoff Percentage</th>
            <th># of Trades</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.standing}</td>
            <td>{data.draftProjectedRank}</td>
            <td>{data.pointsFor}</td>
            <td>{data.pointsAgainst}</td>
            <td>{data.pointsFor / (data.wins + data.losses + data.ties)}</td>
            <td>{data.wins}</td>
            <td>{data.losses}</td>
            <td>{data.ties}</td>
            <td>{(data.wins + data.ties * 0.5) / (data.wins + data.losses + data.ties)}</td>
            <td>{data.playoffPct}</td>
            <td>{data.trades}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
