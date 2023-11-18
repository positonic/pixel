
pragma solidity 0.8.20;

import "../Interfaces/Interface.sol";


/// @author Alex W.(github.com/nonstopcoderaxw)
/// @title Array utility functions optimized for Nix
library ArrayUtils {
    /// @notice divide-and-conquer check if an targeted item exists in a sorted array
    /// @param self the given sorted array
    /// @param target the targeted item to the array
    /// @return true - if exists, false - not found
    function includes(uint256[] memory self, uint256 target) internal pure returns (bool) {
        if (self.length > 0) {
            uint256 left;
            uint256 right = self.length - 1;
            uint256 mid;
            while (left <= right) {
                mid = (left + right) / 2;
                if (self[mid] < target) {
                    left = mid + 1;
                } else if (self[mid] > target) {
                    if (mid < 1) {
                        break;
                    }
                    right = mid - 1;
                } else {
                    return true;
                }
            }
        }
        return false;
    }
}


contract Owned {
    bytes4 private constant ERC721_INTERFACE = 0x80ac58cd;

    address public owner;

    event OwnershipTransferred(address indexed from, address indexed to);
    event Withdrawn(address indexed token, uint tokens, uint tokenId);

    error NotOwner();

    modifier onlyOwner {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function withdraw(address token, uint tokens, uint tokenId) public onlyOwner {
        if (token == address(0)) {
            if (tokens == 0) {
                tokens = address(this).balance;
            }
            payable(owner).transfer(tokens);
        } else {
            bool isERC721 = false;
            try IERC721Partial(token).supportsInterface(ERC721_INTERFACE) returns (bool b) {
                isERC721 = b;
            } catch {
            }
            if (isERC721) {
                IERC721Partial(token).safeTransferFrom(address(this), owner, tokenId);
            } else {
                if (tokens == 0) {
                    tokens = IERC20Partial(token).balanceOf(address(this));
                }
                IERC20Partial(token).transfer(owner, tokens);
            }
        }
        emit Withdrawn(token, tokens, tokenId);
    }
}


contract ReentrancyGuard {
    uint private _executing;

    error ReentrancyAttempted();

    modifier reentrancyGuard() {
        if (_executing == 1) {
            revert ReentrancyAttempted();
        }
        _executing = 1;
        _;
        _executing = 2;
    }
}
