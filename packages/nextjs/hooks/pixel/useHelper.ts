import { useScaffoldContractRead } from "../scaffold-eth";

type NFTData = {
  collection: string;
  tokenId: bigint;
  tokenURI: string;
  name: string;
  symbol: string;
};

export const useGetOwnedTokens = (
  user: string,
): {
  tokens: NFTData[];
} => {
  console.log("user:", user);
  const { data } = useScaffoldContractRead({
    contractName: "NFTHelper",
    functionName: "getOwnedTokens",
    args: [user],
  });

  const tokens: NFTData[] = (data as NFTData[]) || [];

  return {
    tokens,
  };
};
