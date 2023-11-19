import { RefObject, useState } from "react";
import { IntegerInput } from "../scaffold-eth";
import { Button, Modal } from "react-daisyui";
import { parseUnits } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useUserNFTsState } from "~~/services/store/store";

const boredApeAddress = "0x74Cf9087AD26D541930BaC724B7ab21bA8F00a27";
const zeroAddress = "0x0000000000000000000000000000000000000000";

export const ListNFTsModal = ({
  chatId,
  dialogRef,
  onConfirm,
}: {
  chatId: string;
  dialogRef: RefObject<HTMLDialogElement>;
  onConfirm: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(BigInt(0));
  const { nftsForSale: tokens } = useUserNFTsState();

  const { writeAsync: addOrder, isMining } = useScaffoldContractWrite({
    contractName: "Nix",
    functionName: "addOrder",
    args: ["", "", 0, 1, [BigInt(1), BigInt(2)], BigInt(0), BigInt(0), BigInt(1), ""],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      onConfirm();
      dialogRef.current?.close();
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
        <Button
          className="btn bg-black btn-primary btn-outline mt-2 w-full"
          disabled={loading || isMining || !price}
          onClick={list}
        >
          List
        </Button>
        {/* </form> */}
      </Modal.Actions>
    </Modal>
  );
};
