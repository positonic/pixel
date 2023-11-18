// import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export interface TokenData {
  tokens: string[];
  ordersLengthList: number[];
  executedList: number[];
  volumeTokenList: number[];
  volumeWethList: number[];
}
export const useGetTokens = (tokenIndices: bigint[]): TokenData => {
  const { data: result } = useScaffoldContractRead({
    contractName: "NixHelper",
    functionName: "getTokens",
    args: [tokenIndices], // Pass an array of token indices
  });

  // Check if result exists and has data
  if (!result) {
    return {
      tokens: [],
      ordersLengthList: [],
      executedList: [],
      volumeTokenList: [],
      volumeWethList: [],
    };
  }

  const [tokens, ordersLengthList, executedList, volumeTokenList, volumeWethList] = result;

  // Ensure tokens is an array before mapping
  const mappedTokens = Array.isArray(tokens) ? tokens.map((token: any) => token.toString()) : [];

  // Ensure other lists are arrays before mapping
  const mappedOrdersLengthList = Array.isArray(ordersLengthList) ? ordersLengthList.map(Number) : [];
  const mappedExecutedList = Array.isArray(executedList) ? executedList.map(Number) : [];
  const mappedVolumeTokenList = Array.isArray(volumeTokenList) ? volumeTokenList.map(Number) : [];
  const mappedVolumeWethList = Array.isArray(volumeWethList) ? volumeWethList.map(Number) : [];

  return {
    tokens: mappedTokens,
    ordersLengthList: mappedOrdersLengthList,
    executedList: mappedExecutedList,
    volumeTokenList: mappedVolumeTokenList,
    volumeWethList: mappedVolumeWethList,
  };
};

export interface OrderData {
  makers: string[];
  takers: string[];
  tokenIds: number[][];
  prices: number[];
  data: number[][];
}

export const useGetOrders = (tokenAddress: string, orderIndices: bigint[]): OrderData => {
  const { data: result } = useScaffoldContractRead({
    contractName: "NixHelper", // Update with your contract name
    functionName: "getOrders",
    args: [tokenAddress, orderIndices],
  });

  if (!result) {
    return {
      makers: [],
      takers: [],
      tokenIds: [],
      prices: [],
      data: [],
    };
  }

  const [makers, takers, tokenIds, prices, data] = result;

  const formattedMakers = Array.isArray(makers) ? makers.map((maker: any) => maker.toString()) : [];
  const formattedTakers = Array.isArray(takers) ? takers.map((taker: any) => taker.toString()) : [];
  const formattedTokenIds = Array.isArray(tokenIds) ? tokenIds.map((ids: any[]) => ids.map(Number)) : [];
  const formattedPrices = Array.isArray(prices) ? prices.map(Number) : [];
  const formattedData = Array.isArray(data) ? data.map((arr: any[]) => arr.map(Number)) : [];

  return {
    makers: formattedMakers,
    takers: formattedTakers,
    tokenIds: formattedTokenIds,
    prices: formattedPrices,
    data: formattedData,
  };
};
