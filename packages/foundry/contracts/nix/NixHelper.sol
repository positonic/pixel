pragma solidity 0.8.20;
// ----------------------------------------------------------------------------
// Nix v0.9.1 alpha
//
// https://github.com/bokkypoobah/Nix
//
// Deployed to
// - NixHelper
//
// SPDX-License-Identifier: MIT
//
// Enjoy. And hello, from the past.
//
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2022
// ----------------------------------------------------------------------------

import "./Nix.sol";

/// @author BokkyPooBah, Bok Consulting Pty Ltd
/// @title Decentralised ERC-721 exchange bulk data retrieval helper
contract NixHelper {

    enum OrderStatus {
        Executable,
        Disabled,
        Expired,
        Maxxed,
        MakerNoWeth,
        MakerNoWethAllowance,
        MakerNoToken,
        MakerNotApprovedNix,
        UnknownError
    }

    Nix public nix;
    IERC20Partial immutable public weth;

    constructor(Nix _nix) {
        nix = _nix;
        weth = _nix.weth();
    }

    function getTokens(
        uint[] memory tokensIndices
    ) public view returns (
        address[] memory tokens,
        uint[] memory ordersLengthList,
        uint[] memory executedList,
        uint[] memory volumeTokenList,
        uint[] memory volumeWethList
    ) {
        uint length = tokensIndices.length;
        tokens = new address[](length);
        ordersLengthList = new uint[](length);
        executedList = new uint[](length);
        volumeTokenList = new uint[](length);
        volumeWethList = new uint[](length);
        (uint tokensLength,) = nix.getLengths();
        for (uint i = 0; i < length; i++) {
            uint tokenIndex = tokensIndices[i];
            if (tokenIndex < tokensLength) {
                (address token, uint64 ordersLength, uint64 executed, uint64 volumeToken, uint volumeWeth) = nix.getToken(tokenIndex);
                tokens[i] = token;
                ordersLengthList[i] = ordersLength;
                executedList[i] = executed;
                volumeTokenList[i] = volumeToken;
                volumeWethList[i] = volumeWeth;
            }
        }
    }

    function orderStatus(address token, Nix.Order memory order) public view returns (OrderStatus) {
        if (order.expiry > 0 && order.expiry < block.timestamp) {
            return order.expiry == 1 ? OrderStatus.Disabled: OrderStatus.Expired;
        }
        if (order.tradeCount >= order.tradeMax) {
            return OrderStatus.Maxxed;
        }
        if (order.buyOrSell == Nix.BuyOrSell.Buy) {
            uint wethBalance = weth.balanceOf(order.maker);
            if (wethBalance < order.price) {
                return OrderStatus.MakerNoWeth;
            }
            uint wethAllowance = weth.allowance(order.maker, address(nix));
            if (wethAllowance < order.price) {
                return OrderStatus.MakerNoWethAllowance;
            }
        } else {
            try IERC721Partial(token).isApprovedForAll(order.maker, address(nix)) returns (bool b) {
                if (!b) {
                    return OrderStatus.MakerNotApprovedNix;
                }
            } catch {
                return OrderStatus.UnknownError;
            }
            uint[] memory orderTokenIds = nix.getTokenIds(order.tokenIdsKey);
            if (order.anyOrAll == Nix.AnyOrAll.Any) {
                if (order.tokenIdsKey == bytes32(0)) {
                    try IERC721Partial(token).balanceOf(order.maker) returns (uint b) {
                        if (b == 0) {
                            return OrderStatus.MakerNoToken;
                        }
                    } catch {
                        return OrderStatus.UnknownError;
                    }
                } else {
                    bool found = false;
                    for (uint j = 0; j < orderTokenIds.length && !found; j++) {
                        try IERC721Partial(token).ownerOf(orderTokenIds[j]) returns (address a) {
                            if (a == order.maker) {
                                found = true;
                            }
                        } catch {
                            return OrderStatus.UnknownError;
                        }
                    }
                    if (!found) {
                        return OrderStatus.MakerNoToken;
                    }
                }
            } else {
                for (uint j = 0; j < orderTokenIds.length; j++) {
                    try IERC721Partial(token).ownerOf(orderTokenIds[j]) returns (address a) {
                        if (a != order.maker) {
                            return OrderStatus.MakerNoToken;
                        }
                    } catch {
                        return OrderStatus.UnknownError;
                    }
                }
            }
        }
        return OrderStatus.Executable;
    }

    function getOrders(
        address token,
        uint[] memory orderIndices
    ) public view returns (
        address[] memory makers,
        address[] memory takers,
        uint[][] memory tokenIds,
        uint[] memory prices,
        uint[7][] memory data
    ) {
        uint length = orderIndices.length;
        makers = new address[](length);
        takers = new address[](length);
        tokenIds = new uint[][](length);
        prices = new uint[](length);
        data = new uint[7][](length);
        uint ordersLength = nix.ordersLength(token);
        for (uint i = 0; i < length; i++) {
            uint orderIndex = orderIndices[i];
            if (orderIndex < ordersLength) {
                Nix.Order memory order = nix.getOrder(token, orderIndex);
                makers[i] = order.maker;
                takers[i] = order.taker;
                tokenIds[i] = nix.getTokenIds(order.tokenIdsKey);
                prices[i] = order.price;
                data[i][0] = uint(order.buyOrSell);
                data[i][1] = uint(order.anyOrAll);
                data[i][2] = uint(order.expiry);
                data[i][3] = uint(order.tradeCount);
                data[i][4] = uint(order.tradeMax);
                data[i][5] = uint(order.royaltyFactor);
                data[i][6] = uint(orderStatus(token, order));
            }
        }
    }

    function getTrades(
        uint[] memory tradeIndexes
    ) public view returns (
        address[] memory takers,
        uint[] memory royaltyFactors,
        uint[] memory blockNumbers,
        Nix.ExecutedOrder[][] memory ordersList
    ) {
        uint length = tradeIndexes.length;
        takers = new address[](length);
        royaltyFactors = new uint[](length);
        blockNumbers = new uint[](length);
        ordersList = new Nix.ExecutedOrder[][](length);
        (, uint tradesLength) = nix.getLengths();
        for (uint i = 0; i < length; i++) {
            uint tradeIndex = tradeIndexes[i];
            if (tradeIndex < tradesLength) {
                (address taker, uint64 royaltyFactor, uint64 blockNumber, Nix.ExecutedOrder[] memory orders) = nix.getTrade(tradeIndex);
                takers[i] = taker;
                royaltyFactors[i] = royaltyFactor;
                blockNumbers[i] = blockNumber;
                ordersList[i] = orders;
            }
        }
    }
}
