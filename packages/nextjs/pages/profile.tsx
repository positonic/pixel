import { useAccount } from "wagmi";
import ViewProfile from "~~/components/profile/ViewProfile";

export default function Profile() {
  const { address } = useAccount();

  return <div>{address ? <ViewProfile address={address} /> : <div>Wallet is not connected/found.</div>}</div>;
}
