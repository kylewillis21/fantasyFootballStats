import React, { useState, useContext } from "react";
import { auth } from "../firebaseConfig";
import { LeagueContext } from "../context/LeagueId";
import SubmitButton from "./buttons/SubmitButton";
import "../styles/Login.css";

const AddLeagueModal = ({ isOpen, onClose }) => {
  const [leagueId, setLeagueId] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const { setCurrentLeagueId, setCurrentLeagueName, setAllLeagues, allLeagues } =
    useContext(LeagueContext);

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Get user token
      const token = await user.getIdToken();

      const reqBody = {
        leagueId: leagueId,
        nickname: leagueName
      };

      console.log(reqBody);

      const response = await fetch("https://api.ffhindsight.com/api/league", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)
      });

      if (!response.ok) {
        throw new Error("Failed to add league");
      }
      // update the context to the users league
      setCurrentLeagueId(leagueId);
      setCurrentLeagueName(leagueName);
      setAllLeagues([...allLeagues, reqBody]);

      onClose();
    } catch (error) {
      console.error("Error adding league: ", error);
      alert("Failed to add league. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Enter League ID</h2>
        </div>
        <div className="modal-body">
          <input
            className="league-input"
            type="text"
            placeholder="League ID"
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
          />
          <input
            className="league-input"
            type="text"
            placeholder="League Name (optional)"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <SubmitButton text="Submit" onPress={handleSubmit} />
          <SubmitButton text="Close" onPress={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddLeagueModal;
