import { useAccount } from "wagmi";
import CollectionProfile from "~~/components/collections/CollectionProfile";

const Token = () => {
  const { address } = useAccount() as { address: string };

  return (
    <>
      <CollectionProfile address={address} tokenAddress="bayc" />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <img src="/tokens/bayc1.png" alt="Image 1" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc2.png" alt="Image 2" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc3.png" alt="Image 3" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc4.png" alt="Image 4" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc5.png" alt="Image 5" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc6.png" alt="Image 6" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc7.png" alt="Image 7" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc8.png" alt="Image 8" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc9.png" alt="Image 9" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc10.png" alt="Image 10" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc11.png" alt="Image 11" className="w-full h-auto" />
          </div>

          <div className="relative">
            <img src="/tokens/bayc12.png" alt="Image 12" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
