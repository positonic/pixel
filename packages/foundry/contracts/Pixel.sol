pragma solidity 0.8.20;

contract Pixel  {
 
    mapping(address => string) public userNames;
    mapping(string => address) public nameOwner;

    mapping(address => address) public coldWallets;

    /// @notice Vouches for all the members
    bytes32[] public vouches;
    mapping (bytes32  => address) internal vouchSender;

    /// @notice Mapping from user => vouch hash.
    mapping (address => bytes32[]) public vouchesReceived;
    /// @notice Mapping from user => vouch hash.
    mapping (address => bytes32[]) public vouchesSent;


    function DOMAIN_HASH() public view returns (bytes32) {
        return keccak256(abi.encode(block.chainid, address(this)));
    }

    /// @notice Generates hash 
    function generateVouchHash(address sender, address recipient) public view returns (bytes32 vouchId) {
        vouchId = keccak256(abi.encode(DOMAIN_HASH(), sender, recipient));
    }


    function register( string memory userName ) external {
        // require(vouchesReceived[msg.sender].length > 0, "Need one vouch to register");
        require(keccak256(abi.encodePacked(userNames[msg.sender])) == keccak256(abi.encodePacked("")), "Cannot register twice");
        require(nameOwner[userName] == address(0), "Name already registered");
        nameOwner[userName] = msg.sender;
        userNames[msg.sender] = userName;
    }

    function unregister() external {
        delete nameOwner[userNames[msg.sender]];
        delete userNames[msg.sender];
    }

    function setColdWallet(address coldWallet) external {
        if (coldWallet == address(0)) {
            delete coldWallets[msg.sender];
            return;
        }
        coldWallets[msg.sender] = coldWallet;
    }


    // Vouching


    function vouch(address recipient) public payable {
        if (msg.value > 0) {
            // could keep track of new signups for referral program
            // require(msg.value >= minBalance, "Not enough ether for new viber");
            recipient.call{value: msg.value}("");
        }        
        bytes32 vouchId = generateVouchHash(msg.sender, recipient);
        vouchesSent[msg.sender].push(vouchId);
        vouchesReceived[recipient].push(vouchId);
        _vouch(msg.sender, vouchId);
    }

    function _vouch(address sender, bytes32 vouchId) internal {
        require(vouchSender[vouchId] == address(0), "Vouch already exists");
        vouches.push(vouchId);
        vouchSender[vouchId] = sender;
    }

    function vouchReceivedCount(address user) public view returns (uint256) {
        return vouchesReceived[user].length;
    }

    function vouchSentCount(address user) public view returns (uint256) {
        return vouchesSent[user].length;
    }


    // Trust
    function getTrustScore(address user, address vouched) public view returns (uint256) {
        uint256 memberLength = vouchesSent[user].length;
        if (memberLength == 0) return 0;
        uint256 score = 0;
        bytes32 vouchId;
        address vouchMember;

        for (uint256 i = 0; i < memberLength; i++) {
            vouchMember = vouchesSent[user][i];
            vouchId = generateVouchHash(vouchMember, vouched);
            if ( vouchSender[vouchId] == vouchMember ) {
                score++;
            }
        }
        return score;
    }


}
