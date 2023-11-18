import { useAccount } from "wagmi";
import GetOffers from "~~/components/trade/GetOffers";

export default function Trade() {
  const { address } = useAccount();

  return <div>{address ? <GetOffers address={address} /> : <div>Wallet is not connected/found.</div>}</div>;
}
