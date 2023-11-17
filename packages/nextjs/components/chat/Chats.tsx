import { FC } from "react";
import { LoadingComponent } from "../LoadingComponent";
import { ChatItem } from "./ChatItem";
import { IFeeds } from "@pushprotocol/restapi";
import { useChatState } from "~~/services/store/store";

type ChatsProps = {
  loading: boolean;
  chats: IFeeds[];
  onSelect: (chat: IFeeds) => void;
};

export const Chats: FC<ChatsProps> = ({ chats, loading, onSelect }) => {
  const { selectedAddress } = useChatState();

  return (
    <div>
      <div
        className={`flex flex-col w-full border-r-2 border-base-100 overflow-y-auto ${
          selectedAddress && "hidden md:block"
        }`}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <LoadingComponent />
          </div>
        ) : (
          <>
            {chats?.length === 0 ? (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                Start a new chat
              </span>
            ) : (
              chats?.map(chat => <ChatItem chat={chat} onSelect={onSelect} key={chat.chatId} />)
            )}
          </>
        )}
      </div>
    </div>
  );
};
