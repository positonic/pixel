import { useScaffoldContractRead } from "../scaffold-eth";

export const nixAddress = "0xE8F7d98bE6722d42F29b50500B0E318EF2be4fc8";

export const useIsCollectionApproved = (user: string): boolean => {
  const { data } = useScaffoldContractRead({
    contractName: "BoredApes",
    functionName: "isApprovedForAll",
    args: [user, nixAddress],
  });

  return !!data;
};
