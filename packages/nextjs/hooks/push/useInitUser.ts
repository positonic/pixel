import { useEffect, useState } from "react";
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";

export const useInitUser = (signer: any) => {
  const [userData, setUserData] = useState<{ user: PushAPI | null; init: boolean; userAddress: string }>({
    user: null,
    init: false,
    userAddress: "",
  });

  useEffect(() => {
    const initUser = async () => {
      if (signer) {
        const account = await signer.account;
        if (userData.userAddress !== account.address) {
          const newUser = await PushAPI.initialize(signer, { env: ENV.PROD });
          setUserData({ user: newUser, userAddress: account.address, init: true });
        }
      }
    };

    initUser();
  }, [signer]);

  return {
    user: userData.user,
    userInitialized: userData.init,
  };
};
