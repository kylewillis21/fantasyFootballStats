import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "../styles/Hindsight.css";

export default function HindsightHero() {
  const [selectedYear, setSelectedYear] = useState(2024); // default to 2024
  const [selectedWeek, setSelectedWeek] = useState(1); // default to 1

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  return (
    <div className="hhContainer">
      <div className="description">
        <h2>Hindsight Heroes</h2>
        <p>
          Hindsight Hero is awarded to the team that left the most potential points on the bench
          each week. For example, if your starting running back scores 10.2 points, but a running
          back on your bench racks up 14.2 points, you’d earn 4 points toward your Hindsight Score.
          Explore the dropdowns to see which week crowned the biggest "hero" of missed
          opportunities.
        </p>
      </div>
      <div className="dropdownContainer">
        <div className="dropdown">
          <label htmlFor="yearSelect">Select Year</label>
          <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: 7 }, (_, i) => 2018 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="weekSelect">Select Week</label>
          <select id="weekSelect" value={selectedWeek} onChange={handleWeekChange}>
            {Array.from({ length: 17 }, (_, i) => i + 1).map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="button">Submit</button>
      </div>
    </div>
  );
}
