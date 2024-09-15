import React from 'react';
import {IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SerectRocoveryHidden = () => {
  const navigate = useNavigate();
 

  const handleSecretRecovery = () => {
    navigate('/secret-recovery');
  };

  return (
    <div className="h-[600px] flex flex-col items-center p-4 overflow-auto">
      <h3 className="text-white text-center text-xl mb-4">
        Write down your Secret Recovery Phrase
      </h3>
      <p className='text-white mx-3'>Write down this 12-word Secret Recovery Phrase and save it in a place that you trust and only you can access.</p>
      <h2 className="text-white text-center mb-2">
        Tips to safeguarding your secret recovery phrases:
      </h2>
      <ul className="list-disc pl-4 text-white mb-4">
        <li>Save in a password manager</li>
        <li>Store in a safe deposit box</li>
        <li>Write down and store in multiple secret places</li>
      </ul>
      <div className="h-[25%] mx-auto flex flex-col items-center justify-center text-center w-full max-w-[400px] bg-primary-300 rounded-[10px] p-4 overflow-auto">
      <IoEyeOutline
       className="cursor-pointer text-4xl text-primary-400"
            />
      <p className='text-primary-400'>Make sure nobody is looking</p>
      </div>
    
      <button
        className="mt-4 text-white rounded-full py-2 w-[250px] bg-gradient-to-r from-primary-50 to-primary-100 hover:bg-opacity-75"
      onClick={handleSecretRecovery}>
        Next
      </button>
    </div>
  );
};

export default SerectRocoveryHidden;
