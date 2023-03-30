const express = require("express");
const crypto = require('crypto');
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const cors = require("cors");
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());


const INITIAL_PRIVATE_KEY_HEX = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const INITIAL_PRIVATE_KEY = Buffer.from(INITIAL_PRIVATE_KEY_HEX, 'hex');
const SALT = Buffer.from('random_salt', 'utf-8'); // Replace with your desired salt value
const INFO = Buffer.from('random_salt', 'utf-8'); // Replace with your desired info value

function derivePrivateKey(seed, salt, info, length) {
  const hkdf = crypto.createHmac('sha256', salt);
  hkdf.update(seed);
  hkdf.update(info);
  const derivedKey = hkdf.digest().slice(0, length);
  return derivedKey.toString('hex');
}

const PRIVATE_KEY_1 = derivePrivateKey(INITIAL_PRIVATE_KEY, SALT, INFO, 32);
const PRIVATE_KEY_2 = derivePrivateKey(Buffer.from(PRIVATE_KEY_1, 'hex'), SALT, INFO, 32);
const PRIVATE_KEY_3 = derivePrivateKey(Buffer.from(PRIVATE_KEY_2, 'hex'), SALT, INFO, 32);

function getAddressFromPrivateKey(PRIVATE_KEY) {
  const publicKey = secp.getPublicKey(PRIVATE_KEY);
  const remove = publicKey.slice(1);
  const hash = keccak256(remove);
  const address = hash.slice(-20)
  return `0x${toHex(address)}`;
}

function getAddressFromPublicKey(PUBLIC_KEY) {
  const remove = PUBLIC_KEY.slice(1);
  const hash = keccak256(remove);
  const address = hash.slice(-20)
  return `0x${toHex(address)}`;
}

async function signMessage(msg,PRIVATE_KEY) {
  const hash = hashMessage(msg);
  const result = await secp.sign(hash, PRIVATE_KEY, { recovered: true });
  // console.log("result", toHex(result[0]))
  return result;
}

function hashMessage(msg) {
  const bytes = utf8ToBytes(msg);
  const hash = keccak256(bytes);
  return hash
}

async function recoverKey(message, signature, recoveryBit) {
  const hash = hashMessage(message);
  const publicKey = secp.recoverPublicKey(hash, signature, recoveryBit);
  // console.log("publicKey",toHex(publicKey));
  return publicKey
}

const balances = [
  {
      "privateKey": PRIVATE_KEY_1,
      "address":getAddressFromPrivateKey(PRIVATE_KEY_1),
      "balance":75
  },
  {
      "privateKey": PRIVATE_KEY_2,
      "address":getAddressFromPrivateKey(PRIVATE_KEY_2),
      "balance":100
  },
  {
      "privateKey": PRIVATE_KEY_3,
      "address":getAddressFromPrivateKey(PRIVATE_KEY_3),
      "balance":25
  }
]


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances.find(balance => balance.address == address)
  // console.log("balance",balance);
  res.send( balance );
});

app.get('/addresses',(req,res) =>{
  const privateKeys = [PRIVATE_KEY_1,PRIVATE_KEY_2,PRIVATE_KEY_3]
  const addresses = privateKeys.map(privateKey => {
    return getAddressFromPrivateKey(privateKey)
  })
  res.send(addresses)
})

app.post("/send", async(req, res) => {
  const { sender, recipient, amount } = req.body;
  const senderBalance = balances.find(balance => balance.address == sender)
  const recipientBalance = balances.find(balance => balance.address == recipient)

  const [signature, recoveryBit] = await signMessage("send",senderBalance.privateKey)
  const recovered = await recoverKey("send", signature,recoveryBit)
  if (sender !== getAddressFromPublicKey(recovered)){
    return res.status(400).send({ message: "Wrong signature or signer" });
  }
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (senderBalance.balance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    senderBalance.balance -= amount;
    recipientBalance.balance += amount;
    res.send({ balance: senderBalance.balance });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  const balance = balances.find(balance => balance.address == address)

  if (!balance.balance) {
    balance.balance = 0;
  }
}
