import { ethers } from 'ethers';
import { useEffect, useMemo, useState,useCallback } from 'react';
// import addEscrow from './deploy';
import Escrow from './Escrow';
import Escrowabi from './artifacts/contracts/Escrow.sol/Escrow';


const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer,index) {
  const approveTxn = await escrowContract.connect(signer).approve(index);
  console.log("index is:", index);
  await approveTxn.wait();
}

export async function escrowStorage (escrowContract, signer,index) {
  const approveTxn = await escrowContract.connect(signer).escrowStorage(index);
  return approveTxn
  // await approveTxn.wait();
}

// export async function approve(escrowContract, signer) {
//   const approveTxn = await escrowContract.connect(signer).approve();
//   await approveTxn.wait();
// }

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false)

  // const [signer, setSigner] = useState();
  const contractAddress = '0xC07B38d5eEF374FB93CD382627f61C518Ca342af'

  const escrowContract = useMemo(()=>{
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress,Escrowabi.abi,signer || provider) 
  },[])
 
  const eagerConnect = async () => {
    try {
      const networkId = await window.ethereum.request({method: "eth_chainId"})
      if(Number(networkId) !== 5) return
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if(!accounts.length) return
      // const accountDetails = await getAccountDetails(accounts[0])
      //   setUserInfo({
      //     matic_balance: accountDetails.userMaticBal,
      //     token_balance: accountDetails.userBRTBalance,
      //     address: accounts[0]
      //   })
      //   setConnected(true)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    try {
      async function checkChainId() {
        const networkId = await window.ethereum.request({method: "eth_chainId"})
        return networkId
      }
      // async function getAccounts() {
      //   const accounts = await provider.send('eth_requestAccounts', []);
      //   return accounts
      //   // console.log("signer",signer);
      //   // console.log("signer set!");
      // }
      checkChainId().then(chainId => {
        if (Number(chainId) !== 5) {
          console.log("chainId", chainId);
          return alert("Switch network to Ethereum goerli")
        }

          // setAccount(accounts[0]);
          // setSigner(provider.getSigner());
        init();
        
      })
      window.ethereum.on("connect", eagerConnect)
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
      return () => {
        window.ethereum.removeListener("connect", eagerConnect);
        window.ethereum.removeListener("chainChanged", (_chainId) => window.location.reload());
      };
      
    } catch (error) {
      console.log("error",error);
    }
  }, []);

  // console.log("signer",signer);
  // console.log("initialized");
  // console.log("account",signer);
  const init = async () => {
      const escrowHistory = await escrowContract.queryFilter(escrowContract.filters.Escrowed());
      const signer = provider.getSigner()
      const history = [];
  
      escrowHistory.forEach(data => {
        // console.log("data",data);
        history.push({
          beneficiary: data.args[1],
          arbiter: data.args[0],
          value: data.args[3].toString(),
          message: data.args[4],
          handleApprove: async (e,index) => {
            // escrowContract.on('Approved', () => {
            //   document.getElementById(escrowContract.address).className =
            //     'complete';
            //   document.getElementById(escrowContract.address).innerText =
            //     "✓ It's been approved!";
            // });
            // console.log("signer is:",signer);
            console.log("button is:", e.target.className,"index is:", index,"signer is:", signer);
            await approve(escrowContract, signer, index).then(() =>{
              escrowStorage(escrowContract,signer,index).then(data => {
                e.target.className = 'complete';
                e.target.innerText = "✓ It's been approved!";
              })
            })
          },
        })
      });
      setEscrows(history);
  
      escrowContract.on("Escrowed", (arbiter, beneficiary, depositor, value, message) => {
        const newEscrow = {
          arbiter,
          beneficiary,
          depositor,
          value:value.toString(),
          message,
          // handleApprove: async (e) => {
          //   // escrowContract.on('Approved', () => {
          //   //   document.getElementById(escrowContract.address).className =
          //   //     'complete';
          //   //   document.getElementById(escrowContract.address).innerText =
          //   //     "✓ It's been approved!";
          //   // });
          //   console.log("button is:", e);
          //   await approve(escrowContract, signer);
          // },
        };
  
        setEscrows(prev => [newEscrow, ...prev]);
      });
    }

  const newEscrow = async() => {
      const beneficiary = document.getElementById('beneficiary').value.trim();
      const arbiter = document.getElementById('arbiter').value.trim();
      const message = document.getElementById('message').value.trim();
      const value = ethers.BigNumber.from(document.getElementById('wei').value);
      setLoading(true)
      const tx = await escrowContract.escrow(arbiter, beneficiary, message, { value })
      await tx.wait().then(() => setLoading(false))
      // console.log("escrow signer", signer);
      // const escrow = {
      //   address: contractAddress,
      //   arbiter,
      //   beneficiary,
      //   value: value.toString(),
      //   handleApprove: async () => {
      //     escrowContract.on('Approved', () => {
      //       document.getElementById(escrowContract.address).className =
      //         'complete';
      //       document.getElementById(escrowContract.address).innerText =
      //         "✓ It's been approved!";
      //     });
  
      //     await approve(escrowContract, signer);
      //   },
      // };
  
      // setEscrows([...escrows, escrow]);
    }

  return (
    <div className='parent'>
      <div className="header">
        <span>
          <h1>
            descrow
          </h1>
        </span>
      </div>
      <div className="contract">
        <div className='contract-wrapper'>
          <h2> Add Escrow </h2>
          <label>
            Arbiter Address
            <input type="text" id="arbiter" />
          </label>

          <label>
            Beneficiary Address
            <input type="text" id="beneficiary" />
          </label>

          <label>
              Escrow message
            <input type="text" id="message" />
          </label>

          <label>
            Deposit Amount (in Wei)
            <input type="text" id="wei" />
          </label>

          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();

              newEscrow();
            }}
          >
            {loading ? "Adding...":"Add"}
          </div>
          
        </div>
      </div>

      <div className="existing-contracts">
        <h2> Existing Escrows </h2>

        <div id="container">
          {escrows.map((escrow,index) => {
            return <Escrow key={index} {...escrow} index={index} escrowContract={escrowContract} provider={provider}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
