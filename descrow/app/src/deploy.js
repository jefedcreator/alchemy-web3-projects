import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
const contractAddress = '0x5eBe8758d839F753b7dc16D2c7E4F75EEa17E244'

export default async function addEscrow(signer, arbiter, beneficiary, value) {
  const factory = ethers.Contract(
    Escrow.abi,
    contractAddress,
    signer
  );
  return factory.addEscrow(arbiter, beneficiary, { value });
}
