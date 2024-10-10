import React from "react";

import "../../styles/Stats.css";

const SubmitButton = ({ text, onPress }) => {
  return (
    <button className="submit" onClick={onPress}>
      {text}
    </button>
  );
};

export default SubmitButton;
