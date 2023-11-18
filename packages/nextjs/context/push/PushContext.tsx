import { ReactElement, createContext, useCallback, useEffect, useRef, useState } from "react";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { ProposedEventNames, STREAM } from "@pushprotocol/restapi/src/lib/pushstream/pushStreamTypes";
import { useWalletClient } from "wagmi";
import { useInitUser } from "~~/hooks/push/useInitUser";
import { Message, TransactionType } from "~~/types";
import { isJson } from "~~/utils/helpers";

type OnNewMessageCallback = (message: Message) => void;

export type PushData = {
  user: PushAPI | null;
  userInitialized: boolean;
  subscribeToNewMessages: (callback: OnNewMessageCallback) => () => void; // Function to subscribe to new messages
};

export const PushContext = createContext<PushData>({
  user: null,
  userInitialized: false,
  subscribeToNewMessages: () => () => {
    console.log("PushContext.subscribeToNewMessages: default empty implementation");
  },
});

export const PushContextProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const { data: walletClient } = useWalletClient();
  const { user, userInitialized } = useInitUser(walletClient);

  const [subscribers, setSubscribers] = useState<OnNewMessageCallback[]>([]);
  const subscribersRef = useRef<OnNewMessageCallback[]>([]);

  const subscribeToNewMessages = useCallback((callback: OnNewMessageCallback) => {
    setSubscribers(prev => [...prev, callback]);

    return () => {
      setSubscribers(prev => prev.filter(cb => cb !== callback));
    };
  }, []);

  const notifySubscribers = useCallback((message: Message) => {
    subscribersRef.current.forEach(callback => callback(message));
    // subscribers.forEach(callback => callback(message));
  }, []);

  // const listenChat = async () => {
  //   if (user) {
  //     user.stream.on(STREAM.CHAT, onMessage);
  //   }
  // };

  const onMessage = async (data: any) => {
    console.log("STREAM:", data);
    if (data.event === ProposedEventNames.Message) {
      const newMessage = eventToMessage(data);
      notifySubscribers(newMessage);
    }
  };

  const initStream = async () => {
    if (!user) return;
    const stream = await user.initStream(
      [CONSTANTS.STREAM.CHAT],
      // {
      //   filter: {
      //     channels: ['*'], // pass in specific channels to only listen to those
      //     chats?: ['*'], // pass in specific chat ids to only listen to those
      //   },
      //   connection?: {
      //     retries?: 3, // number of retries in case of error
      //   },
      //   raw?: false // enable true to show all data
      // }
    );
    console.log("stream:", stream);
    stream.on(STREAM.CHAT, onMessage);

    stream.connect();
  };

  // Update the ref when subscribers change
  useEffect(() => {
    subscribersRef.current = subscribers;
  }, [subscribers]);

  useEffect(() => {
    console.log("user:", user);
    initStream();
    // if (user) {
    //   const stream = await user.initStream([CONSTANTS.STREAM.CHAT, CONSTANTS.STREAM.CHAT_OPS]
    //   // {
    //   //   filter: {
    //   //     channels: ['*'], // pass in specific channels to only listen to those
    //   //     chats?: ['*'], // pass in specific chat ids to only listen to those
    //   //   },
    //   //   connection?: {
    //   //     retries?: 3, // number of retries in case of error
    //   //   },
    //   //   raw?: false // enable true to show all data
    //   // }
    //   );
    //   console.log('stream:', stream)
    //   stream.on(STREAM.CHAT, onMessage);

    //   stream.connect()
    //   // Return a cleanup function to unsubscribe when the user changes or the component unmounts
    //   return () => {
    //     stream.off(STREAM.CHAT, onMessage);
    //   };
    // }
  }, [user]);

  return (
    <PushContext.Provider
      value={{
        user: user,
        userInitialized: userInitialized,
        subscribeToNewMessages,
      }}
    >
      {children}
    </PushContext.Provider>
  );
};

export const eventToMessage = (event: any) => {
  if (isJson(event?.message?.content)) {
    const messageObj = JSON.parse(event?.message?.content);
    if (messageObj.type == TransactionType.NFT_SWAP && messageObj.token && messageObj.amount) {
      return {
        cid: event.reference,
        from: event.from.substring(7),
        to: event.to?.[0].substring(7),
        content: event?.message?.content,
        timestamp: event.timestamp / 1000,
        type: event.message.type,
      };
    }
  }

  return {
    cid: event.reference,
    from: event.from.substring(7),
    to: event.to?.[0]?.substring(7),
    content: event.message.content,
    timestamp: event.timestamp / 1000,
    type: event.message.type,
  };
};
