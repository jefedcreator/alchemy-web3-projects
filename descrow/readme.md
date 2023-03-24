# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

This smart contract is an implementation of an escrow service, allowing a third-party arbiter to hold funds in escrow until certain conditions are met. The contract includes a function to create a new escrow, which transfers funds from a depositor to the contract and records the relevant parties involved. It also includes a function for the arbiter to approve the release of the escrowed funds to the beneficiary. The contract keeps track of multiple escrows using a mapping data structure. The contract emits an event whenever a new escrow is created, which is persistent on the frontend.

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Escrow Contract
The Escrow contract is a smart contract built on the Ethereum blockchain that facilitates secure and trustless transactions between parties. It allows for the safe transfer of funds between a depositor and a beneficiary, with an arbiter acting as a trusted third party to ensure that the terms of the agreement are met.

### Usage
The contract has two main functions:

### Escrow
This function is used to create a new escrow agreement. It takes in the addresses of the arbiter and beneficiary, as well as an optional detail string. The depositor sends funds to the contract as part of the escrow agreement.

```code 
function escrow(address _arbiter, address _beneficiary, string memory detail) external payable; 
```

### Approve
This function is used by the arbiter to approve the release of funds to the beneficiary. Once the funds have been released, the escrow agreement is considered complete.

```code 
function approve(uint _escrow) external;
```

### Testing
The contract has been tested using the Ethereum testing framework Hardhat, along with the Chai assertion library. The tests can be run using the following command:

```bash 
npx hardhat test
```

License
The Escrow contract is licensed under the MIT License. Feel free to use it however you like!