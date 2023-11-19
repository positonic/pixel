/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import copy from "clipboard-copy";
import qrcode from "qrcode";
import { MdOutlineContentCopy } from "react-icons/md";

function ShareProfile({ userAddress }: { userAddress: string }) {
  const [qr, setQr] = useState({
    imageURL: "",
    url: "",
  });

  useEffect(() => {
    const url = `${location.origin}/vouch/recipient/${userAddress}`;
    if (userAddress) {
      qrcode.toDataURL(
        url,
        {
          width: 480,
          margin: 2,
        },
        (err, imageURL) => {
          if (!err) {
            setQr({
              imageURL,
              url,
            });
          }
        },
      );
    }
  }, [userAddress]);

  function handleCopyToClipboard() {
    copy(qr.url);
    // toastSuccess("Copied to clipboard!", "bottom-center")
  }

  return (
    <section className="max-w-md mx-auto">
      {qr.imageURL && (
        <div className="max-w-[90vw] mx-auto mt-1">
          <figure className="overflow-hidden rounded-xl mt-1">
            <img className="block" src={qr.imageURL} alt="" />
          </figure>
          <nav className="flex  mt-4 relative justify-end items-center overflow-hidden bg-grey/50 text-black/80 b-black rounded-xl text-sm">
            <span className="px-4 flex-grow whitespace-nowrap">{qr.url}</span>
            <button
              onClick={handleCopyToClipboard}
              className="group flex-shrink-0 bg-white/70 flex items-center justify-center w-12 h-12"
            >
              <MdOutlineContentCopy className="text-xl group-hover:scale-105" />
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}
export default ShareProfile;
