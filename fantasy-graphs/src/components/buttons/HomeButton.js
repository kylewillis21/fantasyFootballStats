import React from "react";

import "../../styles/Stats.css";

const HomeButton = ({ text, onPress }) => {
  return (
    <button className="submit" onClick={onPress}>
      {text}
    </button>
  );
};

export default HomeButton;
