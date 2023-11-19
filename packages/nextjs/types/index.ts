import { MessageType } from "@pushprotocol/restapi/src/lib/constants";

export enum TransactionType {
  NFT_BUY = "NFT_BUY",
}

export type Message = {
  cid: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  type: MessageType;
  collection?: string;
  orderIndex?: number;
  tokenIds?: number[];
  images?: string[];
};
