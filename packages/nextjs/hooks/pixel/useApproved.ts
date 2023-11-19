import { useScaffoldContractRead } from "../scaffold-eth";

export const nixAddress = "0x32d2b24936b0007E28dC0A2BA9CdCe4EEdCdfbb3";

export const useIsCollectionApproved = (user: string): boolean => {
  const { data } = useScaffoldContractRead({
    contractName: "BoredApes",
    functionName: "isApprovedForAll",
    args: [user, nixAddress],
  });

  return !!data;
};
