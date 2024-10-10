import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueId";
import { auth, signOut } from "../firebaseConfig";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";
import AddLeagueModal from "../components/AddLeagueModal";
import LeagueDropdown from "./LeagueDropdown";
import SubmitButton from "./buttons/SubmitButton";

// Mobile imports
// import { useClickAway } from "react-use";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 801 });

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

  if (isDesktop) {
    // The desktop view of the navbar
    return (
      <nav className="nav">
        {/* <nav className="siteTitle">Fantasy Football Stats</nav> */}
        <ul>
          <CustomLink to="">Home</CustomLink>
          {user ? (
            <>
              <CustomLink to="/stats">Team Stats</CustomLink>
              <CustomLink to="/hh">Hindsight Hero</CustomLink>
              <li>
                <Link onClick={() => setLeagueModalOpen(true)}>Add League</Link>
              </li>
            </>
          ) : null}
          <AddLeagueModal isOpen={isLeagueModalOpen} onClose={() => setLeagueModalOpen(false)} />
        </ul>
        <div className="navInput">
          {user ? (
            <>
              <div className="navButtons">
                <LeagueDropdown />
                <SubmitButton onPress={handleSignOut} text="Sign Out" />
              </div>
            </>
          ) : (
            <>
              <div className="navButtons">
                <SubmitButton onPress={() => setLoginModalOpen(true)} text="Login" />
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
                <SubmitButton onPress={() => setSignupModalOpen(true)} text="Sign Up" />
                <SignUpModal isOpen={isSignupModalOpen} onClose={() => setSignupModalOpen(false)} />
              </div>
            </>
          )}
        </div>
      </nav>
    );
  } else {
    // mobile view of the navbar
    return (
      <nav className="nav">
        <div className="hamburger">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="mobileMenu"
            >
              <ul>
                <CustomLink to="" onClick={() => setOpen(false)}>
                  Home
                </CustomLink>
                <CustomLink to="/stats" onClick={() => setOpen(false)}>
                  Team Stats
                </CustomLink>
                <CustomLink to="/hh" onClick={() => setOpen(false)}>
                  Hindsight Hero
                </CustomLink>
                {user ? (
                  <li>
                    <Link
                      onClick={() => {
                        setLeagueModalOpen(true);
                        setOpen(false);
                      }}
                    >
                      Add League
                    </Link>
                  </li>
                ) : null}
              </ul>
              <div className="navInput">
                {user ? (
                  <div className="navButtons">
                    <LeagueDropdown />
                    <button
                      onClick={() => {
                        handleSignOut();
                        setOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="navButtons">
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <LoginModal
                      isOpen={isLoginModalOpen}
                      onClose={() => setLoginModalOpen(false)}
                    />
                    <button
                      onClick={() => {
                        setSignupModalOpen(true);
                        setOpen(false);
                      }}
                    >
                      Register
                    </button>
                    <SignUpModal
                      isOpen={isSignupModalOpen}
                      onClose={() => setSignupModalOpen(false)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AddLeagueModal isOpen={isLeagueModalOpen} onClose={() => setLeagueModalOpen(false)} />
      </nav>
    );
  }
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
