import { useEffect, useState } from "react";

import "./App.css";
import Blocks from "./Blocks";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App({alchemy}) {
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockTransactions, setBlockTransactions] = useState([]);
  const [blocks,setBlocks] = useState([])

  useEffect(() => {
    async function fetchBlockNumber() {
      const block = await alchemy.core.getBlockNumber()
      setBlockNumber(block);
      setBlocks((prevBlockNumber) =>{
       return [...prevBlockNumber,block].filter((item,index,self) =>{
        return index === self.indexOf(item)
       })
      })
    }
    fetchBlockNumber();

    const interval = setInterval(fetchBlockNumber, 10000); // fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log("Block number changed:", blockNumber);
    const getBlocks = () => {      
      blocks.forEach(async(block) =>{
        const result = await alchemy.core.getBlockWithTransactions(block)
        setBlockTransactions(prev => [...prev,result].filter((transaction,index,self) =>{
          return index === self.findIndex((t) => t.number === transaction.number)
        }))
      })
    }

    getBlocks()
    return () => {getBlocks()}
  }, [blocks]);

  // console.log("latest block", blockNumber);
  // console.log("latest",blockNumber);
  function convertDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`
}

  return (
    <div className="App">
      <header>
        <h1>
          alex 
        </h1>
      </header>

      {
        blockTransactions.length === 0 ?
        <div className="loading">
          <p>loading...</p>
        </div>
        :
        <div className="app-wrapper">
          <div className="app-detail">
            <div>
              <h3>latest blocknumber</h3>
              <p>{blockTransactions[blockTransactions.length - 1].number}</p> 
            </div>
            <div>
              <h3>last mined at:</h3> 
              <p>{convertDate(blockTransactions[blockTransactions.length - 1].timestamp)}</p>
            </div>
            <div>
              <h3>Chain ID:</h3>
              <p>{blockTransactions[0].transactions[0].chainId}</p>
            </div>
            <div>
              <h3>last block count:</h3>
               <p>{blockTransactions[blockTransactions.length - 1].transactions.length} transactions</p>
            </div>
            <div>
              <h3>gas used:</h3>
              <p>{`${blockTransactions[blockTransactions.length - 1].gasUsed.toString()} wei`}</p>
            </div>
          </div>
          <div className="transaction-details">
            <h2>Blocks</h2>
              <div className="transactions-container">
              {
                blockTransactions.map((transaction,index) =>{
                  return (
                      <Blocks {...transaction} key={index}/>
                  )
                })
              }
              </div>
          </div>

        </div>

      }
    </div>
  );
}

export default App;
