import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { LoadingComponent } from "~~/components/LoadingComponent";
import { MetaHeader } from "~~/components/MetaHeader";
import Chat from "~~/components/chat";
import { usePush } from "~~/context/push/hooks/usePush";

const ChatPage: NextPage = () => {
  const { address } = useAccount();

  const { userInitialized } = usePush();

  if (!address) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <span>Please connect wallet</span>
      </div>
    );
  }

  if (!userInitialized) {
    return (
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
    );
  }

  return (
    <>
      <MetaHeader title="Chat" description="">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div>
        <Chat />
      </div>
    </>
  );
};

export default ChatPage;
