// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {

	struct escrowHoldings{
		address arbiter;
		address beneficiary;
		address depositor;
		uint amount;
		bool isApproved;
	}

	uint public escrowCounter;

	mapping (uint => escrowHoldings) public escrowStorage;

	event Escrowed(address arbiter, address beneficiary, address depositor, uint value, string detail);

	function escrow (address _arbiter, address _beneficiary, string memory detail) external payable {
		escrowHoldings storage newEscrow = escrowStorage[escrowCounter];
		// require(!newEscrow.isApproved, "You have unresolved escrow");
		newEscrow.arbiter = _arbiter;
		newEscrow.beneficiary = _beneficiary;
		newEscrow.depositor = msg.sender;
		newEscrow.amount = msg.value;
		escrowCounter++;
		emit Escrowed(_arbiter,_beneficiary,msg.sender,msg.value,detail);
	}


	function approve(uint _escrow) external {
		escrowHoldings storage newEscrow = escrowStorage[_escrow];
		require(msg.sender == newEscrow.arbiter);
		uint balance = newEscrow.amount;
		address beneficiary = newEscrow.beneficiary;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		newEscrow.isApproved = true;
	}
}
