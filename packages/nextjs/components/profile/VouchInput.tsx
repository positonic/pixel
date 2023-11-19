import { useEffect, useState } from "react";
// import { MessageType } from "@pushprotocol/restapi/src/lib/constants";
import { useAccount } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
// import { usePush } from "~~/hooks/push/context/usePush";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccountBalance } from "~~/hooks/scaffold-eth";

export const VouchInput = ({ vouchAddress }: { vouchAddress: string }) => {
  const { address: senderAddress } = useAccount();
  const { balance: senderBalance } = useAccountBalance(senderAddress);

  const { balance } = useAccountBalance(vouchAddress);
  // const { user } = usePush();
  const vouchBalance: number =
    balance === 0 && senderBalance && senderBalance >= 1.0 ? 0.1 * 1e18 : ((senderBalance ?? 0) * 1e18) / 10;

  const [vouched, setVouched] = useState(false);

  const {
    writeAsync: writeVouch,
    isMining,
    isSuccess,
  } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "vouch",
    value: BigInt(Math.round(vouchBalance)),
    args: [vouchAddress],
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

  return (
    <section className="w-full flex flex-col items-center gap-4 max-w-md mx-auto my-auto">
      <BlockieAvatar address={vouchAddress} size={100} />

      <p> {vouchAddress}</p>
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
};

export default VouchInput;
