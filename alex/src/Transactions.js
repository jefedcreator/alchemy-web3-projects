import React, { useEffect, useState } from 'react'
import "./App.css";
import { useParams,Link } from 'react-router-dom';

const Transactions = ({alchemy}) => {
    const {hash} = useParams()
    const [ transactions,setTransactions] = useState(null)
    
    useEffect(() =>{
        const getTransactions = async() => {
            const results = await alchemy.core.getBlockWithTransactions(hash)
            setTransactions(results)
        }
        getTransactions()
        return () => {getTransactions()}
    },[])

    // console.log("transactions",transactions);

  return (
    <div className='App'>
        <header>
            <Link 
             to={{
                pathname:'/'
             }}
             className='link'
            >
            <h1>alex</h1>
            </Link>
        </header>
        {
            !transactions ?
            <div className="loading">
                <p>loading...</p>
            </div>
                :
            <div className="app-wrapper">
                <div className="app-detail">
                    <div>
                        <h3>block hash</h3>
                        <p>{`${transactions.hash.slice(0,5)}...${transactions.hash.slice(-15)}`}</p> 
                    </div>
                    <div>
                        <h3>block miner:</h3> 
                        <p>{`${transactions.miner.slice(0,5)}...${transactions.miner.slice(-15)}`}</p>
                    </div>
                    <div>
                        <h3>block number:</h3>
                        <p>{transactions.number}</p>
                    </div>
                    <div>
                        <h3>transaction count:</h3>
                        <p>{transactions.transactions.length} transactions</p>
                    </div>
                    <div>
                        <h3>gas used:</h3>
                        <p>{`${transactions.gasUsed.toString()} wei`}</p>
                    </div>
                </div>
                <div className='transaction-details'>
                    <h2>Transactions</h2>
                    <div className='transactions-container'>
                    {
                        transactions.transactions.map((transaction,index) =>{
                            return (
                                <div className='transaction' key={index}>
                                {/* <p>
                                    hash:{hash}
                                </p> */}
                                <div>
                                    from: {`${transaction.from.slice(0,5)}...${transaction.from.slice(-10)}`}
                                </div> 
                                <div>
                                gasPrice: {transaction.gasPrice.toString()}
                                </div>
                                {  
                                transaction.maxPriorityFeePerGas &&
                                <div>
                                    maxPriorityFeePerGas: {transaction.maxPriorityFeePerGas.toString()}
                                </div>
                                }
                                <div>
                                    nonce: {transaction.nonce} 
                                </div>
                                <div>
                                    value: {transaction.value.toString()} wei 
                                </div>  
                            </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Transactions