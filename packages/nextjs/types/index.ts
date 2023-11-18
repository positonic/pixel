import { MessageType } from "@pushprotocol/restapi/src/lib/constants";

export enum TransactionType {
  NFT_SWAP = "NFT_SWAP",
}

export type Message = {
  cid: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  type: MessageType;
};
