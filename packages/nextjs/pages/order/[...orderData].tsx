import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import ViewOrder from "~~/components/trade/ViewOrder";

const Order = () => {
  const { address } = useAccount() as { address: string };
  const router = useRouter();
  const { orderData } = router.query;
  const token = (orderData?.[0] as string) || "";
  const orderIndex = (orderData?.[1] as string) || "";

  return (
    <>
      <ViewOrder address={address} token={token} orderIndex={orderIndex} />
    </>
  );
};

export default Order;
