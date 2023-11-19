import { useState } from "react";
// import { MessageType } from "@pushprotocol/restapi/src/lib/constants";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth/Input";
// import { usePush } from "~~/hooks/push/context/usePush";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccountBalance } from "~~/hooks/scaffold-eth";

function VouchCard() {
  const [address, setAddress] = useState("");
  const handleAddressChange = (e: string) => {
    console.log("e:", e);
    const inputValue = e;
    setAddress(inputValue);
  };
  const { address: senderAddress } = useAccount();
  const { balance: senderBalance } = useAccountBalance(senderAddress);

  const { balance } = useAccountBalance(address);
  // const { user } = usePush();
  const vouchBalance: number =
    balance === 0 && senderBalance && senderBalance >= 1.0
      ? 0.1 * 1e18
      : balance === 0
      ? ((senderBalance ?? 0) * 1e18) / 10
      : 0;

  console.log("vouchBalance:", vouchBalance);

  const { writeAsync: writeVouch } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "vouch",
    value: BigInt(Math.round(vouchBalance)),
    args: [address],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const vouch = async () => {
    // if (!user) return;
    // console.log("Sending message:", "GM");
    // const message = await user.chat.send(address, { type: MessageType.TEXT, content: "GM" });
    // console.log("message:", message);
    writeVouch();
  };

  return (
    <section className="w-full flex flex-col gap-4 max-w-md mx-auto my-auto">
      <AddressInput value={address} name="buy" placeholder="Name" onChange={handleAddressChange} />

      <button className="btn btn-primary rounded-full capitalize font-normal" onClick={() => vouch()}>
        VOUCH
      </button>
    </section>
  );
}

export default VouchCard;
