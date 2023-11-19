import { RefObject, useState } from "react";
import { Avatar, Button, Checkbox, Mask, Modal, Table } from "react-daisyui";
import { NFTData, useGetNfts } from "~~/hooks/useGetNfts";
import { useUserNFTsState } from "~~/services/store/store";

export const NFTListModal = ({
  dialogRef,
  onClick,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  onClick: () => void;
}) => {
  const { loading, nfts } = useGetNfts();
  const [selectedNfts, setSelectedNfts] = useState<NFTData[]>([]);

  const { setNFTsForSale } = useUserNFTsState();

  const handleSelect = (e: any, token: NFTData) => {
    if (e.target.checked) {
      setSelectedNfts(prev => [...prev, token]);
    } else {
      setSelectedNfts(prev => prev.filter((id: NFTData) => id !== token));
    }
  };

  return (
    <Modal className="max-w-xl" ref={dialogRef}>
      <form method="dialog">
        <Button
          size="sm"
          color="ghost"
          shape="circle"
          className="absolute right-2 top-2"
          onClick={() => {
            setNFTsForSale([]);
            setSelectedNfts([]);
          }}
        >
          x
        </Button>
      </form>
      <Modal.Header className="font-bold">Sell NFT</Modal.Header>
      <Modal.Body>
        <div className="overflow-x-auto">
          <Table className="rounded-box">
            <Table.Body>
              {nfts?.map((nft, i) => (
                <Table.Row key={i}>
                  <Checkbox onChange={e => handleSelect(e, nft)} />
                  <div className="flex items-center space-x-3 truncate">
                    <Avatar
                      src={nft.image}
                      innerClassName={Mask.className({
                        variant: "hexagon",
                      })}
                    />
                    <div>
                      <div className="text-xl font-bold">{nft.name}</div>
                      <div className="text-sm font-bold">
                        {nft.symbol}#{nft.tokenId}
                      </div>
                    </div>
                  </div>
                  <a className="text-neutral">Opensea</a>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Actions>
        <form method="dialog">
          <Button
            className="btn bg-black btn-primary btn-outline mt-2 w-full"
            disabled={loading || selectedNfts.length === 0}
            onClick={() => {
              setNFTsForSale(selectedNfts);
              onClick();
            }}
          >
            Next
          </Button>
        </form>
      </Modal.Actions>
    </Modal>
  );
};
