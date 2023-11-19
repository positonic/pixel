import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { usePush } from "~~/context/push/hooks/usePush";
import { Message } from "~~/types";
import { isJson } from "~~/utils/helpers";

export const useMessages = (selectedAddress: string) => {
  const { address } = useAccount();
  const { user, subscribeToNewMessages } = usePush();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  const selectedAddressRef = useRef(selectedAddress);

  const sendMessage = async (to: string, message: any) => {
    if (!user || !to) return;

    console.log("Sending message:", message);
    const sentMessage = await user.chat.send(to, { type: message.type, content: message.content });
    console.log("sentMessage:", sentMessage);

    if (!sentMessage) return;

    const newMessage = {
      cid: sentMessage.cid,
      from: address || "",
      to: to,
      type: message.type,
      content: message.content,
      timestamp: (sentMessage.timestamp || 0) / 1000,
      transaction: message.transaction,
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const fetchChatHistory = async () => {
    setLoading(true);
    if (user) {
      const chatHistory = await user.chat.history(selectedAddress);
      const msgs = chatHistory?.reverse().map((msg: any) => {
        if (isJson(msg.messageContent)) {
          const messageObj = JSON.parse(msg.messageContent);
          if (messageObj.token && messageObj.orderIndex) {
            return {
              cid: msg.cid,
              from: msg.fromDID.substring(7),
              to: msg.toDID.substring(7),
              content: messageObj.content,
              timestamp: msg.timestamp / 1000,
              type: msg.messageType,
              collection: messageObj.token,
              orderIndex: messageObj.orderIndex,
              tokenIds: messageObj.tokenIds,
            };
          }
        }
        return {
          cid: msg.cid,
          from: msg.fromDID.substring(7),
          to: msg.toDID.substring(7),
          content: msg.messageContent,
          timestamp: msg.timestamp / 1000,
          type: msg.messageType,
        };
      });
      setMessages(msgs);
    }
    setLoading(false);
  };

  const onMessage = async (message: Message) => {
    const from = message.from.toLocaleLowerCase();
    if (address?.toLocaleLowerCase() !== from && from === selectedAddressRef.current.toLocaleLowerCase()) {
      setMessages(prev => [...prev, message]);
    }
    // if (
    //   address !== from &&
    //   (from === messagesRef.current[0].from.toLocaleLowerCase() ||
    //     from === messagesRef.current[0].to.toLocaleLowerCase())
    // ) {
    //   setMessages(prev => [...prev, message]);
    // }
  };

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [address]);

  useEffect(() => {
    selectedAddressRef.current = selectedAddress;
    if (selectedAddress) {
      fetchChatHistory();
    } else {
      setMessages([]);
    }
  }, [selectedAddress]);

  useEffect(() => {
    setMessages([]);
  }, [address]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const unsubscribe = subscribeToNewMessages(onMessage);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [subscribeToNewMessages]);

  return {
    messages,
    loading,
    sendMessage,
    fetchChatHistory,
  };
};
