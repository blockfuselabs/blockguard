import Logo from "../assets/images/blockguard-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { isCreated } from "../utils/helpers";

const Welcome = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccountCreated = async () => {
      const created = await isCreated();
      setIsAccountCreated(created);
      if (created) {
        navigate("/login");
      }
    };
    checkAccountCreated();
  }, []);

  const handleSignup = () => {
      navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="flex items-center mt-20">
          <img src={Logo} alt="blockguard logo" className="w-24 mx-auto" />
        </div>
        <h1 className="text-xl text-primary-850 dark:text-primary-850 font-semibold mt-10">
          Welcome to Blockguard
        </h1>
        <p className="text-slate-700 dark:text-white mt-5 break-words">
          Sign up and come to the blockguard world
        </p>
        <div className="space-y-5 mt-10">
          <button
            className="bg-primary-850  font-semibold hover:bg-opacity-70 text-primary-400 w-[200px] py-2 rounded-full"
            onClick={handleSignup}
          >
            Let&apos;s Start
          </button>
          <Link to="">
            <p className="text-gray-600 dark:text-gray-200 underline mt-4 text-sm">
              I already have an account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
