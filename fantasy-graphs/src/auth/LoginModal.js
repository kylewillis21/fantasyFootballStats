import React, { useState, useContext, useEffect } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import { LeagueContext } from "../context/LeagueId";
import "../styles/Login.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { allLeagues, setAllLeagues } = useContext(LeagueContext);

  const fetchLeagues = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/league", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leagues");
      }

      const leagues = await response.json();
      console.log("Fetched leagues: ", leagues);
      setAllLeagues(leagues.leagues);
    } catch (error) {
      console.error("Error fetching leagues: ", error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Signed in successfully");

      // Fetch users leagues
      const token = await user.getIdToken();
      fetchLeagues(token);

      // Close the modal
      onClose();
    } catch (error) {
      //   alert("Error signing in");
      console.error(error);
      setError(true);
    }
  };

  // Looking for changes in allLeagues
  useEffect(() => {
    if (allLeagues) {
      console.log("Updated leagues: ", allLeagues);
    }
  }, [allLeagues]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login</h2>
        </div>
        <div className="modal-body">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setError(false);
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
          />
          {error && <p className="error">Invalid email or password</p>}
        </div>
        <div className="modal-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
