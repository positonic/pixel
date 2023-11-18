import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const useGetUserName = (address: string): { userName: string } => {
  const { data: userName } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "userNames",
    watch: true,
    args: [address],
  });

  return {
    userName: userName ? userName : "",
  };
};

export const useGetColdWallet = (address: string): { coldWallet: string } => {
  const { data: coldWallet } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "coldWallets",
    watch: true,
    args: [address],
  });

  return {
    coldWallet: coldWallet ? coldWallet : "",
  };
};

export const useVouchReceivedCount = (address: string): { vouchesReceived: bigint } => {
  const { data: vouchesReceived } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "vouchReceivedCount",
    args: [address],
  });

  return {
    vouchesReceived: vouchesReceived ? vouchesReceived : BigInt(0),
  };
};
export const useVouchSentCount = (address: string): { vouchesSent: bigint } => {
  const { data: vouchesSent } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "vouchSentCount",
    args: [address],
  });

  return {
    vouchesSent: vouchesSent ? vouchesSent : BigInt(0),
  };
};

export const useDoesVouch = (sender: string, recipient: string): { doesVouch: boolean } => {
  const { data: doesVouch } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "doesVouch",
    args: [sender, recipient],
  });

  return {
    doesVouch: doesVouch ? doesVouch : false,
  };
};

export const useGetTrustScore = (sender: string, recipient: string): { totalTrust: bigint } => {
  const { data: totalTrust } = useScaffoldContractRead({
    contractName: "Pixel",
    functionName: "getTrustScore",
    args: [sender, recipient],
  });

  return {
    totalTrust: totalTrust ? totalTrust : BigInt(0),
  };
};
