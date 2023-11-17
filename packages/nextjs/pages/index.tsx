import type { NextPage } from "next";
import { MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">The place for</span>
            <span className="block text-4xl font-bold">VIBES</span>
          </h1>
          <p className="text-center text-lg">Get started by collecting your first vouch.</p>
          <p className="text-center text-lg">Vibe curators can vouch for you to join our community.</p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <UserGroupIcon className="h-8 w-8 fill-secondary" />
              <p>Make connections with other vibers in your area.</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>Explore together on a shared group chat map.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
