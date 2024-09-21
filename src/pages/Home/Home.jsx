import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCircleDot } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { MdCallReceived } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getBalance } from "../../utils/walletUtils";
import axios from "axios";
import { ethers } from "ethers";

const networkColors = {
  Ethereum: "#627EEA",
  Sepolia: "#F7931A",
};

// Home Component
const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({ name: "Ethereum", symbol: "ETH", color: networkColors["Ethereum"] });
  const [networks, setNetworks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    const fetchNetwork = async () => {
      const fetchedNetwork = [
        { name: "Ethereum", symbol: "ETH" },
        { name: "Sepolia", symbol: "SepoliaETH" },
      ];

      const networksWithColors = fetchedNetwork.map(network => ({
        ...network,
        color: networkColors[network.name] || "#000",
      }));
      setNetworks(networksWithColors);
    };

    fetchNetwork();
  }, []);

  // Fetch ETH price in USD from CoinGecko
  const fetchEthPrice = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const price = response.data.ethereum.usd;
      setEthPrice(price);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEthPrice();
  }, []);

  useEffect(() => {
    const savedNetwork = localStorage.getItem("selectedNetwork");
    if (savedNetwork) {
      setSelectedNetwork(JSON.parse(savedNetwork));
    }

    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  // Fetch the balance based on the selected network
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const currentAccount = JSON.parse(localStorage.getItem("userAccounts"))[0];
        const network = selectedNetwork.name.toLowerCase();
        const address = currentAccount.publicAddress;

        const balanceBigNumber = await getBalance(network, address);
        const etherBalance = ethers.utils.formatEther(balanceBigNumber);

        setBalance(parseFloat(etherBalance));
        localStorage.setItem("balance", parseFloat(etherBalance));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalance();
  }, [selectedNetwork]);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle network selection and save the selected network to localStorage
  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    localStorage.setItem("selectedNetwork", JSON.stringify(network));
    setIsDropdownOpen(false);
  };

  const dollarEquivalent = (balance * ethPrice).toFixed(2);

  return (
    <div className="flex flex-col items-center text-center mt-2 space-y-5">
      {/* Balance Row */}
      <div className="space-y-3 mb-6">
        <h1 className="text-slate-700 dark:text-white text-xl">Available Balance</h1>
        <p className="text-slate-700 dark:text-white">{balance.toFixed(4)} {selectedNetwork.name === "Ethereum" ? "ETH" : "SepoliaETH"}</p>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center space-x-4 rounded-full bg-primary-850 text-slate-700 dark:text-white w-40 py-1"
          >
            <FaRegCircleDot className="mr-2" style={{ color: selectedNetwork.color }} />
            <span>{selectedNetwork.name}</span>
            <IoIosArrowDown className="ml-2" />
          </button>

          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-10">
              {networks.map((network, index) => (
                <li
                  key={index}
                  onClick={() => selectNetwork(network)}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <FaRegCircleDot className="mr-2" style={{ color: network.color }} />
                  <span>{network.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Transact Row */}
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <button
            className="rounded-full border-2 border-primary-850 p-3 flex items-center justify-center"
            onClick={() => navigate("/send-token")}
          >
            <BsSendFill size={20} className="text-primary-850" />
          </button>
          <span className="mt-1 text-slate-700 dark:text-white">Send</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="rounded-full border-2 border-primary-850 p-3 flex items-center justify-center"
            onClick={() => navigate("/receive-token")}
          >
            <MdCallReceived size={20} className="text-primary-850" />
          </button>
          <span className="mt-1 text-slate-700 dark:text-white">Receive</span>
        </div>
      </div>

      {/* Tokens Row */}
      <div>
        <div className="flex px-4">
          <h2 className="text-slate-700 dark:text-white">Tokens</h2>
        </div>
        <div className="bg-gray-200 dark:bg-slate-700 w-[350px] h-screen rounded-2xl">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center py-2 gap-2">
              <span className="border-2 border-primary-850 rounded-full p-1">
                <FaEthereum />
              </span>
              <div className="flex flex-col items-start">
                <h1 className="text-slate-700 dark:text-white font-semibold">{selectedNetwork.symbol}</h1>
                <p className="text-slate-700 dark:text-white">{selectedNetwork.name}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-start">
                <h1 className="text-slate-700 dark:text-white font-semibold">{balance.toFixed(4)} ETH</h1>
                <p className="text-slate-700 dark:text-white">${dollarEquivalent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
