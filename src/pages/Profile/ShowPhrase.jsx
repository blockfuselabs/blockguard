import React, { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoCopy } from "react-icons/go";
import { useLocation } from "react-router-dom";

const ShowPhrase = () => {
  const [showPhrase, setShowPhrase] = useState(false);
  const [seedPhrases, setSeedPhrases] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false); 

  const location = useLocation();
  const { mnemonic } = location.state || {};

  useEffect(() => {
    const storedPassphrase = localStorage.getItem("mnemonic");
    if (storedPassphrase) {
      setSeedPhrases(storedPassphrase.split(" "));
    }
  }, []);

  const handleCopy = () => {
    if (seedPhrases.length > 0) {
      const mnemonicString = seedPhrases.join(" ");
      navigator.clipboard
        .writeText(mnemonicString)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div>
      <div className="space-y-2 mt-4">
        <h1 className="mx-6 p-2 text-xl text-center text-slate-700 dark:text-white">
          Seed Phrase
        </h1>
        <h2 className="mx-6 p-2 text-slate-700 dark:text-white">
          These words are the keys to your wallet.
        </h2>
        <div className="w-[300px] mx-6 rounded-xl bg-gray-300 dark:bg-slate-700 p-4">
          {/* 3 columns x 4 rows grid for seed phrase */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {seedPhrases.map((phrase, index) => (
              <input
                key={index}
                type={showPhrase ? "text" : "password"}
                className="rounded-lg text-center placeholder-slate-700 dark:placeholder-white bg-transparent dark:text-white border border-gray-400 p-2"
                placeholder={showPhrase ? phrase : "****"}
                value={showPhrase ? phrase : ""}
                readOnly
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 w-[300px] p-2 ml-4 mt-4 mb-4">
          <div className="dark:text-white text-sm flex items-center space-x-2">
            {showPhrase ? (
              <IoEyeOutline
                onClick={() => setShowPhrase(false)}
                className="cursor-pointer text-xl"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPhrase(true)}
                className="cursor-pointer text-xl"
              />
            )}
            <span className="text-sm">Show seed phrase</span>
          </div>

          {/* Show "Copied!" text temporarily after copying, otherwise show the copy icon */}
          <div className="text-slate-700 dark:text-white text-sm flex items-center space-x-1 cursor-pointer">
            {copySuccess ? (
              <span className="text-green-500">Copied!</span>
            ) : (
              <div className="flex items-center space-x-1" onClick={handleCopy}>
                <GoCopy />
                <span>Copy to clipboard</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPhrase;
