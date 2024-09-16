import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import blockies from "ethereum-blockies";
import bcrypt from 'bcryptjs';
import { generateMnemonic, createHdWallet } from "../utils/walletUtils";

const CreatePassword = () => {
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
  const navigate = useNavigate();

  
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);



  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if password is at least 8 characters
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    // Check if terms are agreed to
    if (!isChecked) {
      setErrorMessage("Please agree to the terms first.");
      return;
    }
  
    try {
      const HdWallet = createHdWallet();
      const Mnemonic = HdWallet.mnemonic.phrase;
      const address = HdWallet.address;
      const PrivateKey = HdWallet.privateKey;
      const publicKey = HdWallet.publicKey;
  
      // Save to local storage
      localStorage.setItem('mnemonic', Mnemonic);
      localStorage.setItem("address", address);
      localStorage.setItem("privateKey", PrivateKey);
      localStorage.setItem("PublicKey", publicKey);
  
      // Example account data
      let accounts = [
        { name: "Account 1", publicAddress: address, profilePicUrl: blockies.create({ seed: address }).toDataURL() }
      ];

      const hashedPassword = await hashPassword(password);
      
      localStorage.setItem('userAccounts', JSON.stringify(accounts));
      localStorage.setItem('password', hashedPassword);
  
      navigate("/secret-recovery", {
        state: { mnemonic: Mnemonic }
      });
    } catch (err) {
      console.error("Error creating new wallet", err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Row One */}
      <div className="text-center">
        <h1 className="text-xl text-primary-850 dark:text-primary-850 mb-2">Create Password</h1>
        <p className="text-sm m-5 text-slate-700 dark:text-white">
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
            className="border-2 border-gray-300 bg-transparent rounded-full px-4 text-slate-700 dark:text-white text-sm p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password (8 characters min)"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IoEyeOffOutline className="text-slate-700 dark:text-white" />
            ) : (
              <IoEyeOutline className="text-slate-700 dark:text-white" />
            )}
          </div>
        </div>

        <div className="relative flex items-center w-[300px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
            className="border-2 border-gray-300 bg-transparent rounded-full text-slate-700 dark:text-white px-4 text-sm p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <IoEyeOffOutline className="text-slate-700 dark:text-white" />
            ) : (
              <IoEyeOutline className="text-slate-700 dark:text-white" />
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
          <p className="text-sm text-slate-700 dark:text-white p-6">
            I understand that Blockguard cannot recover this password for me.{" "}
            <span className="text-blue-500 underline">Learn more</span>
          </p>
        </div>
        <button
          className="bg-primary-850 text-slate-700 dark:text-white w-[200px] py-2 rounded-full"
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
