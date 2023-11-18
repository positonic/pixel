import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth/Input";
import { useGetUserName } from "~~/hooks/pixel";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function Register() {
  const router = useRouter();

  const [name, setName] = useState("");

  const { address } = useAccount();
  const { userName } = useGetUserName(address || "");

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
    functionName: "register",
    args: [name],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    if (userName) {
      router.push("/profile");
    }
  }, [userName]);

  return (
    <section className="w-full flex flex-col gap-4  max-w-md mx-auto pt-60 ">
      <InputBase value={name} name="register" placeholder="Name / Alias / ENS" onChange={handleNameChange} />
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        disabled={isMining}
        onClick={() => writeRegister()}
      >
        REGISTER NAME
        {isMining && <span className="loading loading-spinner"></span>}
      </button>
    </section>
  );
}

export default Register;
