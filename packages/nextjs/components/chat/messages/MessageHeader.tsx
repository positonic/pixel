import React from "react";
import Image from "next/image";
import Blockies from "react-blockies";
import { FiArrowLeft } from "react-icons/fi";

interface MessageHeaderProps {
  avatarUrl?: string | null;
  address: string;
  groupName?: string;
  isGroup: boolean;
  onClose: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ avatarUrl, address, groupName, isGroup, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="bg-primary text-black p-2 mt-5 flex items-center rounded-3xl ml-4 mr-4">
      <button onClick={handleClose}>
        <FiArrowLeft className="h-7 w-7 ml-2 sm:ml-0 mr-2" />
      </button>
      {avatarUrl ? (
        <Image src={avatarUrl} className="w-10 h-10 rounded-full" alt={""} width={100} height={100} />
      ) : (
        <Blockies seed={address || ""} size={10} className="identicon rounded-full" />
      )}
      <div className="ml-4 text-lg">
        {isGroup ? groupName : `${address.substring(0, 7)}...${address.substring(address.length - 5, address.length)}`}
      </div>
    </div>
  );
};

export default MessageHeader;
