import { useScaffoldContractRead } from "../scaffold-eth";

export type OrderData = {
  maker: string;
  taker: string;
  buyOrSell: number;
  anyOrAll: number;
  tokenIdsKey: string;
  price: bigint;
  expiry: bigint;
  tradeCount: bigint;
  tradeMax: bigint;
  royaltyFactor: bigint;
  executed: boolean;
  chatId: string;
};

export const useGetOrder = (collection: string, orderIndex: bigint): OrderData => {
  const { data } = useScaffoldContractRead({
    contractName: "Nix",
    functionName: "getOrder",
    args: [collection, orderIndex],
  });

  return data as OrderData;
};
