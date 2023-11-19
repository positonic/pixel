import { useAccount } from "wagmi";
import CollectionProfile from "~~/components/collections/CollectionProfile";

const Token = () => {
  const { address } = useAccount() as { address: string };

  return (
    <>
      <CollectionProfile address={address} tokenAddress="nouns" />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <img src="/tokens/noun1.png" alt="Image 1" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun2.png" alt="Image 2" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun3.png" alt="Image 3" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun4.png" alt="Image 4" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun5.png" alt="Image 5" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun6.png" alt="Image 6" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun7.png" alt="Image 7" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun8.png" alt="Image 8" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun9.png" alt="Image 9" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun10.png" alt="Image 10" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun11.png" alt="Image 11" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/noun12.png" alt="Image 12" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
