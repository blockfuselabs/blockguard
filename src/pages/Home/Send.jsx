import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineQrcode } from "react-icons/ai";
import blockies, { render } from "ethereum-blockies";
import jsQR from "jsqr";
import { sendTransaction } from "../../utils/walletUtils";
import { ethers } from "ethers";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from 'react-loader-spinner'


const Send = () => {
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [ inputAmount, setInputAmount ] = useState("");
  const [file, setFile] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserAccounts = () => {
      const savedAccounts = localStorage.getItem('userAccounts');
      if (savedAccounts) {
        const accountsData = JSON.parse(savedAccounts);
        // Generate Blockies avatar for each account dynamically
        const updatedAccounts = accountsData.map((account) => ({
          ...account,
          profilePicUrl: account.profilePicUrl,
        }));
        setAccounts(updatedAccounts);
        setSelectedAccount(updatedAccounts[0]);
      }
    };
    getUserAccounts();
  }, []);

  const handleSend = async () => {

    setLoading(true);

    try {
      // const txData = {
      //   to: inputAddress,
      //   value: ethers.utils.parseEther('0.1'), // Example amount
      //   gasLimit: 21000,
      // };
      
      const send = await sendTransaction(inputAmount, inputAddress);

      if(send){
        toast.success("Transaction sent successfully")
        navigate("/send-receive")
      }else{
        toast.error("An error occcurred")
      }
      console.log("Transaction sent successfully");
    } catch (error) {
      console.log("Error sending Transaction", error);
    } finally {
      setLoading(false); // Enable the button after the process is done
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectAccount = (account) => {
    setSelectedAccount(account);
    setIsDropdownOpen(false);
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        const img = new Image();
        img.src = imageDataUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);
          const imageData = context.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, img.width, img.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            const qrData = code.data;
            const addressMatch = qrData.match(
              /ethereum:(0x[a-fA-F0-9]{40})@0x[0-9a-fA-F]+/
            );
            if (addressMatch) {
              setInputAddress(addressMatch[1]);
            } else {
              alert("No valid Ethereum address found in the QR code.");
            }
          } else {
            alert("No QR code found in the image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center text-center mt-5 space-y-8">
      {/* Row From Section */}
      <div className="space-y-2 w-72">
        <h1 className="text-primary-400 text-start ml-6">From</h1>
        <button
          className="flex items-center rounded-full border-2 text-primary-400 text-sm w-full h-12 px-3"
          onClick={toggleDropdown}
        >
          <div className="flex items-center space-x-2">
            <img
              src={selectedAccount ? selectedAccount.profilePicUrl : ""}
              alt="profile picture"
              className="w-8 h-8 rounded-full"
            />
            <div className="space-x-10">
              <span>
                {selectedAccount ? selectedAccount.name : "Select Account"}
              </span>
              <span className="text-gray-500">
                {selectedAccount
                  ? truncateAddress(selectedAccount.publicAddress)
                  : ""}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="mt-2 bg-primary-900 border rounded-md shadow-lg w-full">
            {accounts.map((account, index) => (
              <button
                key={index}
                className="flex justify-between items-center w-full px-3 py-2 hover:bg-primary-400"
                onClick={() => selectAccount(account)}
              >
                <div className="flex items-center">
                  <img
                    src={account.profilePicUrl}
                    alt="profile picture"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{account.name}</span>
                </div>
                <span>{truncateAddress(account.publicAddress)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Row Amount Section */}
      <div className="space-y-1 w-72">
        <h1 className="text-primary-400 text-start ml-6">Amount</h1>
        <div className="relative flex items-center">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="border-2 border-gray-300 bg-transparent rounded-full text-primary-400 text-sm p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input amount"
          />
        </div>
      </div>

      {/* Row To Account Section */}
      <div className="space-y-1 w-72">
        <h1 className="text-primary-400 text-start ml-6">To</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            className="border-2 border-gray-300 bg-transparent rounded-full text-primary-400 text-sm p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter public address or ENS name"
          />
          <label
            htmlFor="qr-upload"
            className="absolute right-3 text-gray-400 cursor-pointer"
          >
            <AiOutlineQrcode className="text-xl mr-3" />
            <input
              id="qr-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Row Accounts Section */}
      {/* <div className="w-72 space-y-2">
        <h1 className="text-primary-400 text-start ml-2 border-b-2 border-b-primary-600 border-spacing-8">
          Your Accounts ({accounts.length})
        </h1>
        {accounts.map((account, index) => (
          <div key={index} className="flex items-center py-2 gap-2">
            <img
              src={account.profilePicUrl}
              alt="profile picture"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-primary-400 font-semibold text-left">
                {account.name}
              </h1>
              <p className="text-primary-400 text-left">
                {truncateAddress(account.publicAddress)}
              </p>
            </div>
          </div>
        ))}
      </div> */}

      {loading && (
        <RotatingLines
          visible={true}
          height="50"
          width="50"
          color="#8b06e9"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {/* Row Send and Cancel Button Section */}
      <div className="space-x-6 space-y-9">
        <button className="w-32 border-2 border-primary-300 rounded-full p-1 text-primary-400 hover:bg-slate-200 hover:text-primary-50">
          Cancel
        </button>
        <button
          className="w-32 bg-gradient-to-r from-primary-50 via-primary-200 to-primary-300 rounded-full p-1 text-primary-400 hover:opacity-70"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Send;
