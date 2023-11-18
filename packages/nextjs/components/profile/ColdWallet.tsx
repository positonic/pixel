import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth/Input";
import { useGetColdWallet } from "~~/hooks/pixel";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function SetColdWallet() {
  const router = useRouter();

  const [name, setName] = useState("");

  const { address } = useAccount();
  const { coldWallet } = useGetColdWallet(address || "");

  const handleNameChange = (e: string) => {
    console.log("e:", e);
    const inputValue = e;
    setName(inputValue);
  };

  const {
    // data,
    writeAsync: writeRegister,
    isMining,
  } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "setColdWallet",
    args: [name],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <section className="w-full flex flex-col gap-4  max-w-md mx-auto pt-60 ">
      <p className="text-center">ColdWallet: {coldWallet}</p>
      <InputBase value={name} name="register" placeholder="Address / ENS" onChange={handleNameChange} />
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        disabled={isMining}
        onClick={() => writeRegister()}
      >
        UPDATE COLD WALLET
        {isMining && <span className="loading loading-spinner"></span>}
      </button>
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        disabled={isMining}
        onClick={() => router.push("/profile")}
      >
        BACK TO PROFILE
      </button>
    </section>
  );
}

export default SetColdWallet;
