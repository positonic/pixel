import { FC } from "react";
import Image from "next/image";
import { IFeeds } from "@pushprotocol/restapi";
import { beautifyAddress } from "~~/utils/helpers";

type RequestItemProps = {
  request: IFeeds;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
};

export const RequestItem: FC<RequestItemProps> = ({ request, selectedAddress, setSelectedAddress }) => (
  <div
    onClick={() => setSelectedAddress(request?.did?.substring(7) || "")} // OK
    className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-base-100 hover:bg-primary transition duration-200 cursor-pointer ${
      request?.did?.substring(7) === selectedAddress ? "bg-primary text-white" : ""
    }`}
  >
    <div className="w-1/4">
      <Image
        src={request?.profilePicture || ""}
        className="object-cover h-12 w-12 rounded-full"
        width={100}
        height={100}
        alt=""
      />
    </div>
    <div className="w-3/5">
      <div className="text-lg font-semibold">{beautifyAddress(request?.did?.substring(7))}</div>
      <span className={`text-gray-500 ${request?.did?.substring(7) === selectedAddress ? "text-white" : ""}`}>
        Wants to chat with you
      </span>
    </div>
  </div>
);
