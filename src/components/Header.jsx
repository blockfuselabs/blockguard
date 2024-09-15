import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ isLightMode, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate to access navigation functionality
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationId, setNotificationId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: notificationId + 1,
        type: Math.random() > 0.5 ? "transaction" : "update",
        message:
          Math.random() > 0.5
            ? `Received ${Math.random().toFixed(2)} ETH from 0x${Math.random()
                .toString(16)
                .substr(2, 6)}...`
            : "App updated with new security features.",
      };

      setNotifications((prevNotifications) => {
        const updatedNotifications = [
          newNotification,
          ...prevNotifications,
        ].slice(0, 7); 
        return updatedNotifications;
      });

      setNotificationId((prevId) => prevId + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [notificationId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`flex items-center ${
        isLightMode ? "bg-gray-100" : "bg-primary-950"
      } px-7 py-2`}
    >
      {/* Backward Icon */}
      {location.pathname !== "/" && (
        <div className="flex bg-[#50C878] p-1 rounded-xl flex-grow-0">
          {/* Navigate one step back in the history */}
          <button onClick={() => navigate(-1)} className="text-primary-400">
            <IoIosArrowBack className="text-xl font-bold" />
          </button>
        </div>
      )}

      {/* Spacer to push the buttons to the right */}
      <div className="flex-grow"></div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4 relative">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <IoNotifications
            className="text-[#50C878] h-6 w-6 cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-[-50px] mt-2 w-64 bg-primary-400 rounded-md shadow-lg border border-gray-300 z-10">
              <h3 className="text-primary-500 font-bold px-4 py-2">
                Notifications
              </h3>
              <ul className="divide-y divide-gray-500">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {notification.type === "transaction" ? (
                        <span className="font-medium text-primary-500">
                          Transaction:{" "}
                        </span>
                      ) : (
                        <span className="font-medium text-primary-50">
                          Update:{" "}
                        </span>
                      )}
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-sm text-gray-700">
                    No notifications yet.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="h-10 w-10 rounded-lg p-2">
          {!isLightMode ? (
            <svg
              className="fill-[#50C878] block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          ) : (
            <svg
              className="fill-yellow-500 block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
