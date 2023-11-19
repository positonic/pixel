import { RefObject, useState } from "react";
import { IntegerInput } from "../scaffold-eth";
import { Interface } from "ethers/lib/utils";
import { Button, Modal } from "react-daisyui";
import { Log, keccak256, parseUnits, toHex } from "viem";
import { useAccount } from "wagmi";
import { nixAddress, useIsCollectionApproved } from "~~/hooks/pixel/useApproved";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useUserNFTsState } from "~~/services/store/store";

const boredApeAddress = "0x7580708993de7CA120E957A62f26A5dDD4b3D8aC";
const zeroAddress = "0x0000000000000000000000000000000000000000";

export const ListNFTsModal = ({
  chatId,
  dialogRef,
  onConfirm,
}: {
  chatId: string;
  dialogRef: RefObject<HTMLDialogElement>;
  onConfirm: (token: string, orderIndex: number, tokenIds: number[]) => void;
}) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(BigInt(0));
  const { nftsForSale: tokens } = useUserNFTsState();
  const approved = useIsCollectionApproved(address || "");

  const { writeAsync: addOrder, isMining } = useScaffoldContractWrite({
    contractName: "Nix",
    functionName: "addOrder",
    args: ["", "", 0, 1, [BigInt(1), BigInt(2)], BigInt(0), BigInt(0), BigInt(1), ""],
    onBlockConfirmation: async txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      const { token, orderIndex } = decodeOrderAddedLog(txnReceipt.logs);
      const tokenIds = tokens.map(token => Number(token.tokenId));
      onConfirm(token, orderIndex, tokenIds);
    },
  });

  const { writeAsync: approve, isMining: approveIsMining } = useScaffoldContractWrite({
    contractName: "BoredApes",
    functionName: "setApprovalForAll",
    args: [nixAddress, true],
  });

  const handleApprove = async () => {
    approve();
  };
  // const { writeAsync: addOrder, onBlockConfirmation } = useAddOrder();

  // const handleSelect = (e: any, tokenId: number) => {
  //   if (e.target.checked) {
  //     setSelectedNfts(prev => [...prev, tokenId]);
  //   } else {
  //     setSelectedNfts(prev => prev.filter((id: number) => id !== tokenId));
  //   }
  // };

  const list = async () => {
    if (price > 0) {
      setLoading(true);
      const tokenIds = tokens.map(token => BigInt(token.tokenId));
      const formattedPrice = parseUnits(price.toString(), 18);
      const txHash = await addOrder({
        args: [boredApeAddress, zeroAddress, 0, 1, tokenIds.sort(), formattedPrice, BigInt(0), BigInt(1), chatId],
      });
      console.log("txHash", txHash);
      setLoading(false);
    }
  };

  return (
    <Modal className="max-w-xl" ref={dialogRef}>
      <form method="dialog">
        <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2">
          x
        </Button>
      </form>
      <Modal.Header className="font-bold">List NFTs</Modal.Header>
      <Modal.Body>
        <h1 className="text-5xl font-bold text-center">Selected</h1>
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              {tokens?.map((nft, i) => (
                <div key={i} className="avatar">
                  {i < 4 && (
                    <div className="w-12">
                      <img src={nft.image} />
                    </div>
                  )}
                </div>
              ))}
              {tokens.length > 3 && (
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+{tokens.length - 3}</span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h1 className="">
                <span className="text-4xl font-bold">
                  {tokens.length} {tokens?.[0]?.symbol}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions>
        {/* <form method="dialog"> */}
        <IntegerInput value={price} placeholder="10 ETH" name="price" onChange={value => setPrice(BigInt(value))} />
        {!approved && (
          <Button
            className="btn bg-black btn-primary btn-outline mt-2 w-full"
            disabled={approveIsMining}
            loading={approveIsMining}
            onClick={handleApprove}
          >
            Approve
          </Button>
        )}
        <Button
          className="btn bg-black btn-primary btn-outline mt-2 w-full"
          disabled={loading || isMining || !price || !approved}
          onClick={list}
        >
          List
        </Button>
        {/* </form> */}
      </Modal.Actions>
    </Modal>
  );
};

export const OrderAddedTopic = keccak256(toHex("OrderAdded(address,uint256)"));

export const decodeOrderAddedLog = (logs: Log[]) => {
  const iface = new Interface(["event OrderAdded(address indexed token, uint indexed orderIndex);"]);

  for (const log of logs) {
    if (log.topics[0] === OrderAddedTopic) {
      const parsed = iface.parseLog(log);
      return {
        token: parsed.args[0],
        orderIndex: parsed.args[1]?.toString(),
      };
    }
  }

  return {
    token: "",
    orderIndex: "",
  };
};
