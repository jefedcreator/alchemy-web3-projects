import React from 'react'
import "./App.css";
import { Link } from 'react-router-dom';

const Transactions = ({hash,miner,number,gasUsed,timestamp}) => {
    function convertDate() {
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
    <Link
     className='transaction'
     to={{
        pathname: `/tx/${hash}`
     }}
     >
        {/* <div>
            from: {`${transaction.from.slice(0,5)}...${transaction.from.slice(-15)}`}
        </div> */}
        <div>
            hash: {`${hash.slice(0,5)}...${hash.slice(-20)}`}
        </div>
        {/* <div>
            from: {transaction.from}
        </div> */}
        <div>
           miner: {`${miner.slice(0,5)}...${miner.slice(-10)}`}
        </div>
        <div>
           block number: {number}
        </div>
        {/* {  
        transaction.maxPriorityFeePerGas &&
        <div>
            maxPriorityFeePerGas: {transaction.maxPriorityFeePerGas.toString()}
        </div>
        } */}
        {/* <div>
            nonce: {transaction.nonce} 
        </div>
        <div>
            value: {transaction.value.toString()} wei 
        </div> */}
        <div>
            gasUsed: {gasUsed.toString()} 
        </div>
        <div>
            timeStamp: {convertDate()}  
        </div>
    </Link>
  )
}

export default Transactions