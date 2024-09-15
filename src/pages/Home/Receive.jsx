import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { IoShareOutline } from "react-icons/io5";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Receive = () => {
  const currentAccount = JSON.parse(localStorage.getItem("userAccounts"))[0];
  const publicAddress = currentAccount.publicAddress;
  const [isCopied, setIsCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState("");

  useEffect(() => {
    // Generate the QR code URL
    QRCode.toDataURL(publicAddress, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrCodeURL(url);
    });
  }, [publicAddress]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(publicAddress)
      .then(() => {
        setIsCopied(true);
        toast.success("Address copied successfully")
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast.error("Unable to copy address")
      });
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-5)}`;
  };

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  return (
    <div className="flex flex-col items-center text-center mt-5 space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-primary-400 text-xl font-normal">Receive</h1>

        {/* Display QR Code */}
        <div className="space-y-5">
          {qrCodeURL && (
            <img src={qrCodeURL} alt="QR Code" className="mx-auto" />
          )}
          <p className="text-primary-400">Scan address to receive payment</p>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={truncateAddress(publicAddress)}
            readOnly
            className="border-2 border-gray-300 bg-transparent rounded-full text-primary-400 text-sm py-2 w-60 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className={`absolute right-12 border-2 text-sm px-2 rounded-full ${
              isCopied
                ? "text-primary-500 border-primary-500"
                : "text-primary-400 border-primary-400"
            }`}
            onClick={handleCopy}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
          <IoShareOutline
            className="absolute right-3 text-primary-400 cursor-pointer"
            onClick={toggleShareModal}
          />
        </div>

        {/* Share Modal */}
        {isShareModalOpen && (
          <div className="absolute top-[60%] right-0 bg-primary-400 border border-gray-300 shadow-lg rounded-lg p-4 w-full">
            <h4 className="text-gray-600 font-semibold mb-2">Share via:</h4>
            <div className="flex justify-center space-x-8">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  publicAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-lg" />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  publicAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="text-blue-500 text-lg" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receive;
