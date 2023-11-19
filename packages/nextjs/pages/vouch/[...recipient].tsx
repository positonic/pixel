import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import EditProfile from "~~/components/profile/EditProfile";
import VouchInput from "~~/components/profile/VouchInput";
import { useGetUserName } from "~~/hooks/pixel";

const Vouch = () => {
  const { address } = useAccount() as { address: string };
  const userName = useGetUserName(address || "");

  const router = useRouter();
  const { recipient } = router.query;
  const vouchAddress = (recipient?.[1] as string) || "";

  return (
    <>
      {!userName.userName ? (
        <EditProfile address={address} />
      ) : address === vouchAddress ? (
        <div className="grid flex-grow items-center mx-auto">Cannot vouch for yourself.</div>
      ) : (
        <>
          <div className="grid flex-grow">
            <VouchInput vouchAddress={vouchAddress} />
          </div>
        </>
      )}
    </>
  );
};

export default Vouch;
