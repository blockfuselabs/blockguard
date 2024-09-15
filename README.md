# BlockGuard Wallet Extension

**BlockGuard Wallet** is an Ethereum-based browser extension wallet, built using Vite and React. It allows users to manage their Ethereum accounts, send and receive funds, store seed phrases securely, and interact with decentralized applications (dApps).

## Features
**1. User Authentication:**
Secure Sign-Up and Sign-In functionality.
Seed phrase generation, backup, and restoration process.

**2. Account Management**
View account balances, transaction history, and exchange data.
Switch between Ethereum mainnet and test networks.

**3. Transaction Handling:**
Send and receive Ethereum directly from your wallet.
Transaction overview with real-time updates.

**4. Security:**
Dark and light mode support.
Encrypted seed phrases and private keys for user security.

**5. Interaction with dApps:**
Connect your wallet to decentralized applications for seamless Ethereum transactions.

## Installation
To get started, clone the repository and install the required dependencies:

git clone https://github.com/your-username/blockguard-wallet.git
cd blockguard-wallet
npm install
Development Server
To run the app locally with Vite:


npm run dev
Navigate to http://localhost:3000 to view the app.

## Build for Production
To create a production build of the wallet:
npm run build

### Extension Setup
After building the project, locate the build folder.
Open Chrome and go to chrome://extensions/.
Enable Developer mode.
Click on Load unpacked and select the build folder.
Your wallet extension should now be loaded and ready for testing.

### Tech Stack
Frontend: React, Vite, Tailwind CSS, CSS
Ethereum Integration: ethers.js
Storage: LocalStorage (for managing user sessions and data)

## Contributing
Contributions are welcome! Please follow these steps:
Fork the project.
Create a new branch for your feature (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

**License**
This project is licensed under the MIT License - see the LICENSE file for details.

