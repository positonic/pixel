import { useEffect, useState } from "react";
import moment from "moment";
import { Button, Card } from "react-daisyui";
import { FiCheck } from "react-icons/fi";
import { formatEther } from "viem";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useGetOrder } from "~~/hooks/pixel";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Message } from "~~/types";
import { beautifyAddress } from "~~/utils/helpers";
import { axiosGet } from "~~/utils/http";

const zeroAddress = "0x0000000000000000000000000000000000000000";
const boredApeAddress = "0x7580708993de7CA120E957A62f26A5dDD4b3D8aC";

export const MessageItem = ({
  message,
  address,
  isGroup,
}: {
  message: Message;
  address: string | undefined;
  isGroup: boolean;
}) => {
  console.log("message:", message);
  const order = useGetOrder(message?.collection || "", BigInt(message?.orderIndex || 0));
  console.log("order:", order);
  console.log(formatEther(10000000000n));
  const [images, setImages] = useState<Map<number, string>>();

  const fetchImages = async (ids: number[]) => {
    const returnValue = new Map<number, string>();
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const url = `https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${id}`;

      const { image } = await axiosGet(url);
      returnValue.set(id, `https://ipfs.io/ipfs/${image.substring(7)}`);
    }
    console.log("returnValue:", returnValue);
    setImages(returnValue);
  };

  const { writeAsync: executeOrders, isMining } = useScaffoldContractWrite({
    contractName: "Nix",
    functionName: "executeOrders",
    args: [[], [], [[]], BigInt(1), BigInt(0), zeroAddress],
    value: order?.price,
    onBlockConfirmation: async txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const buy = async () => {
    if (!message.tokenIds) return;
    const tokenIds = message.tokenIds.map(id => BigInt(id));
    executeOrders({
      args: [[boredApeAddress], [BigInt(message.orderIndex || 0)], [tokenIds], BigInt(0), BigInt(0), zeroAddress],
    });
  };

  useEffect(() => {
    fetchImages(message.tokenIds || []);
  }, []);

  return (
    <div className={`chat ${message.from === address ? "chat-end" : "chat-start"}`}>
      {isGroup && message.from !== address && (
        <>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <BlockieAvatar address={message.from || ""} size={10} />
            </div>
          </div>
          <div className="chat-header text-primary-content">{beautifyAddress(message.from)}</div>
        </>
      )}

      <div
        className={`chat-bubble text-primary-content ${
          message.from === address ? "bg-purple-900 text-white" : "bg-gray-200"
        }`}
      >
        {order ? (
          <div>
            <div className="mb-3"></div>
            <Card side="sm" compact={true}>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {message.tokenIds?.map((tokenId, i) => (
                  <div key={i} className="avatar">
                    {i < 3 && (
                      <div className="w-12">
                        <img src={images?.get(i) || ""} />
                      </div>
                    )}
                  </div>
                ))}
                {message.tokenIds && message.tokenIds?.length > 3 && (
                  <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                      <span>+{message.tokenIds.length - 2}</span>
                    </div>
                  </div>
                )}
              </div>

              <Card.Body>
                <Card.Title tag="h2">BAYC</Card.Title>
                <Card.Title tag="h2">{formatEther(order.price)} ETH</Card.Title>
                <Card.Actions className="justify-end">
                  {order.executed ? (
                    <label className="cursor-pointer">
                      <FiCheck className="text-black h-10 w-10" />
                    </label>
                  ) : (
                    // <Button color="primary" disabled={true}>

                    // </Button>
                    <>
                      {message.from !== address && (
                        <Button color="primary" onClick={buy} loading={isMining} disabled={isMining}>
                          Buy Now
                        </Button>
                      )}
                    </>
                  )}
                </Card.Actions>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <>{message.content}</>
        )}
      </div>

      <div className="chat-footer opacity-50 text-primary-content">
        <time className="text-xs opacity-50">{moment.unix(message.timestamp).fromNow()}</time>
      </div>
    </div>
  );
};
