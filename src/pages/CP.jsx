import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle checkbox
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  // Toggle functions for password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    console.log("Create a new wallet button clicked");
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    if (!isChecked) {
      setErrorMessage("Please agree to the terms first.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://block-guard-wallet.onrender.com/wallets/create-new-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );
  
      const result = await response.json();
      console.log("API Result:", result); 
  
      if (response.ok) {
        const passphrase = result.wallet.passPhrase;
        console.log("Passphrase:", passphrase); 
        navigate("/secret-recovery", {
          state: { passphrase },
        });
      } else {
        setErrorMessage("Error creating wallet. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Row One */}
      <div className="text-center text-primary-400">
        <h1 className="text-xl mb-2">Create Password</h1>
        <p className="text-sm m-5">
          This password will unlock your Blockguard wallet only on this device.
          Blockguard cannot recover this password.
        </p>
      </div>

      {/* Row Two */}
      <div className="space-y-4">
        <div className="relative flex items-center w-[300px]">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="border-2 border-gray-300 bg-transparent rounded-full px-4 text-primary-400 text-sm p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password (8 characters min)"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IoEyeOffOutline className="text-white" />
            ) : (
              <IoEyeOutline className="text-white" />
            )}
          </div>
        </div>

        <div className="relative flex items-center w-[300px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
            className="border-2 border-gray-300 bg-transparent rounded-full text-primary-400 px-4 text-sm p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <IoEyeOffOutline className="text-white" />
            ) : (
              <IoEyeOutline className="text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Row Three */}
      <div className="flex flex-col items-center space-y-3">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="w-5 h-5 ml-5"
            onChange={handleCheckbox}
          />
          <p className="text-sm text-primary-400 p-6">
            I understand that Blockguard cannot recover this password for me.{" "}
            <span className="text-blue-500 underline">Learn more</span>
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-primary-50 via-primary-200 to-primary-300 text-primary-400 w-[200px] py-2 rounded-full"
          onClick={handleSubmit}
        
        >
          Create a new wallet
        </button>
        <p className="text-gray-500 underline cursor-pointer">
          I already have an account
        </p>
      </div>
    </div>
  );
};

export default CreatePassword;
