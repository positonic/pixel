import { ChatList } from "./ChatList";
import { useChatState } from "~~/services/store/store";

export default function Chat() {
  const { selectedAddress } = useChatState();

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
        <div
          className={`flex flex-col w-full md:w-2/5 border-r-2 border-base-100 overflow-y-auto ${
            selectedAddress && "hidden md:flex"
          }`}
        >
          {/* chat list */}
          <ChatList />
        </div>
        {/* messages */}
      </div>
    </div>
  );
}
