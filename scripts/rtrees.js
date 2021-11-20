const hre = require("hardhat");
const { utils } = require("ethers");

async function main() {
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

    // Get all token IDs of the owner
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