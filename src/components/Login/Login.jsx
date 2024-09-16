import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import bcrypt from 'bcryptjs';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // State to toggle password visibility
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const comparePasswords = async (plainPassword, hashedPassword) => {
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    return isValid;
  };

  // Toggle function for password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const hashedPassword = localStorage.getItem('password');

    const isValid = await comparePasswords(password, hashedPassword);

    if(isValid) {
      navigate('/send-receive');
    }else{
      toast.error('Wrong password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Row One: Login Heading at the top */}
      <div className="mt-8">
        <h1 className="text-xl text-primary-850 dark:text-primary-850 font-semibold">Login</h1>
      </div>

      {/* Row Two: Centered items */}
      <div className="flex flex-col space-y-12 items-center justify-center  mt-28">
        <div className="relative flex items-center w-[300px]">
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 bg-transparent rounded-full px-4 text-slate-800 dark:text-white text-sm p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
          <div className="absolute right-3 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <IoEyeOffOutline className="text-slate-800 dark:text-white" /> : <IoEyeOutline className="text-slate-800 dark:text-white" />}
          </div>
        </div>

        <button
            className="bg-primary-850  font-semibold hover:bg-opacity-70 text-slate-700 dark:text-white w-[200px] py-2 rounded-full"
            onClick={handleLogin}
        >
            Unlock
        </button>
        <Link to="/signup">
          <p className="text-slate-700 dark:text-gray-200 underline">I don't have an account</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
