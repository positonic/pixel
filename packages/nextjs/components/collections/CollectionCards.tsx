import { useRouter } from "next/router";
import { TokenData, useGetTokens } from "~~/hooks/pixel";

function CollectionCards({ address }: { address: string }) {
  const router = useRouter();

  const { tokens, ordersLengthList, executedList, volumeTokenList, volumeWethList }: TokenData = useGetTokens([
    BigInt(0),
    BigInt(1),
    BigInt(2),
  ]);

  console.log("Tokens:", tokens);
  console.log("Orders Length List:", ordersLengthList);
  console.log("Executed List:", executedList);
  console.log("Volume Token List:", volumeTokenList);
  console.log("Volume WETH List:", volumeWethList);
  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <div className="text-center opacity-40">
        <p className="text-center opacity-40">Address: {address}</p>

        {tokens.map((item, index) => (
          <p key={index}>
            Token {index + 1}: {item}
          </p>
        ))}
      </div>
      <button
        className="btn btn-primary rounded-full capitalize font-normal mx-auto custom-button"
        onClick={() => router.push("/trade")}
      >
        OFFERS
      </button>
    </section>
  );
}

export default CollectionCards;
