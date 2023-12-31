import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import CollectionProfile from "~~/components/collections/CollectionProfile";

const Token = () => {
  const { address } = useAccount() as { address: string };

  const router = useRouter();
  const { token } = router.query;
  const tokenAddress = (token?.[1] as string) || "";

  return (
    <>
      <CollectionProfile address={address} tokenAddress={tokenAddress} />
    </>
  );
};

export default Token;
