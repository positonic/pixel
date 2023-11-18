import { IFeeds } from "@pushprotocol/restapi";
import create from "zustand";
import { NFTData } from "~~/hooks/useGetNfts";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TGlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
};

type ChatState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedChat: IFeeds | null;
  setSelectedChat: (chat: IFeeds) => void;
  unsetSelectedChat: () => void;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
};

type UserNFTsState = {
  nfts: NFTData[];
  setNFTs: (nfts: NFTData[]) => void;
  nftsForSale: NFTData[];
  setNFTsForSale: (nfts: NFTData[]) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
}));

export const useChatState = create<ChatState>(set => ({
  activeTab: "chats",
  setActiveTab: (newValue: string): void => set(() => ({ activeTab: newValue })),
  selectedChat: null,
  setSelectedChat: (chat: IFeeds): void => set(() => ({ selectedChat: chat })),
  unsetSelectedChat: (): void => set(() => ({ selectedChat: null })),
  selectedAddress: "",
  setSelectedAddress: (address: string) => set(() => ({ selectedAddress: address })),
}));

export const useUserNFTsState = create<UserNFTsState>(set => ({
  nfts: [],
  setNFTs: (newValue: NFTData[]): void => set(() => ({ nfts: newValue })),
  nftsForSale: [],
  setNFTsForSale(nfts) {
    set(() => ({ nftsForSale: nfts }));
  },
}));
