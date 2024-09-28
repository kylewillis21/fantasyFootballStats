import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebaseConfig";
import "../styles/Login.css";

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const isVaildEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    // Validating the email and password
    if (!isVaildEmail(email)) {
      setEmailError(true);
      return;
    }

    if (!isValidPassword(password)) {
      setValidationError(true);
      return;
    }

    if (password === password2) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up successfully");
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      setPasswordError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sign Up</h2>
        </div>
        <div className="modal-body">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPasswordError(false);
              setValidationError(false);
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => {
              setPasswordError(false);
              setValidationError(false);
              setPassword2(e.target.value);
            }}
          />
          {passwordError && <p className="error">passwords do not match</p>}
          {emailError && <p className="error">invalid email</p>}
          {validationError && (
            <p className="error">
              password must contain as least 8 characters long and contain at least one number
            </p>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
