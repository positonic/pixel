import { useEffect, useState } from "react";
import { IFeeds } from "@pushprotocol/restapi";
import { useAccount } from "wagmi";
import { usePush } from "~~/context/push/hooks/usePush";

export const useChat = () => {
  const { address } = useAccount();
  const { user } = usePush();

  const [chats, setChats] = useState<IFeeds[]>([]);
  const [requests, setRequests] = useState<IFeeds[]>([]);
  const [chatFetching, setChatFetching] = useState(false);
  const [requestsLoading, setRequestsFetching] = useState(false);

  const fetchChats = async () => {
    setChatFetching(true);
    if (user) {
      const _chats = await user.chat.list("CHATS");
      console.log("chats:", _chats);
      setChats(_chats);
    }
    setChatFetching(false);
  };

  const fetchRequests = async () => {
    setRequestsFetching(true);
    if (user) {
      const _requests = await user.chat.list("REQUESTS");
      console.log("_requests:", _requests);
      setRequests(_requests);
    }
    setRequestsFetching(false);
  };

  const addChat = (chat: IFeeds) => {
    setChats(prev => [...prev, chat]);
  };

  useEffect(() => {
    setChats([]);
    setRequests([]);
    // setMessages([]);
    setChatFetching(false);
  }, [address]);

  useEffect(() => {
    fetchChats();
    fetchRequests();
  }, [user]);

  return {
    chats,
    requests,
    chatFetching,
    requestsLoading,
    fetchChats,
    fetchRequests,
    addChat,
  };
};
