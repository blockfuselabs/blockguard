import React, { useState } from "react";
import { GoCopy } from "react-icons/go";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const SecretRecovery = () => {
  // State to toggle the visibility of the phrases
  const [showPhrase, setShowPhrase] = useState(false);
  const [copySuccess, setCopySuccess] = useState(""); 

  const navigate = useNavigate();
  const location = useLocation();
 

  const mnemonic = location.state?.mnemonic;

  // // Destructure location state to get passphrase and hashedPassword
  // const { passphrase, hashedPassword } = location.state || {};

  // // Handle undefined passphrase case by setting a fallback
  const seedPhrases = mnemonic ? mnemonic.split(" ") : [];

  // Function to copy seed phrases to clipboard
  const handleCopy = () => {
    if (mnemonic) {
      navigator.clipboard
        .writeText(mnemonic)
        .then(() => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 2000); // Reset success message after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleSecretGuess = () => {
    navigate("/recovery-guess", {
      state: { mnemonic: mnemonic }
    });

  };

  return (
    <div className="h-[600px] flex flex-col items-center p-4 overflow-auto">
      <h3 className="text-white text-center text-xl mb-4">
        Write down your Secret Recovery Phrase
      </h3>
      <h2 className="text-white text-center mb-2">
        Tips to safeguarding your secret recovery phrases:
      </h2>
      <ul className="list-disc pl-4 text-white mb-4">
        <li>Save in a password manager</li>
        <li>Store in a safe deposit box</li>
        <li>Write down and store in multiple secret places</li>
      </ul>
      <div className="h-[30%] mx-auto text-center w-full max-w-[400px] bg-primary-300 rounded-[10px] p-4 overflow-auto">
        {/* Hidden and visible phrases */}
        <div className="flex flex-wrap justify-between gap-2 mb-4">
          {seedPhrases.map((phrase, index) => (
            <span
              key={index}
              className={`rounded-lg w-[30%] text-center text-white bg-black py-2 ${
                showPhrase ? "bg-opacity-50" : "bg-opacity-10"
              }`}
            >
              {showPhrase ? phrase : "****"}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-[400px] mt-4 mb-2">
        <div className="text-white text-sm flex items-center space-x-2">
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
        <div
          className="text-pink-500 text-sm flex items-center space-x-1 cursor-pointer"
          onClick={handleCopy}
        >
          <GoCopy className="text-xl" />
          <span>Copy to clipboard</span>
          {copySuccess && (
            <span className="text-green-500 ml-2">{copySuccess}</span>
          )}
        </div>
      </div>
      <button
        className="mt-2 text-white rounded-full py-2 w-[250px] bg-gradient-to-r from-primary-50 to-primary-100 hover:bg-opacity-75"
        onClick={handleSecretGuess}
      >
        Next
      </button>
    </div>
  );
};

export default SecretRecovery;
