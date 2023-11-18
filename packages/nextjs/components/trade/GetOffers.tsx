import { useRouter } from "next/router";
import { OrderData, useGetOrders } from "~~/hooks/pixel";

function GetOffers({ address }: { address: string }) {
  const router = useRouter();

  const orderIndices = [BigInt(0), BigInt(1), BigInt(2)]; // Update with your desired order indices
  const { makers, takers, tokenIds, prices, data }: OrderData = useGetOrders(
    "0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25",
    orderIndices,
  );

  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <p className="text-center opacity-40">Address: {address}</p>

      <div>
        {/* Render or utilize the fetched orders in your UI */}
        {/* For example, display order information */}
        <ul>
          {makers.map((maker, index) => (
            <li key={index}>
              Maker: {maker}, Taker: {takers[index]}, Price: {prices[index]}
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>

        <p>Token Ids: {tokenIds}</p>
        <p>Data: {data}</p>
      </div>
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/offer")}
      >
        MAKE OFFER
      </button>
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/order/0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25/0")}
      >
        DEMO OFFER
      </button>
    </section>
  );
}

export default GetOffers;
