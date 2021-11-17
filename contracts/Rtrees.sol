pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rtrees is ERC721Enumerable ,Ownable {
    
    constructor() ERC721("NFT Collectible", "NFTC") {
    }
    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmQxDjEhnYP6QAtLRyLV9N7dn1kDigz7iWnx5psmyXqy35";
    }

    function initNFT() public onlyOwner {
        for (uint i = 0; i < 2; i++) {
            safeMint(msg.sender, i);
        }
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

}
