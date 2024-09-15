import React, { useState } from 'react';
import { IoSyncSharp , IoPerson, IoStatsChart, IoSwapVerticalSharp, IoCard } from 'react-icons/io5';
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="navigation">
      <ul>
        {/* Left Icons */}
        <li
          className={`list ${activeIndex === 0 ? 'active' : ''}`}
          onClick={() => handleItemClick(0)}
        >
          <Link to="/transactions">
            <span className="icon">
              <IoSyncSharp  />
            </span>
            <span className="text">Transactions</span>
            <span className="circle"></span>
          </Link>
        </li>
        <li
          className={`list ${activeIndex === 1 ? 'active' : ''}`}
          onClick={() => handleItemClick(1)}
        >
          <Link to="/exchange">
            <span className="icon">
              <IoSwapVerticalSharp />
            </span>
            <span className="text">Exchange</span>
            <span className="circle"></span>
          </Link>
        </li>
        {/* Center Icon */}
        <li
          className={`list ${activeIndex === 2 ? 'active' : ''}`}
          onClick={() => handleItemClick(2)}
        >
          <Link to="/send-receive">
            <span className="icon">
              <IoCard />
            </span>
            <span className="text">Send/Receive</span>
            <span className="circle"></span>
          </Link>
        </li>
        {/* Right Icons */}
        <li
          className={`list ${activeIndex === 3 ? 'active' : ''}`}
          onClick={() => handleItemClick(3)}
        >
          <Link to="/statistics">
            <span className="icon">
              <IoStatsChart/>
            </span>
            <span className="text">statistics</span>
            <span className="circle"></span>
          </Link>
        </li>
        <li
          className={`list ${activeIndex === 4 ? 'active' : ''}`}
          onClick={() => handleItemClick(4)}
        >
          <Link to="/profile">
            <span className="icon">
              <IoPerson />
            </span>
            <span className="text">Profile</span>
            <span className="circle"></span>
          </Link>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default Navbar;
