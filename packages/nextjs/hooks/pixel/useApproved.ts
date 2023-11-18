import { useScaffoldContractRead } from "../scaffold-eth";

const nixAddress = "0x276C216D241856199A83bf27b2286659e5b877D3";

export const useIsCollectionApproved = (user: string): boolean => {
  const { data } = useScaffoldContractRead({
    contractName: "BoredApes",
    functionName: "isApprovedForAll",
    args: [user, nixAddress],
  });

  return !!data;
};
