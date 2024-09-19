import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import "../styles/Login.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully");
      onClose();
    } catch (error) {
      //   alert("Error signing in");
      console.error(error);
      setError(true);
    }
  };

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
