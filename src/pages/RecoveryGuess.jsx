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
        <div className="h-[190px] mx-auto mt-4 p-3 text-center w-[319px] rounded-[10px] bg-primary-300 dark:bg-slate-700">
          <div className="flex flex-wrap justify-between gap-2 pt-4 px-2 mb-4">
            {Array.from({ length: 12 }, (_, index) => (
              <input
                key={index + 1}
                type="text"
                className={`rounded-lg w-20 text-center ${errors[(index + 1).toString()] ? "border-red-700" : "border-none"}`}
                placeholder=""
                {...register((index + 1).toString(), {
                  validate: (value) => !value ? "All fields are required" : undefined
                })}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 ml-11 text-slate-700 dark:text-white text-lg rounded-3xl px-2 py-1 w-[251px] bg-gradient-to-r from-primary-50 to-primary-100 hover:bg-opacity-75"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RecoveryGuess;
