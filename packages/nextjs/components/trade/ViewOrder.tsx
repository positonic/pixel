import { useRouter } from "next/router";
import { formatEther } from "viem";
import { SingleOrderData, useGetOrder } from "~~/hooks/pixel";
import { formatNumberCompact } from "~~/utils/bignumber";

function ViewOrder({ address, token, orderIndex }: { address: string; token: string; orderIndex: string }) {
  const router = useRouter();
  const order: SingleOrderData | null = useGetOrder(token, BigInt(orderIndex));

  if (!order) {
    return <div>Loading...</div>;
  }
  let orderString = "";
  if (order.buyOrSell) {
    orderString = "Sell";
  } else {
    orderString = "Buy";
  }
  return (
    <div>
      <p>Address: {address}</p>
      <p>Offer to {orderString}:</p>

      {/* <p>Token: {token}</p>
    <p>Maker: {order.maker}</p>
    <p>Taker: {order.taker}</p>
    <p>Address: {address}</p> */}
      {/* <p>anyOrAll: {order.anyOrAll}</p> */}

      <div className="flex w-full">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
          <p>expiry: {order.expiry}</p>
          <p>tradeCount: {order.tradeCount}</p>
        </div>
        <div className="divider divider-horizontal">FOR</div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          {formatNumberCompact(formatEther(BigInt(order.price)), "4")} ETH
        </div>
      </div>
      <div className="flex w-full">
        <button
          className="btn mt-10 btn-primary rounded-full capitalize font-normal  custom-button "
          onClick={() => router.push("/offer")}
        >
          REJECT OFFER
        </button>

        <button
          className="btn mt-10 btn-primary rounded-full capitalize font-normal  custom-button "
          onClick={() => router.push("/offer")}
        >
          ACCEPT OFFER
        </button>
      </div>
    </div>
  );
}

export default ViewOrder;
