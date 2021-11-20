const hre = require("hardhat");
const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

    // Get owner/deployer's wallet address
    const accounts = await hre.ethers.getSigners();

    const owner = accounts[0];
    const user = accounts[1];

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("Rtrees");

    // Deploy contract with the correct constructor arguments
    const selfMintLimit = 1;
    const maxMintLimit = 5;

    const contract = await contractFactory.deploy(selfMintLimit, maxMintLimit);

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

    let selfInitToken = await contract.tokenURI(0);
    console.log(selfInitToken);

    await contract.safeMint(user.address);
    let mintedToken = await contract.tokensOfOwner(user.address) ;
    console.log(mintedToken);
    let userCreatedToken = await contract.tokenURI(1);
    console.log(userCreatedToken);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });