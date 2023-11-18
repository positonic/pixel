import { useAccount } from "wagmi";
import CollectionCards from "~~/components/collections/CollectionCards";

export default function Collections() {
  const { address } = useAccount();

  return <div>{address ? <CollectionCards address={address} /> : <div>Wallet is not connected/found.</div>}</div>;
}
