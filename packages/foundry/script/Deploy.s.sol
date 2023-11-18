//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";

import "../contracts/nix/MockRoyaltyEngineV1.sol";
import "../contracts/utils/WETH9.sol";
import "../contracts/nix/Nix.sol";
import "../contracts/tokens/BoredApes.sol";
import "../contracts/tokens/Nouns.sol";

import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    address public buyer;
    address public seller;
    address public royalty1;
    address public royalty2;

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);

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

        buyer = vm.addr(0x94dbf48f7a57172472e1e560a75a39065c2432314952fa5228add8d312caac00);
        vm.deal(buyer, 1*1e18);
        console.logString(string.concat(  "buyer: ", vm.toString(address(buyer))) );

        seller = vm.addr(0x94dbf48f7a57172472e1e560a75a39065c2432314952fa5228add8d312caac01);
        vm.deal(seller, 1*1e18);
        console.logString(string.concat(  "seller: ", vm.toString(address(seller))) );

        royalty1 = vm.addr(0x94dbf48f7a57172472e1e560a75a39065c2432314952fa5228add8d312caac02);
        vm.deal(royalty1, 1*1e18);
        console.logString(string.concat(  "royalty1: ", vm.toString(address(royalty1))) );

        royalty2 = vm.addr(0x94dbf48f7a57172472e1e560a75a39065c2432314952fa5228add8d312caac03);
        vm.deal(royalty2, 1*1e18);
        console.logString(string.concat(  "royalty2: ", vm.toString(address(royalty2))) );
        // Deploy contracts
        WETH9 weth = new WETH9();
        console.logString(
            string.concat(
                "WETH9 deployed at: ",
                vm.toString(address(weth))
            )
        );
        MockRoyaltyEngineV1 royaltyEngine = new MockRoyaltyEngineV1( royalty1,  royalty2);
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

        BoredApes apes = new BoredApes();
        console.logString(
            string.concat(
                "BoredApes deployed at: ",
                vm.toString(address(apes))
            )
        );
        // vibes.vouch(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);

        apes.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);
        apes.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);
        apes.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);

        Nouns nouns = new Nouns();
        console.logString(
            string.concat(
                "Nouns deployed at: ",
                vm.toString(address(nouns))
            )
        );

        nouns.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);
        nouns.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);
        nouns.mint(0xB03F0121b8F2BB26b1c882cAB693D645230F385D);

        uint256[] memory tokenIds = new uint256[](1); // Dynamic array with a single element
        tokenIds[0] = 0;

        nix.addOrder(address(apes), address(0), Nix.BuyOrSell.Sell, Nix.AnyOrAll.Any, tokenIds, 0.001*1e18,  0, 0, 0, address(0));


        // address[] memory tokens = new address[](1);
        // tokens[0]  = address(apes);

        // nix.executeOrders(
        //     tokens,
        //     new uint[](0),
        //     new uint[][](0),
        //     0.001*1e18,
        //     0,
        //     address(0)
        // );
  

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
