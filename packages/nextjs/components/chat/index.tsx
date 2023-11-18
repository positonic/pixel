import { ChatList } from "./ChatList";
import { Messages } from "./messages/Messages";
import { IFeeds } from "@pushprotocol/restapi";
import { useAccount } from "wagmi";
import { usePush } from "~~/context/push/hooks/usePush";
import { useChatState } from "~~/services/store/store";

export default function Chat() {
  const { setSelectedChat, setSelectedAddress, selectedAddress } = useChatState();

  const { address } = useAccount();
  const { user } = usePush();

  const onChatSelect = (chat: IFeeds) => {
    const groupInfo = chat?.groupInformation;
    if (groupInfo) {
      setSelectedAddress(groupInfo.chatId);
    } else {
      setSelectedAddress(chat?.did?.substring(7) || "");
    }
    setSelectedChat(chat);
  };

  return (
    <div className="container mx-auto shadow-lg rounded-lg md:flex md:flex-col mt-10">
      <div className="px-5 py-5 flex justify-between items-center bg-primary border-b-2 border-base-100 rounded-t-2xl">
        <div className="h-1 w-1">
          {/* <Blockies seed={address || ""} size={10} className="identicon rounded-full" /> */}
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between bg-base-300"
        style={{
          // maxHeight: "100vh",
          height: "70vh",
        }}
      >
        {/* chat list */}
        <div
          className={`flex flex-col w-full md:w-2/5 border-r-2 border-base-100 overflow-y-auto ${
            selectedAddress && "hidden md:flex"
          }`}
        >
          <ChatList onSelect={onChatSelect} />
        </div>
        {/* messages */}
        <div
          className={`flex flex-col w-full md:w-3/5 overflow-hidden min-h-full ${!selectedAddress && "hidden md:flex"}`}
          style={{
            maxHeight: "100vh", // This container should also fit within the viewport height
          }}
        >
          <Messages user={user} address={address} />
        </div>
      </div>
    </div>
  );
}
