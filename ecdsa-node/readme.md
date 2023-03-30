# ECDSA Node

This is a simple Ethereum Wallet API built with Express.js, which allows you to create and manage Ethereum addresses, check balances, and sign and verify transactions between addresses, By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Features
- Generate derived private keys from an initial seed
- Get the Ethereum address from a private key
- Get the Ethereum address from a public key
- Sign a message using a private key
- Recover a public key from a signed message and its signature
- Check the balance of an Ethereum address
- Send a signed transaction between Ethereum addresses
- Validate signed transactions

### Dependencies
`express`: Lightweight web application framework for Node.js
`crypto`: Built-in Node.js module for working with cryptographic functions
`ethereum-cryptography`: A collection of Ethereum-related cryptography functions
`cors`: Middleware to enable CORS with various options

### Installation
1. Clone this repository:
```bash 
git clone https://github.com/jefedcreator/alchemy-web3-projects.git
```

2. Navigate to the project folder:
```bash
cd esdsa-node
```

3. Install the required client dependencies:
```bash
cd client && npm install
```


4. Install the required server dependencies:
```bash
cd server && npm install
```
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

## API Endpoints
### GET /balance/:address
Get the balance of a given Ethereum address.

Example request:
```bash
GET http://localhost:3042/balance/0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

Example response:
```json
{
  "privateKey": "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e",
  "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "balance": 75
}

```

### GET /addresses
Get a list of all generated Ethereum addresses.

Example request:
```bash
GET http://localhost:3042/addresses
```

Example response:
```json
[
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "0x836b35a026743e6d2b9d34b9a50f62f07e3a082a",
  "0x71c7656ec7ab88b098defb751b7401b5f6d8976f"
]
```

### POST /send
Send a signed transaction between Ethereum addresses.

Example request:
```bash
POST http://localhost:3042/send
{
  "sender": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "recipient": "0x836b35a026743e6d2b9d34b9a50f62f07e3a082a",
  "amount": 10
}
```

Example response:
```json
{
  "balance": 65
}
```

## Contributing
Feel free to submit issues, feature requests, or pull requests for this project. Any feedback and collaboration are welcome!
