import { useRouter } from "next/router";
import { useGetUserName } from "~~/hooks/pixel";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function EditProfile({ address }: { address: string }) {
  const router = useRouter();
  const { userName } = useGetUserName(address || "");
  const { writeAsync: writeUnregister } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "unregister",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  if (!userName) {
    return (
      <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
        <p className="text-center opacity-40">Address: {address}</p>

        <button
          className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
          onClick={() => router.push("/register")}
        >
          REGISTER PROFILE
        </button>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
        <p className="text-center opacity-40">Address: {address}</p>
        <p className="text-center opacity-40">Name: {userName}</p>
        <button
          className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
          onClick={() => writeUnregister()}
        >
          UNREGISTER
        </button>
      </section>
    );
  }
}

export default EditProfile;
