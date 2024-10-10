import React from "react";

import "../styles/Stats.css";

const Tag = ({ text, onPress }) => {
  return (
    <div className="tag">
      <button onClick={onPress}>X</button>
      {text}
    </div>
  );
};

export default Tag;
