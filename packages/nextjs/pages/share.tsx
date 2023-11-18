import { useAccount } from "wagmi";
import ShareProfile from "~~/components/profile/ShareProfile";

export default function Profile() {
  const { address } = useAccount();

  return <div>{address ? <ShareProfile userAddress={address} /> : <div>Wallet is not connected/found.</div>}</div>;
}
