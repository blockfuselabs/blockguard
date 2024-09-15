import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPhrase = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Input value Submitted", inputValue);
    setInputValue("");
    handleConfirmPhrase(); // Navigate after submission
  };

  const handleConfirmPhrase = () => {
    navigate('/send-receive');
  };

  return (
    <div className="mt-8">
      <div className="flex gap-1 items-center">
        <h3 className="text-white text-center text-[18px]">
          Confirm Secret Recovery Phrase
        </h3>
      </div>

      <h2 className="text-[#FF2CDF] mt-20 text-center">
        confirm secret recovery phrase
      </h2>
      <form onSubmit={handleSubmit} className="h-[236px] mx-auto mt-8 text-center w-[319px] rounded-[10px]  bg-primary-300">
        <div className="flex justify-between pt-4 mx-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="rounded-lg w-20 text-center placeholder-black"
            placeholder="goat"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="float"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="ramp"
          />
        </div>
        <div className="flex justify-between pt-8 mx-4">
          <input
            type="text"
            className="rounded-lg w-20 text-center"
            placeholder=""
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="jump"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center"
            placeholder=""
          />
        </div>
        <div className="flex justify-between pt-8 mx-4">
          <input
            type="text"
            className="rounded-lg w-20 text-center placeholder-black"
            placeholder="mother"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center"
            placeholder=""
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="demand"
          />
        </div>
        <div className="flex justify-between pt-10 mx-4">
          <input
            type="text"
            className="rounded-lg w-20 text-center placeholder-black"
            placeholder="fuse"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="flash"
          />
          <input
            type="text"
            className="w-20 rounded-lg text-center placeholder-black"
            placeholder="block"
          />
        </div>
        <button type="submit"
          className="mt-10 text-white text-lg rounded-3xl px-2 py-1 w-[251px] bg-gradient-to-r from-primary-50 to-primary-100 hover:bg-opacity-75"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ConfirmPhrase;
