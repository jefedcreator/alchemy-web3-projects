const { ethers } = require("hardhat");
// const { ethers } = require("ethers")
const { expect } = require("chai");

describe("Escrow", function () {
  let escrow, owner, beneficiary, arbiter, depositor;

  beforeEach(async () => {
    // Get signers
    const [ownerSigner, beneficiarySigner, arbiterSigner, depositorSigner] = await hardhat.getSigners();
    owner = ownerSigner.address;
    beneficiary = beneficiarySigner.address;
    arbiter = arbiterSigner.address;
    depositor = depositorSigner.address;

    // Deploy the Escrow contract
    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy();

    await escrow.deployed();
  });

  it("Should create a new escrow", async function () {
    // Create a new escrow
    await escrow.escrow(arbiter, beneficiary, "Test Escrow", {
      value: ethers.utils.parseEther("1.0")
    });

    console.log("esrow",escrow)

    // Check the escrow details
    const escrowCount = await escrow.escrowCounter();
    const escrowDetails = await escrow.escrowStorage(escrowCount - 1);
    expect(escrowDetails.arbiter).to.equal(arbiter);
    expect(escrowDetails.beneficiary).to.equal(beneficiary);
    expect(escrowDetails.depositor).to.equal(owner);
    expect(escrowDetails.amount.toString()).to.equal(ethers.utils.parseEther("1.0").toString());
    expect(escrowDetails.isApproved).to.be.false;
  });

  // it("Should approve an escrow", async function () {
  //   // Create a new escrow
  //   await escrow.escrow(arbiter, beneficiary, "Test Escrow", {
  //     value: ethers.utils.parseEther("1.0")
  //   });

  //   // Approve the escrow
  //   await escrow.approve(0, { from: arbiter });

  //   // Check the escrow is approved
  //   const escrowDetails = await escrow.escrowStorage(0);
  //   expect(escrowDetails.isApproved).to.be.true;

  //   // Check that the beneficiary received the funds
  //   const beneficiaryBalance = await ethers.provider.getBalance(beneficiary);
  //   expect(beneficiaryBalance.toString()).to.equal(ethers.utils.parseEther("1.0").toString());
  // });
});
