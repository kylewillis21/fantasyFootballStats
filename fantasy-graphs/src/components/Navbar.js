import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueId";
import { auth, signOut } from "../firebaseConfig";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";
import AddLeagueModal from "../components/AddLeagueModal";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 801 });
  const { currentLeagueId, setCurrentLeagueId } = useContext(LeagueContext);

  // Handling authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("User signed out successfully");
    } catch (err) {
      alert("Error signing out: ", err);
    }
  };

  return (
    <nav className="nav">
      {/* <nav className="siteTitle">Fantasy Football Stats</nav> */}
      <ul>
        <CustomLink to="">Home</CustomLink>
        <CustomLink to="/graphs">Graphs</CustomLink>
        <CustomLink to="/hh">Hindsight Hero</CustomLink>
        {user ? (
          <li>
            <Link onClick={() => setLeagueModalOpen(true)}>Add League</Link>
          </li>
        ) : (
          <></>
        )}

        <AddLeagueModal isOpen={isLeagueModalOpen} onClose={() => setLeagueModalOpen(false)} />
      </ul>
      <div className="navInput">
        {user ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <div className="navButtons">
              <button onClick={() => setLoginModalOpen(true)}>Login</button>
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
              <button onClick={() => setSignupModalOpen(true)}>Sign Up</button>
              <SignUpModal isOpen={isSignupModalOpen} onClose={() => setSignupModalOpen(false)} />
            </div>
          </>
        )}
      </div>
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
