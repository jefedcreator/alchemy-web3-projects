import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState,useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addresses , setAddresses] = useState([])
  const [myAddress,setMyAddress] = useState('')


  useEffect(() =>{
    const getAddresses = async() =>{
      const {data} = await server.get("addresses")
      setAddresses(data)
    }
    getAddresses()
  },[myAddress])

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        addresses={addresses}
        myAddress={myAddress}
        setMyAddress={setMyAddress}
      />
      <Transfer setBalance={setBalance} address={myAddress} />
    </div>
  );
}

export default App;
