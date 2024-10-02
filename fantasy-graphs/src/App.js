import "./styles/App.css";
import "./styles/Navbar.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HindsightHero from "./pages/HindsightHero";
import TeamStats from "./pages/TeamStats";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/hh" element={<HindsightHero />} />
        <Route path="stats" element={<TeamStats />} />
      </Routes>
    </>
  );
}

export default App;
