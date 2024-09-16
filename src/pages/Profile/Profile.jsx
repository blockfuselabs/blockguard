import React from "react";
import { HiCurrencyDollar } from "react-icons/hi";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { MdOutlineStickyNote2, MdKey, MdOutlineNavigateNext } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleViewKey = () => {
    navigate('/private-key');
  };
  const handleShowPhrase = () => {
    navigate('/seed-phrase');
  };
  const handleCurrency = () => {
    navigate('/currency');
  };
  const handleTheme = () => {
    navigate('/theme');
  };
  const handleNetwork = () => {
    navigate('/network');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Card One */}
      <div className="w-[300px] h-[200px] mx-6 mt-5 rounded-xl bg-gray-300 dark:bg-slate-700 p-4">
        <h1 className="text-slate-700 dark:text-white ">Preference</h1>
        <div className="flex flex-col">
          <button className="flex items-center justify-between w-full h-12 px-1 text-slate-700 dark:text-white text-sm" onClick={handleCurrency}>
            <div className="flex items-center gap-2">
              <HiCurrencyDollar className="text-xl" />
              Currency
            </div>
            <MdOutlineNavigateNext className="text-xl" />
          </button>
          <button className="flex items-center justify-between w-full h-12 px-1 text-slate-700 dark:text-white text-sm" onClick={handleNetwork}>
            <div className="flex items-center gap-2">
              <BsGlobeEuropeAfrica className="text-xl" />
              Network
            </div>
            <MdOutlineNavigateNext className="text-xl" />
          </button>
          <button className="flex items-center justify-between w-full h-12 px-1 text-slate-700 dark:text-white text-sm" onClick={handleTheme}>
            <div className="flex items-center gap-2">
              <CgDarkMode className="text-xl" />
              Theme
            </div>
            <MdOutlineNavigateNext className="text-xl" />
          </button>
        </div>
      </div>
      {/* Card two */}
      <div className="w-[300px] h-[200px] mx-6 rounded-xl bg-gray-300 dark:bg-slate-700 p-4">
        <h1 className="text-slate-700 dark:text-white">Security</h1>
        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-between w-full h-12 px-1 text-slate-700 dark:text-white text-sm" onClick={handleShowPhrase}>
            <div className="flex items-center gap-2">
              <MdOutlineStickyNote2 className="text-xl" />
              Show Recovery Phrase
            </div>
            <MdOutlineNavigateNext className="text-xl" />
          </button>
          <button className="flex items-center justify-between w-full h-12 px-1 text-slate-700 dark:text-white text-sm" onClick={handleViewKey}>
            <div className="flex items-center gap-2">
              <MdKey className="text-xl" />
              View Private Key
            </div>
            <MdOutlineNavigateNext className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
