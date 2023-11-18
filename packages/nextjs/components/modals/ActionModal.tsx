export function ActionModal({
  isOpen,
  onClose,
  loading,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirmSent: (token: string, amount: string) => void;
}) {
  // const sellNFT = () => {

  // }

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full ${isOpen ? "block" : "hidden"}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-5 bg-primary rounded-lg">
        <button className="btn bg-black btn-primary btn-outline w-full" disabled={loading}>
          Request
        </button>
        <button className="btn bg-black btn-primary btn-outline w-full" disabled={loading}>
          Sell NFT
        </button>
        <button className="btn bg-black btn-primary btn-outline w-full" disabled={loading}>
          Buy NFT
        </button>
        <button className="btn bg-black btn-primary btn-outline w-full" disabled={loading}>
          Swap NFT
        </button>

        <button className="btn bg-black btn-primary btn-outline mt-2 w-full" disabled={loading} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
