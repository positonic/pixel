import { useMemo } from "react";
import Image from "next/image";
import { IFeeds } from "@pushprotocol/restapi";
import { useChatState } from "~~/services/store/store";
import { beautifyAddress } from "~~/utils/helpers";

export const ChatItem = ({ chat, onSelect }: { chat: IFeeds; onSelect: (chat: IFeeds) => void }) => {
  const { selectedAddress } = useChatState();

  const groupInfo = useMemo(() => chat?.groupInformation || null, [chat]);
  const chatName = useMemo(() => groupInfo?.groupName || beautifyAddress(chat?.did?.substring(7)), [chat]);
  const profileImage = useMemo(() => groupInfo?.groupImage || chat?.profilePicture, [chat]);
  const handleSelect = () => {
    onSelect(chat);
  };

  return (
    <div
      onClick={handleSelect}
      className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-base-100 hover:bg-gray-200 transition duration-200 cursor-pointer text-black ${
        chat?.did?.substring(7) === selectedAddress ? "bg-gray-200 text-black" : ""
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
        <span className={`text-gray-500 ${chat?.did?.substring(7) === selectedAddress ? "text-black" : ""}`}>
          {chat.msg.messageContent}
        </span>
      </div>
    </div>
  );
};
