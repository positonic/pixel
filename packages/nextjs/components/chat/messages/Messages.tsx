import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MessageHeader from "./MessageHeader";
import { MessageItem } from "./MessageItem";
import { PushAPI } from "@pushprotocol/restapi";
import { MessageType } from "@pushprotocol/restapi/src/lib/constants";
import moment from "moment";
import { FiCodesandbox } from "react-icons/fi";
import { LoadingComponent } from "~~/components/LoadingComponent";
import { MessageInput } from "~~/components/input/MessageInput";
import { useMessages } from "~~/hooks/push/useMessages";
import { useChatState } from "~~/services/store/store";

type MessagesProps = {
  user: PushAPI | null;
  address: string | undefined;
};

export const Messages = ({ user, address }: MessagesProps) => {
  const { activeTab, unsetSelectedChat, selectedChat, selectedAddress, setSelectedAddress } = useChatState();
  const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedAddress);

  const [isSending, setIsSending] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const [requestLoading, setRequestLoading] = useState(false);

  const handleSend = async (event: any) => {
    event.preventDefault();
    setMessageInput("");

    const trimmedInput = messageInput.trim();
    if (!trimmedInput || isSending) return;

    setIsSending(true);

    const message = {
      type: MessageType.TEXT,
      content: trimmedInput,
    };

    await sendMessage(selectedAddress, message);

    setIsSending(false);
  };

  const acceptRequest = async (address: string) => {
    setRequestLoading(true);
    await user?.chat.accept(address);
    setSelectedAddress("");
    unsetSelectedChat();
    setRequestLoading(false);
  };

  const rejectRequest = async (address: string) => {
    setRequestLoading(true);
    await user?.chat.reject(address);
    setSelectedAddress("");
    unsetSelectedChat();
    setRequestLoading(false);
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      const element = endOfMessagesRef.current;
      if (element.parentElement) {
        element.parentElement.scrollTop = element.offsetTop;
      }
    }
  }, [messages]);

  return (
    <>
      {messagesLoading ? (
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
          {activeTab === "chats" ? (
            <div className="flex flex-col h-full">
              {selectedAddress && (
                <MessageHeader
                  avatarUrl={selectedChat?.profilePicture}
                  isGroup={!!selectedChat?.groupInformation}
                  address={selectedAddress}
                  groupName={selectedChat?.groupInformation?.groupName}
                  onClose={() => {
                    setSelectedAddress("");
                  }}
                />
              )}

              <div className="overflow-y-auto p-5 flex-grow">
                {messages.map((message, idx) => (
                  <MessageItem
                    key={idx}
                    message={message}
                    address={address}
                    isGroup={!!selectedChat?.groupInformation}
                  />
                ))}
                <div ref={endOfMessagesRef} />
              </div>
              <div className="pt-2 p-5">
                <form onSubmit={handleSend}>
                  {selectedAddress !== "" ? (
                    <div className="flex items-center space-x-4">
                      <MessageInput
                        className="flex-grow w-full bg-base-100"
                        value={messageInput}
                        onChange={updatedTxValue => {
                          setMessageInput(updatedTxValue.toString());
                        }}
                        disabled={isSending || !selectedAddress}
                        placeholder={isSending ? "Message is sending..." : "Type a message..."}
                      />

                      <label className="cursor-pointer">
                        <FiCodesandbox className="text-black h-10 w-10" />
                      </label>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                      }}
                    >
                      Select a chat to start messaging
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              {selectedAddress && selectedChat && (
                <MessageHeader
                  avatarUrl={selectedChat?.profilePicture}
                  isGroup={!!selectedChat?.groupInformation}
                  address={selectedAddress}
                  onClose={() => {
                    setSelectedAddress("");
                  }}
                />
              )}
              <div className="overflow-y-auto p-5 flex-grow">
                {messages.map((message, idx) => (
                  <div key={idx} className={`chat ${message.from === address ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVR4AcXBsW2FMBSG0S9XDOAnJrBr7+BRGMViFDfZwztQQ5MWwQZJex+FpegV/zlf9fvnFyeUhnf3Be+aEyOvc8cLpeHdfcEzxAwxQ2y65sSbvuOF0vCujaFQGt7dF7xrTniGmCFmiE0xV7y7MxRz5RMxVzxDzBAzxCYeQmmMHNvKSMwVL5TGiCFmiBlihpghZogZYhMPx7bivc6dN/PKyN0XvGtOeDFXPEPMEDPEJh5irnjHlviPa054MVdGDDFDzBCbeDi2Fe917nihNEbuvuAdW8KLueIZYoaYIfYHGS41ybbN0E4AAAAASUVORK5CYII="
                          alt="User Avatar"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="chat-bubble">{message.content}</div>
                    <div className="chat-footer opacity-50 text-white">
                      <time className="text-xs opacity-50">{moment.unix(message.timestamp).fromNow()}</time>
                    </div>
                  </div>
                ))}
                <div ref={endOfMessagesRef} />
              </div>
              {messages.length > 0 && (
                <div className="border-t border-base-100 pt-2 p-5">
                  <form onSubmit={handleSend}>
                    <div className="w-full flex justify-end space-x-4">
                      <button
                        onClick={() => acceptRequest(selectedAddress)}
                        disabled={requestLoading}
                        className="py-2 px-5 text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all"
                        type="submit"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectRequest(selectedAddress)}
                        disabled={requestLoading}
                        className="py-2 px-5 text-white bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
                        type="submit"
                      >
                        Reject
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
