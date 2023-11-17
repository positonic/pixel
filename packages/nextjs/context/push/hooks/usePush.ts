import { useContext } from "react";
import { PushContext } from "../PushContext";

export const usePush = () => {
  const pushData = useContext(PushContext);

  if (Object?.keys(pushData).length === 0) {
    throw new Error("usePush() can only be used inside of <PushProvider />, " + "please declare it at a higher level.");
  }

  return pushData;
};
