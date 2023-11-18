import { useAccount } from "wagmi";
import EditProfile from "~~/components/profile/EditProfile";

export default function Profile() {
  const { address } = useAccount();

  return <div>{address ? <EditProfile address={address} /> : <div>Wallet is not connected/found.</div>}</div>;
}
