import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/images/blockguard-logo.png";
 

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); 

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCreateWallet = () => {
  if (isChecked) {
    navigate('/create-password'); 
  } else {
    alert('Please agree to the terms first.');
  }
};
  // const handleImportWallet = () => {
  //   if (isChecked) {
  //     navigate('/import-wallet'); 
  //   } else {
  //     alert('Please agree to the terms first.');
  //   }
  // };
  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <div className='flex flex-col items-center space-y-2'>
        <h1 className='text-primary-400 text-2xl font-bold'>Create Your Wallet</h1>
      </div>
      <div className='space-y-6 flex flex-col items-center mt-8'>
        <img src={Logo} alt='Blockguard Logo' className='w-24' />
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='w-18'
            onChange={handleCheckboxChange}
          />
          <p className='text-primary-400'>
            I agree to Blockguard's{' '}
            <a href='#' target='_blank'>
              <span className='text-blue-500 underline'>Terms of Use</span>
            </a>
          </p>
        </div>
        <div className='flex flex-col items-center space-y-5'>
          <button
            className='bg-green-500 hover:bg-primary-600 mt-4 text-primary-400 w-[250px] py-2 rounded-full'
            onClick={handleCreateWallet}
          >
            Create a new wallet
          </button>
          {/* <button
            className='border-2 border-primary-300 text-primary-400 w-[250px] py-2 rounded-full'
            onClick={handleImportWallet}
          >
            Import an existing wallet
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
