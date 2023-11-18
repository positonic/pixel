import { useRouter } from "next/router";
import { useGetColdWallet, useGetUserName } from "~~/hooks/pixel";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function EditProfile({ address }: { address: string }) {
  const router = useRouter();
  const { userName } = useGetUserName(address || "");
  const { coldWallet } = useGetColdWallet(address || "");

  const { writeAsync: writeUnregister } = useScaffoldContractWrite({
    contractName: "Pixel",
    functionName: "unregister",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <p className="text-center">Address: {address}</p>
      {!userName ? (
        <button
          className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
          onClick={() => router.push("/register")}
        >
          REGISTER PROFILE
        </button>
      ) : (
        <>
          <p className="text-center">Name: {userName}</p>

          <button
            className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
            onClick={() => writeUnregister()}
          >
            UNREGISTER
          </button>
        </>
      )}

      {coldWallet == "0x0000000000000000000000000000000000000000" ? (
        <button
          className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
          onClick={() => router.push("/coldwallet")}
        >
          LINK COLD WALLET
        </button>
      ) : (
        <>
          <p className="text-center">Cold Wallet: {coldWallet}</p>{" "}
          <button
            className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
            onClick={() => router.push("/coldwallet")}
          >
            UPDATE COLD WALLET
          </button>
        </>
      )}

      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/profile")}
      >
        BACK TO PROFILE
      </button>
    </section>
  );
}

export default EditProfile;

//   {totalTrust == trustScore ? (
//     <button
//       className="btn btn-primary rounded-full capitalize font-normal mt-4 mx-auto custom-button "
//       disabled={isMember}
//       onClick={() => writeJoinCircle()}
//     >
//       {isMember ? "JOINED CIRCLE" : "JOIN CIRCLE"}
//     </button>
//   ) : (
//     <>
//         <p className="text-center">Name: {userName}</p>

//          <button
//           className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
//           onClick={() => writeUnregister()}
//         >
//           UNREGISTER
//         </button>
//     </>
//   )}

//   if (!userName) {
//     return (
//       <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
//         <p className="text-center">Address: {address}</p>
//         <p className="text-center">Cold Wallet: {coldWallet}</p>

//         <button
//           className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
//           onClick={() => router.push("/register")}
//         >
//           REGISTER PROFILE
//         </button>
//       </section>
//     );
//   } else {
//     return (
//       <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
//         <p className="text-center">Address: {address}</p>
//         <p className="text-center ">Cold Wallet: {coldWallet}</p>
//         <p className="text-center">Name: {userName}</p>
//         <button
//           className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
//           onClick={() => writeUnregister()}
//         >
//           UNREGISTER
//         </button>
//       </section>
//     );
//   }
