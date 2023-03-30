import { useEffect, useState } from "react";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance,addresses,myAddress,setMyAddress }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      // console.log("balance",balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  const handleChange = (e) =>{
    setMyAddress(e.target.value)
  }
  
  console.log("myAddress",myAddress);



  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <select value={myAddress} onChange={handleChange}>
        <option value="">Select an option</option>
        {addresses.map((myAddress, index) => (
          <option key={index} value={myAddress}>
            {myAddress}
          </option>
        ))}
      </select>
      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
