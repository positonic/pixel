//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";

import "../contracts/nix/MockRoyaltyEngineV1.sol";
import "../contracts/utils/WETH9.sol";
import "../contracts/nix/Nix.sol";


import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);

        // Deploy contracts
        WETH9 weth = new WETH9();
        console.logString(
            string.concat(
                "WETH9 deployed at: ",
                vm.toString(address(weth))
            )
        );
        MockRoyaltyEngineV1 royaltyEngine = new MockRoyaltyEngineV1( vm.addr(deployerPrivateKey),  vm.addr(deployerPrivateKey));
        console.logString(
            string.concat(
                "RoyaltyEngine deployed at: ",
                vm.toString(address(royaltyEngine))
            )
        );
        Nix nix = new Nix(address(weth), address(royaltyEngine));
        console.logString(
            string.concat(
                "Nix deployed at: ",
                vm.toString(address(nix))
            )
        );



        // Old contracts
        YourContract yourContract = new YourContract(
            vm.addr(deployerPrivateKey)
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(yourContract))
            )
        );



        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
