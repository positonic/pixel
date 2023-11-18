pragma solidity 0.8.20;

import "../openzeppelin/token/ERC721/extensions/ERC721Enumerable.sol";
import "../openzeppelin/token/ERC721/extensions/IERC721Metadata.sol";

contract NFTHelper  {

    struct TokenData {
        uint256 tokenId;
        string tokenURI;
    }

    function getOwnedTokens(address collection, address user) public view returns(TokenData[] memory) {
        TokenData[] memory ownedTokens = new TokenData[](IERC721Enumerable(collection).balanceOf(user));
        for (uint256 i = 0; i < ownedTokens.length; i++) {
            uint256 tokenId = IERC721Enumerable(collection).tokenOfOwnerByIndex(user, i);
            ownedTokens[i].tokenId = tokenId;
            ownedTokens[i].tokenURI = IERC721Metadata(collection).tokenURI(tokenId);
        }
        return ownedTokens;
    }
}

