import { useAccount } from "wagmi";
import CollectionProfile from "~~/components/collections/CollectionProfile";

const Token = () => {
  const { address } = useAccount() as { address: string };

  return (
    <>
      <CollectionProfile address={address} tokenAddress="bayc" />
    </>
  );
};

export default Token;
