// import { useRouter } from "next/router";
// import ShareProfile from "~~/components/profile/ShareProfile";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useGetTrustScore, useGetUserName, useVouchReceivedCount } from "~~/hooks/pixel";

function CollectionProfile({ address, tokenAddress }: { address: string; tokenAddress: string }) {
  const { userName } = useGetUserName(address || "");

  const { vouchesReceived } = useVouchReceivedCount(tokenAddress || "");
  const { totalTrust } = useGetTrustScore(address || "", tokenAddress || "");

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
            <p className="text-3xl font-bold text-center">{totalTrust.toString()}</p>
            <p className="text-sm ">Trusted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-center">{vouchesReceived.toString()}</p>
            <p className="text-sm">Follows</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionProfile;
