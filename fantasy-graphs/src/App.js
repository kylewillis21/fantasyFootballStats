import "./styles/App.css";
import "./styles/Navbar.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HindsightHero from "./pages/HindsightHero";
import SignUp from "./auth/Signup";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/hh" element={<HindsightHero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
