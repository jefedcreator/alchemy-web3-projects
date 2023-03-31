const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require('../utils/niceList.json')
const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

app.post("/gift", (req, res) => {
  const {body} = req.body;
  const index = niceList.findIndex((n) => n === body);
  const proof = merkleTree.getProof(index);
  if (verifyProof(proof, body, root)) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
