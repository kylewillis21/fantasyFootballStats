import "./styles/App.css";
import "./styles/Navbar.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes path="/home" element={<Home />} />
    </>
  );
}

export default App;
