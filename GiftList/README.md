# Gift List

## Table of Contents

1. [Introduction](#Introduction)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
3. [API](#api)
5. [Contributing](#contributing)
6. [License](#license)

# Introduction
This is a simple Node.js Express server that implements a Merkle Tree-based decentralized nice list. The server allows clients to check if they are on the nice list by verifying a Merkle Proof.
To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

### Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

### Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

### Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.

## Getting Started
This project uses Node.js and the Express framework to create an API server for checking a user's presence on a nice list.

### Prerequisites
- Node.js (>=14.0.0)
- npm (>=7.0.0)

### Usage
1. Start the server:
```bash
node index.js
```

2. The server will start listening on port 1225.

## API
The server exposes the following API endpoint:

### POST /gift
- Request: A JSON object containing the user's name in the body field.

```json
{
  "body": "John Doe"
}
```
- Response: A message indicating whether the user is on the nice list or not.
* If the user is on the nice list:
```json
You got a toy robot!
```
* If the user is not on the nice list:
```json
You are not on the list :(
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

