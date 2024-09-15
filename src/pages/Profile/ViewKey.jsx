import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { GoCopy } from 'react-icons/go';

const ViewKey = () => {
    const [showPhrase, setShowPhrase] = useState(false);

    // Destructure location state to get passphrase and hashedPassword
  const { passphrase, hashedPassword } = location.state || {}; 

     // Handle undefined passphrase case by setting a fallback
  const seedPhrases = passphrase ? passphrase.split(" ") : [];
  return (
    <div>
        <div className='space-y-5 mt-4'>
          <h1 className='text-primary-400 text-center font-semibold'>Private Key</h1>
            <h2 className='mx-6 p-2 text-primary-400'>These words are the keys to your wallet</h2>
            <div className='w-[300px] h-[200px] mx-6 rounded-xl bg-slate-500 p-4'>
                 {/* Hidden and visible phrases */}
        <div className="flex flex-wrap justify-between gap-2 mb-4">
          {seedPhrases.map((phrase, index) => (
            <input
              key={index}
              type={showPhrase ? "text" : "password"}
              className="rounded-lg w-[30%] text-center placeholder-black"
              placeholder={showPhrase ? phrase : "****"}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 w-[300px] p-2 ml-4 mt-4 mb-4">
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
          <span className="text-sm">Show Private Key</span>
        </div>
        <div className="text-pink-500 text-sm flex items-center space-x-1">
          <GoCopy />
          <span>Copy to clipboard</span>
        </div>
      </div>
      

            </div>
        </div>
  )
}

export default ViewKey