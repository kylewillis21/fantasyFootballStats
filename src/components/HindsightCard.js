import "../styles/Hindsight.css";

export default function HindsightCard({ data }) {
  if (!data) {
    return <div>No data available</div>;
  } else if (data.teams.length < 1) {
    return <div>No data available</div>;
  }

  return (
    <div className="hindsightCard">
      <div className="hindsightGrid">
        <div className="podium">
          <img
            className="trophyImage"
            src={"https://g.espncdn.com/lm-static/ffl/images/playoff_bracket/trophy_second.svg"}
            alt="2nd place"
          />
          {/* <h1>2nd</h1> */}
          <img className="podiumImage" src={data.teams[1].logo} alt={data.teams[1].teamName} />
          <h3>{data.teams[1].teamName}</h3>
          <p>Hindsight score: {data.teams[1].difference}</p>
        </div>

        <div className="podiumFirst">
          <img
            className="trophyImage"
            src={"https://g.espncdn.com/lm-static/ffl/images/playoff_bracket/trophy_first.svg"}
            alt="1st place"
          />
          {/* <h1>1st</h1> */}
          <img className="podiumImage" src={data.teams[0].logo} alt={data.teams[0].teamName} />
          <h3>{data.teams[0].teamName}</h3>
          <p>Hindsight score: {data.teams[0].difference}</p>
        </div>

        <div className="podium">
          <img
            className="trophyImage"
            src={"https://g.espncdn.com/lm-static/ffl/images/playoff_bracket/trophy_third.svg"}
            alt="3rd place"
          />
          {/* <h1>3rd</h1> */}
          <img className="podiumImage" src={data.teams[2].logo} alt={data.teams[2].teamName} />
          <h3>{data.teams[2].teamName}</h3>
          <p>Hindsight score: {data.teams[2].difference}</p>
        </div>
      </div>

      {/* creating the table of the rest of the teams in the league and their score */}
      <div className="hindsightTable">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Hindsight Score</th>
            </tr>
          </thead>
          <tbody>
            {data.teams.slice(3).map((team, index) => (
              <tr key={team.teamId}>
                <td>{index + 4}</td>
                <td>
                  <div className="logoName">
                    {<img className="tablePicture" src={team.logo} />}
                    <span>{team.teamName}</span>
                  </div>
                </td>
                <td>{team.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
