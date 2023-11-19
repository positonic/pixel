// import { useRouter } from "next/router";
// import ShareProfile from "~~/components/profile/ShareProfile";
import { useEffect, useState } from "react";
import { useGetTrustScore, useVouchReceivedCount } from "~~/hooks/pixel";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function CollectionProfile({ address, tokenAddress }: { address: string; tokenAddress: string }) {
  const contractName = tokenAddress == "bayc" ? "BoredApes" : "Nouns";
  const { data: deployedContractData } = useDeployedContractInfo(contractName);

  const [vouched, setVouched] = useState(false);

  const {
    writeAsync: writeVouch,
    isMining,
    isSuccess,
  } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "vouch",
    value: BigInt(0),
    args: [deployedContractData?.address || ""],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const vouch = async () => {
    // if (!user) return;
    console.log("Sending message:", "GM");
    // const message = await user.chat.send(vouchAddress, { type: MessageType.TEXT, content: "GM" });
    // console.log("message:", message);
    writeVouch();
  };

  useEffect(() => {
    if (isSuccess && !isMining) {
      setVouched(true);
    }
  }, [isSuccess]);

  const { vouchesReceived } = useVouchReceivedCount(deployedContractData?.address || "");
  const { totalTrust } = useGetTrustScore(address || "", deployedContractData?.address || "");

  return (
    <section className="flex flex-col gap-2 mb-4 max-w-md mx-auto px-5">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-20 h-20">
            <img
              src={tokenAddress == "bayc" ? "/tokens/bayc.png" : "/tokens/noun.png"}
              alt="Image 1"
              className="w-20 h-20 object-cover mb-2"
            />
          </div>
          <div className="text-center">
            <p className="font-bold">
              {" "}
              {tokenAddress == "bayc" ? "Bored Ape Yacht Club" : tokenAddress == "nouns" ? "Nouns" : tokenAddress}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 ml-6">
          <div className=" mr-8">
            <p className="text-3xl font-bold text-center">{totalTrust.toString()}</p>
            <p className="text-sm ">Trusted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-center">{vouchesReceived.toString()}</p>
            <p className="text-sm">Followers</p>
          </div>
        </div>
      </div>
      <button
        disabled={isMining || vouched}
        className="btn btn-primary rounded-full capitalize font-normal custom-button"
        onClick={() => vouch()}
      >
        {vouched ? "VOUCHED" : "VOUCH"}
        {isMining && <span className="loading loading-spinner"></span>}
      </button>
    </section>
  );
}

export default CollectionProfile;
