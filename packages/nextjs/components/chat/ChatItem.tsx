import { useMemo } from "react";
import Image from "next/image";
import { IFeeds } from "@pushprotocol/restapi";
import { useChatState } from "~~/services/store/store";
import { TransactionType } from "~~/types";
import { beautifyAddress, isJson } from "~~/utils/helpers";

export const ChatItem = ({ chat, onSelect }: { chat: IFeeds; onSelect: (chat: IFeeds) => void }) => {
  let isRequest = false;
  let isPayment = false;

  const { selectedAddress } = useChatState();

  if (isJson(chat.msg.messageContent)) {
    const message = JSON.parse(chat.msg.messageContent);
    isRequest = message?.type === TransactionType.REQUEST;
    isPayment = message?.type === TransactionType.DIRECT_SEND;
  }

  const groupInfo = useMemo(() => chat?.groupInformation || null, [chat]);
  const chatName = useMemo(() => groupInfo?.groupName || beautifyAddress(chat?.did?.substring(7)), [chat]);
  const profileImage = useMemo(() => groupInfo?.groupImage || chat?.profilePicture, [chat]);
  const handleSelect = () => {
    onSelect(chat);
  };

  return (
    <div
      onClick={handleSelect}
      className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-base-100 hover:bg-primary transition duration-200 cursor-pointer ${
        chat?.did?.substring(7) === selectedAddress ? "bg-primary text-white" : ""
      }`}
    >
      <div className="w-1/4">
        <Image
          src={profileImage || ""}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{chatName}</div>
        <span className={`text-gray-500 ${chat?.did?.substring(7) === selectedAddress ? "text-white" : ""}`}>
          {isRequest ? "💰 Requested" : isPayment ? "💰 Payment" : chat.msg.messageContent}
        </span>
      </div>
    </div>
  );
};
