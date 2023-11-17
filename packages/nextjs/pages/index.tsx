import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to Pixel</span>
            <span className="block text-4xl font-bold">Swap NFTs with Friends</span>
          </h1>
          <p className="text-center text-lg">Get started by collecting your first NFT.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
