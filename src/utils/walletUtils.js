import {ethers} from 'ethers';

// Function goes to the Create-Page
// Generates a new 12-word mnemonic phrase from 16 random bytes of entropy
export function generateMnemonic() {
    let randomEntropyBytes = ethers.utils.randomBytes(16);
    
    return ethers.utils.entropyToMnemonic(randomEntropyBytes);
}
// Function goes to the Create-Page
// Creates a new HD (Hierarchical Deterministic) wallet from the generated mnemonic
export function createHdWallet() {
    const mnemonic = generateMnemonic();
    const HdWallet = ethers.utils.HDNode.fromMnemonic(mnemonic);

    return HdWallet;
}

// Function goes to the Create-Page
// Creates child wallets derived from the HD wallet and stores them in local storage
export function createHdWalletChild() {
    let childWallets = localStorage.getItem("childWallets");

    if (childWallets) {
        childWallets = JSON.parse(childWallets);
        let totalChild = childWallets.length;
        let newpath = "m/0/" + (totalChild + 1);

        childWallets.push(HdWallet.derivePath(newpath));
        localStorage.setItem("childWallets", JSON.stringify(childWallets));

    } else {
        childWallets = [];
        childWallets.push(HdWallet.derivePath(HdWallet.path + "/0/1"));
        localStorage.setItem("childWallets", JSON.stringify(childWallets));
    }

    return true;
}

// Home Page 
// Retrieves the balance of a specific address on the specified network (Ethereum or Sepolia)
export async function getBalance(network, address) {
    // Choose the network based on the user's selection
    const provider = ethers.getDefaultProvider(network === 'ethereum' ? 'homestead' : 'sepolia');
    
    try {
      // Fetch the balance in Wei (the smallest unit of Ether)
      const balance = await provider.getBalance(address);
      
      console.log(`Balance in Hex: ${balance._hex}, Network: ${network}, Address: ${address}`);
      
      return balance; // Returns balance in BigNumber (Wei)
    } catch (error) {
      console.error(`Error fetching balance: ${error}`);
      throw error;
    }
  }

// Converts a hex value to decimal
export function hexToDecimal(hex) {
    return parseInt(hex, 16);
}

// Send Page
// Signs a transaction object using a private key
export async function signTX(data) {
    const privateKey = "0x7016a068b9602cbab81958783909ab5ed86bb02aa50cf7c106ab70ac8b6afea4";
    const signer = new ethers.Wallet(privateKey);
    const txHash = await signer.signTransaction(data);

    return txHash;
}

// Signs a transaction and adds required transaction fields like nonce, gas limit, gas price
export async function signTX2(data) {
    const privateKey = "0x7016a068b9602cbab81958783909ab5ed86bb02aa50cf7c106ab70ac8b6afea4";
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/2fa89a3017a64226a09f8d4ad65aaf83"); // Use your Infura project ID
    const wallet = new ethers.Wallet(privateKey, provider);

    // Ensure data contains required fields
    const txData = {
        ...data,
        nonce: await provider.getTransactionCount(wallet.address), 
        gasLimit: ethers.utils.hexlify(21000), // Gas limit for simple transfer
        gasPrice: await provider.getGasPrice(), // Get current gas price from the network
        chainId: 11155111 // Sepolia testnet
    };

    const txHash = await wallet.signTransaction(txData);

    return txHash;
}
// Send Page
// Sends a transaction to a specific address on the Sepolia testnet
export async function sendTransaction(amount, receiver) {
    const privateKey = localStorage.getItem("privateKey");
    console.log(privateKey)
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/2fa89a3017a64226a09f8d4ad65aaf83"); // Replace with your Infura Project ID
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create transaction object
    const tx = {
        to: receiver, // Replace with recipient address
        value: ethers.utils.parseEther(amount), // Amount to send
        gasLimit: 21000, // Gas limit for a simple transfer
        gasPrice: await provider.getGasPrice(), // Gas price
        nonce: await provider.getTransactionCount(wallet.address), // Nonce
        chainId: 11155111 // Sepolia testnet chain ID
    };

    try {
        // Send the transaction
        const txResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent:", txResponse);
        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();
        console.log("Transaction mined:", receipt);

        return true;
    } catch (error) {
        console.error("Error sending transaction:", error);
    }

    return false;
}

// Sends a signed transaction to the Sepolia testnet
export async function sendTX(data) {
    const privateKey = "";

    const provider = ethers.getDefaultProvider("sepolia");

    // Attach the provider to the wallet
    const signer = new ethers.Wallet(privateKey, provider);

    // Send the transaction
    try {
        const txResponse = await signer.sendTransaction(data);
        console.log("Transaction sent:", txResponse);
        // Wait for transaction to be mined
        const receipt = await txResponse.wait();
        console.log("Transaction mined:", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }

    const sig = signer.sendTransaction(data);
    console.log(sig);
}

// Another version of sending a transaction with a default provider for the Sepolia testnet
export async function sendTX2(data) {
    const privateKey = "0x7016a068b9602cbab81958783909ab5ed86bb02aa50cf7c106ab70ac8b6afea4";
    
    // Use ethers.getDefaultProvider to get the default provider (you can specify a network like 'sepolia')
    const provider = ethers.getDefaultProvider("sepolia");
    
    // Attach the provider to the wallet
    const signer = new ethers.Wallet(privateKey, provider);
    
    // Send the transaction
    try {
        const txResponse = await signer.sendTransaction(data);
        console.log("Transaction sent:", txResponse);
        // Wait for transaction to be mined
        const receipt = await txResponse.wait();
        console.log("Transaction mined:", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}
    
/*
// Transaction data
const txData = {
    to: "0xc53c03Dff744805f22A607AC05b1e14058a4ee1D", // Recipient address
    value: ethers.utils.parseEther("0.01"), // Amount to send in Ether
    chainId: 11155111 // Sepolia testnet chain ID
};

// Call the sendTX function
sendTX(txData).catch((error) => console.error("Error:", error));
*/
