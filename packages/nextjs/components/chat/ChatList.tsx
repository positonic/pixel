import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { fetchEnsAddress } from "wagmi/actions";
import { useChat } from "~~/hooks/push/useChat";
import { useChatState } from "~~/services/store/store";

export const ChatList = () => {
  const { activeTab, setActiveTab, selectedAddress, setSelectedAddress } = useChatState();
  const { requests, fetchChats, fetchRequests } = useChat();

  const [searchAddress, setSearchAddress] = useState("");

  const handleSearch = async (term: string) => {
    if (!term) {
      setSearchAddress("");
      return;
    }

    if (isAddress(term)) {
      setSearchAddress(term);
      return;
    } else {
      try {
        const ensAddress = await fetchEnsAddress({ name: term });
        if (ensAddress) {
          setSearchAddress(ensAddress || "");
        }
        // setEnsName(term);
      } catch (err) {
        console.log(err);
        setSearchAddress("");
      }
    }
  };

  const handleToggle = (tab: string) => {
    setSelectedAddress("");
    if (tab === "chats") {
      fetchChats();
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === "requests") {
      fetchRequests();
    }
  }, [selectedAddress]);

  return (
    <div>
      <div className="flex items-center justify-center space-x-4 py-4 bg-base-300 border-b-2 border-base-100 tabs tabs-boxed">
        <a className={`tab ${activeTab === "chats" ? "tab-active" : ""}`} onClick={() => handleToggle("chats")}>
          CHATS
        </a>
        <a className={`tab ${activeTab === "requests" ? "tab-active" : ""}`} onClick={() => handleToggle("requests")}>
          REQUESTS
          <div className="ml-1 badge badge-accent text-primary">{requests.length}</div>
        </a>
      </div>
      <div className="border-b-2 border-base-100 py-4 px-2">
        <input
          type="text"
          placeholder="Search address or ENS"
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full bg-white text-black"
          onChange={e => {
            handleSearch(e.target.value);
          }}
        />
        {searchAddress.length > 0 && (
          <div className="absolute mt-2 bg-white border rounded shadow">
            <div
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-primary"
              onClick={() => {
                setSelectedAddress(searchAddress);
                setSearchAddress("");
              }}
            >
              {searchAddress}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
