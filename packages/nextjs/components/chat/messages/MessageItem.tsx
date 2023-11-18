import moment from "moment";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Message } from "~~/types";
import { beautifyAddress } from "~~/utils/helpers";

export const MessageItem = ({
  message,
  address,
  isGroup,
}: {
  message: Message;
  address: string | undefined;
  isGroup: boolean;
}) => {
  return (
    <div className={`chat ${message.from === address ? "chat-end" : "chat-start"}`}>
      {isGroup && message.from !== address && (
        <>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <BlockieAvatar address={message.from || ""} size={10} />
            </div>
          </div>
          <div className="chat-header text-primary-content">{beautifyAddress(message.from)}</div>
        </>
      )}

      <div
        className={`chat-bubble text-primary-content ${
          message.from === address ? "bg-purple-900 text-white" : "bg-gray-200"
        }`}
      >
        {message.content}
      </div>

      <div className="chat-footer opacity-50 text-primary-content">
        <time className="text-xs opacity-50">{moment.unix(message.timestamp).fromNow()}</time>
      </div>
    </div>
  );
};
