import { RefObject, useState } from "react";
import { IntegerInput } from "../scaffold-eth";
import { Button, Modal } from "react-daisyui";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useUserNFTsState } from "~~/services/store/store";

const boredApeAddress = "0x6C2d83262fF84cBaDb3e416D527403135D757892";

export const ListNFTsModal = ({
  // account,
  dialogRef,
}: // onClick,
// tokens,
{
  // account: string;
  dialogRef: RefObject<HTMLDialogElement>;
  // tokens: NFTData[];
}) => {
  // const [selectedNfts, setSelectedNfts] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const { nftsForSale: tokens } = useUserNFTsState();

  const { writeAsync: addOrder, isMining } = useScaffoldContractWrite({
    contractName: "Nix",
    functionName: "addOrder",
    args: ["", "", 0, 1, [BigInt(1), BigInt(2)], BigInt(0), BigInt(0), BigInt(1), BigInt(0), ""],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  // const { writeAsync: addOrder, onBlockConfirmation } = useAddOrder();

  // const handleSelect = (e: any, tokenId: number) => {
  //   if (e.target.checked) {
  //     setSelectedNfts(prev => [...prev, tokenId]);
  //   } else {
  //     setSelectedNfts(prev => prev.filter((id: number) => id !== tokenId));
  //   }
  // };

  const list = () => {
    // address token,
    // address taker,
    // BuyOrSell buyOrSell,
    // AnyOrAll anyOrAll,
    // uint[] memory tokenIds,
    // uint price,
    // uint expiry,
    // uint tradeMax,
    // string memory chatId

    setLoading(true);
    addOrder({
      args: [boredApeAddress, "", 0, 1, [BigInt(1), BigInt(2)], BigInt(0), BigInt(0), BigInt(1), BigInt(0), ""],
    });
    setLoading(false);
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
                <div key={i} className={`avatar placeholder`}>
                  {i < 3 ? (
                    <div className="w-12">
                      <img src={nft.image} />
                    </div>
                  ) : (
                    <div className="w-12 bg-neutral text-neutral-content">
                      <span>+{tokens.length - i}</span>
                    </div>
                  )}
                </div>
              ))}
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
        <IntegerInput value={price} placeholder="10 ETH" name="price" onChange={e => setPrice(e.toString())} />
        <Button
          className="btn bg-black btn-primary btn-outline mt-2 w-full"
          disabled={loading || isMining}
          onClick={list}
        >
          List
        </Button>
        {/* </form> */}
      </Modal.Actions>
    </Modal>
  );
};
