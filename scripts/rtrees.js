const hre = require("hardhat");
const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("Rtrees");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy();

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    // let txn = await contract.initNFTs()//     await txn.wait();
//     console.log("10 NFTs have been reserved");

//     // Mint 3 NFTs by sending 0.03 ether
//     txn = await contract.mintNFTs(3, { value: utils.parseEther('0.03') });
//     await txn.wait()

//     // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

    let token_uri = await contract.tokenURI(1);
    console.log(token_uri);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });