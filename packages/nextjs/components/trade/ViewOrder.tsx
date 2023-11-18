import { useRouter } from "next/router";
import { SingleOrderData, useGetOrder } from "~~/hooks/pixel";

function ViewOrder({ address, token, orderIndex }: { address: string; token: string; orderIndex: string }) {
  const router = useRouter();
  const order: SingleOrderData | null = useGetOrder(token, BigInt(orderIndex));

  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <p>Address: {address}</p>
      <p>Token: {token}</p>
      <p>Maker: {order.maker}</p>
      <p>Taker: {order.taker}</p>
      <p>buyOrSell: {order.buyOrSell}</p>
      <p>anyOrAll: {order.anyOrAll}</p>
      <p>price: {order.price}</p>
      <p>expiry: {order.expiry}</p>
      <p>tradeCount: {order.tradeCount}</p>
      <p>Price: {order.price}</p>
      <button
        className="btn btn-primary rounded-full capitalize font-normal mx-auto custom-button "
        onClick={() => router.push("/offer")}
      >
        ACCEPT OFFER
      </button>
    </section>
  );
}

export default ViewOrder;
