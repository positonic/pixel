import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const useGetPublicKey = (address: string): { publicKey: string } => {
  const { data: publicKey } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "userNames",
    watch: true,
    args: [address],
  });

  return {
    publicKey: publicKey ? publicKey : "",
  };
};
