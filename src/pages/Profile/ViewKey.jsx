import React, { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoCopy } from "react-icons/go";

const ViewKey = () => {
  const [showKey, setShowKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(""); // Fetch private key as string
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch private key from local storage
  useEffect(() => {
    const storedPrivateKey = localStorage.getItem("privateKey");
    if (storedPrivateKey) {
      setPrivateKey(storedPrivateKey);
    }
  }, []);

  const handleCopy = () => {
    if (privateKey) {
      navigator.clipboard
        .writeText(privateKey)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset copy status after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="space-y-5 mt-4">
      <h1 className="text-slate-700 dark:text-white text-xl text-center font-semibold">Private Key</h1>
      <h2 className="mx-6 p-2 text-slate-700 dark:text-white">This is your private key. Keep it safe!</h2>
      
      {/* Private Key Display */}
      <div className="w-[300px] h-40 mx-6 rounded-xl bg-gray-300 dark:bg-slate-700 p-4 relative">
      
        {showKey ? (
          <textarea
            value={privateKey}
            readOnly
            className="w-full h-full p-2 bg-transparent text-slate-800 dark:text-white"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span className="text-gray-500 dark:text-white">Private Key Hidden</span>
          </div>
        )}
      </div>
      
      {/* Toggle Visibility and Copy Actions */}
      <div className="flex justify-between items-center gap-3 p-2 ml-4 mt-4 mb-4">
        {/* Toggle key visibility */}
        <div className="text-slate-700 dark:text-white text-sm flex items-center space-x-2 cursor-pointer" onClick={() => setShowKey(!showKey)}>
          {showKey ? (
            <IoEyeOutline className="text-xl" />
          ) : (
            <IoEyeOffOutline className="text-xl" />
          )}
          <span className="text-sm">{showKey ? "Hide Private Key" : "Show Private Key"}</span>
        </div>
        
        {/* Copy to Clipboard */}
        <div className="text-slate-700 dark:text-white text-sm flex items-center p-4 space-x-1 cursor-pointer" onClick={handleCopy}>
          {copySuccess ? (
            <span className="text-green-500">Copied!</span>
          ) : (
            <>
              <GoCopy />
              <span>Copy to clipboard</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewKey;
