import { MessageType } from "@pushprotocol/restapi/src/lib/constants";

export enum TransactionType {
  SEND = "SEND",
  REQUEST = "REQUEST",
  DIRECT_SEND = "DIRECT_SEND",
}

export type Message = {
  cid: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  type: MessageType;
};
