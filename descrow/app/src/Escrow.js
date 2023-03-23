import { useEffect,useState } from "react";
import { escrowStorage } from "./App";

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  message,
  index,
  escrowContract,
  provider,
}) {

  const [isApproved, setIsApproved] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const signer = provider.getSigner()
    escrowStorage(escrowContract,signer,index).then(data =>{
      setIsApproved(data.isApproved);
    })
  },[])

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} wei</div>
        </li>
        <li>
          <div> Message </div>
          <div> {message} </div>
        </li>
        <div
          className={isApproved ? "complete" : 'button'}
          id={index}
          onClick={async(e) => {
            e.preventDefault();
            setLoading(true)
            await handleApprove(e,index);
            setLoading(false)
          }}
          disabled={isApproved}
        >
          {loading ? "Approving..." : (isApproved ? "✓ It's been approved!" : "Approve")}
        </div>
      </ul>
    </div>
  );
}
