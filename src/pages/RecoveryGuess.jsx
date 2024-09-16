import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { replaceRandomMnemonics, validateMnemonics } from "../utils/helpers";
import { toast } from "react-toastify";

const RecoveryGuess = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const location = useLocation();
  const mnemonic = location.state?.mnemonic;
  const seedPhrases = mnemonic ? mnemonic.split(" ") : [];
  const newSeedPhrase = replaceRandomMnemonics(seedPhrases);

  useEffect(() => {
    if (Array.isArray(newSeedPhrase)) {
      function setPhrase() {
        newSeedPhrase.forEach((phrase, index) => {
          setValue((index + 1).toString(), phrase);
        });
      }
      setPhrase();
    } else {
      console.error("Expected newSeedPhrase to be an array.");
    }
  }, [newSeedPhrase, setValue]);

  const onSubmit = (data) => {
    let guessedPhrase = [];
    
    Object.values(data).forEach(value => {
      guessedPhrase.push(value);
    });

    const isValid = validateMnemonics(seedPhrases, guessedPhrase);
    
    if (isValid) {
      toast.success("Success");
      navigate("/send-receive");
    } else {
      toast.error("Invalid phrase");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-slate-700 dark:text-white text-center text-[18px]">
        Confirm Secret Recovery Phrase
      </h3>
      <h2 className="text-slate-700 dark:text-white mt-5 text-center">
        confirm secret recovery phrase
      </h2>
      <form className="flex flex-wrap justify-between gap-2 pt-4 px-2 mb-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="h-[200px] mx-auto mt-8 text-center w-[319px] py-4 rounded-[10px] bg-primary-850 dark:bg-slate-700">
        <div className="flex flex-wrap  justify-between gap-4 pt-4 px-4 mb-4">
          <input
            type="text"
            className={`rounded-lg dark:text-white dark:bg-slate-500 w-20 text-center ${errors["1"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("1", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["2"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("2", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["3"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("3", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["4"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("4", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20  dark:text-white dark:bg-slate-500 text-center ${errors["5"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("5", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["6"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("6", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["7"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("7", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["8"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("8", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["9"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("9", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["10"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("10", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["11"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("11", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
          <input
            type="text"
            className={`rounded-lg w-20 dark:text-white dark:bg-slate-500  text-center ${errors["12"] ?"border-red-700": "border-none"}`}
            placeholder=""
            {...register("12", {validate: (value) => {
              if(!value) return "All field are required"
            }})}
          />
        {/* {newSeedPhrase.map((phrase, index) => {
            <span
              key={index}
              className={`rounded-lg w-[30%] text-center text-white bg-black py-2 "bg-opacity-50"`}
            >
            {phrase}
            </span>
        })} */}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 ml-11 text-slate-700 dark:text-white text-lg rounded-3xl px-2 py-1 w-[251px] bg-primary-850 hover:bg-opacity-75"
      >
        Next
      </button>
      </form>
    </div>
  );
};

export default RecoveryGuess;
