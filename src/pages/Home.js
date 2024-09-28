import React, { useEffect, useState } from "react";

import { auth } from "../firebaseConfig";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";

import "../styles/Home.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignUpModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="homeContainer">
      <div className="homeBanner">
        <img
          alt="Football banner"
          src="https://t4.ftcdn.net/jpg/02/34/88/29/240_F_234882970_Tj7wkuZDbJG80pIzLeVCQFmnycVGQKxj.jpg"
        />
        {user ? (
          <div className="bannerContent">
            <h1>Welcome {user.email}</h1>
          </div>
        ) : (
          <div className="bannerContent">
            <h1>Welcome to Hindsight Heroes</h1>
            <div className="homeButton">
              <button onClick={() => setLoginModalOpen(true)}>Login</button>
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
              <button onClick={() => setSignUpModalOpen(true)}>Register</button>
              <SignUpModal isOpen={isSignupModalOpen} onClose={() => setSignUpModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
      {/* dashboards and whatnot */}
      {user ? <></> : <></>}
      <div className="infoContainer">
        <div className="info">
          <h2>About</h2>
          <p>
            Welcome to Hindsight Heroes, the ultimate platform for fantasy football enthusiasts!
            Whether you're a seasoned league manager or a newcomer to the game, we provide all the
            tools you need to dominate your league with confidence. At Hindsight Heroes, we combine
            powerful data analysis with seamless user management to enhance your fantasy football
            experience. Our platform allows you to easily manage multiple leagues, and make informed
            decisions based on up-to-date performance data. We’re committed to providing an
            intuitive, user-friendly interface that helps you make smarter, faster, and better
            decisions throughout the fantasy season. Join our community of football fans, connect
            with other players, and make every game count!
          </p>
        </div>
        <div className="info">
          <h2>How to use</h2>
          <p>
            After you have registered with the site, you start adding fantasy leagues using your
            fantasy league's ID found in the url of your league. For example, if your league url is:
          </p>
          <p>
            https://fantasy.espn.com/football/league?leagueId=
            <span className="highlight">123456789</span>&seasonId=2024
          </p>
          <p>
            The highlighted part of the url is the ID of your league. (Note that this website
            currently only works with ESPN fantasy leagues, and leagues that are set to public. If
            your league is not set to public contact your league commissioner to have him change
            that in the league settings)
          </p>
        </div>
      </div>
    </div>
  );
}
