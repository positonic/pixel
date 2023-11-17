import { FC } from "react";
import { LoadingComponent } from "../LoadingComponent";
import { RequestItem } from "./RequestItem";
import { IFeeds } from "@pushprotocol/restapi";
import { useChatState } from "~~/services/store/store";

type RequestsProps = {
  requests: IFeeds[];
  loading: boolean;
};

export const Requests: FC<RequestsProps> = ({ loading, requests }) => {
  const { selectedAddress, setSelectedAddress } = useChatState();

  return (
    <div className={`flex flex-col w-full border-r-2 overflow-y-auto ${selectedAddress && "hidden md:flex"}`}>
      <div className="flex items-center justify-center border-b-2 border-base-100 py-4 px-2">
        <span>Requests</span>
      </div>
      <div className={`flex flex-col w-full  border-r-2 overflow-y-auto ${selectedAddress && "hidden md:block"}`}>
        {loading ? (
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
        ) : (
          <>
            {requests.length > 0 ? (
              <>
                {requests?.map((request, idx) => (
                  <RequestItem
                    key={idx}
                    request={request}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />
                ))}
              </>
            ) : (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                No requests
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
