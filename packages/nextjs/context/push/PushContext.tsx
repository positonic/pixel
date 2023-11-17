import { ReactElement, createContext } from "react";
import { PushAPI } from "@pushprotocol/restapi";
import { useWalletClient } from "wagmi";
import { useInitUser } from "~~/hooks/push/useInitUser";

export type PushData = {
  user: PushAPI | null;
  userInitialized: boolean;
};

export const PushContext = createContext<PushData>({
  user: null,
  userInitialized: false,
});

export const PushContextProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const { data: walletClient } = useWalletClient();
  const { user, userInitialized } = useInitUser(walletClient);

  return (
    <PushContext.Provider
      value={{
        user: user,
        userInitialized: userInitialized,
      }}
    >
      {children}
    </PushContext.Provider>
  );
};
