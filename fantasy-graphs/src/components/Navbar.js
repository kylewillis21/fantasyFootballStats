import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext, useState } from "react";
import { LeagueContext } from "../context/LeagueId";

export default function Navbar() {
  const isDesktop = useMediaQuery({ minWidth: 801 });
  const { leagueId, setLeagueId } = useContext(LeagueContext);
  const [inputValue, setInputValue] = useState(leagueId);

  // Handling the input change of the league id text field
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Check for numeric value
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setLeagueId(Number(inputValue));
  };

  return (
    <nav className="nav">
      <div className="navInput">
        League ID
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="">Graphs</CustomLink>
        <CustomLink to="">Hindsight Hero</CustomLink>
        <CustomLink to="">Help</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
