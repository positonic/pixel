import { useRouter } from "next/router";
import { useGetUserName, useVouchReceivedCount, useVouchSentCount } from "~~/hooks/pixel";

function ViewProfile({ address }: { address: string }) {
  const { userName } = useGetUserName(address || "");

  const { vouchesReceived } = useVouchReceivedCount(address || "");
  const { vouchesSent } = useVouchSentCount(address || "");

  const router = useRouter();

  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <p className="text-center">Address: {address}</p>
      <p className="text-center">{userName}</p>
      <p className="text-center">vouchesReceived: {vouchesReceived.toString()}</p>
      <p className="text-center">vouchesSent: {vouchesSent.toString()}</p>

      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/edit")}
      >
        EDIT PROFILE
      </button>
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/share")}
      >
        SHARE QR
      </button>
    </section>
  );
}

export default ViewProfile;
