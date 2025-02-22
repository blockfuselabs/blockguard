import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

//Home Imports
import Home from "./pages/Home/Home";
import Send from "./pages/Home/Send";
import Receive from "./pages/Home/Receive";

import Welcome from "./pages/Welcome";

// Profile Imports
import Profile from "./pages/Profile/Profile";
import Currency from "./pages/Profile/Currency";
import Network from "./pages/Profile/EthNetwork";
import Theme from "./pages/Profile/Theme";
import SeedPhrase from "./pages/Profile/ShowPhrase";
import PrivateKey from "./pages/Profile/ViewKey"

//Components Imports
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";

//Pages Imports
import Exchange from "./pages/Exchange";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

//Signup Imports
import SerectRecovery from "./pages/SerectRecovery";
import RecoveryGuess from "./pages/RecoveryGuess";
import Login from "./components/Login/Login";
import SignUp from "./pages/SignUp";
import CreatePassword from "./pages/CreatePassword";

// Define a separate component for routing
function AppRoutes({ isLightMode, toggleTheme }) {
  const location = useLocation(); 

  // Determine if the Navbar should be displayed
  const showNavbar = !["/", "/welcome", "/signup", "/login", "/create-password", "/secret-recovery", "/recovery-guess"].includes(location.pathname);

  return (
    <>
    <ToastContainer />
    <div className={`w-[350px] h-[600px] overflow-hidden ${!isLightMode ? "bg-slate-800 text-primary-950" : "bg-gray-100"}`}>
      <Header isLightMode={isLightMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/send-receive" element={<Home />} />
        <Route path="/send-token" element={<Send />} />
        <Route path="/receive-token" element={<Receive />} />
        <Route path="/transactions" element={<Transactions />} />
        {/* Profile Route */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/network" element={<Network />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/seed-phrase" element={<SeedPhrase />} />
        <Route path="/private-key" element={<PrivateKey />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/secret-recovery" element={<SerectRecovery />} />
        <Route path="/recovery-guess" element={<RecoveryGuess />} />
      </Routes>
      {showNavbar && <Navbar />}
    </div>
    </>
  );
}

function App() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light";
  });

  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);
  

  return (
    <Router>
      <AppRoutes isLightMode={isLightMode} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
