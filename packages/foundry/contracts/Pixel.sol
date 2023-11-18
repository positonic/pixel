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

}
