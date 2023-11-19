import { useRouter } from "next/router";
import ShareProfile from "~~/components/profile/ShareProfile";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useGetUserName, useVouchReceivedCount, useVouchSentCount } from "~~/hooks/pixel";

function ViewProfile({ address }: { address: string }) {
  const { userName } = useGetUserName(address || "");

  const { vouchesReceived } = useVouchReceivedCount(address || "");
  const { vouchesSent } = useVouchSentCount(address || "");

  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 mb-4 max-w-md mx-auto px-5">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-20 h-20">
            <BlockieAvatar address={address} size={100} />
          </div>
          <div className="text-center">
            <p className="font-bold">{userName}</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className=" mr-8">
            <p className="text-3xl font-bold text-center">{vouchesSent.toString()}</p>
            <p className="text-sm ">Vouched</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-center">{vouchesReceived.toString()}</p>
            <p className="text-sm">Received</p>
          </div>
        </div>
      </div>

      <ShareProfile userAddress={address} />
      {/* <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/share")}
      >
        SHARE QR
      </button> */}
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/edit")}
      >
        EDIT PROFILE
      </button>
    </section>
  );
}

export default ViewProfile;
