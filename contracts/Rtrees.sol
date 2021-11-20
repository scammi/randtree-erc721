pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rtrees is ERC721Enumerable ,Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFT Collectible", "NFTC") {
        initNFTs();
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmQxDjEhnYP6QAtLRyLV9N7dn1kDigz7iWnx5psmyXqy35/";
    }

    function initNFTs() public onlyOwner {
        // todo: create self mint variable set on custructor.
        for (uint i = 0; i < 1; i++) {
            safeMint(msg.sender);
        }
    }

    function safeMint(address to) public {
         uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }
}
