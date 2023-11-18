import { FiSend } from "react-icons/fi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

type MessageInputProps = CommonInputProps<string | bigint> & {
  className?: string;
};

export const MessageInput = ({ value, onChange, name, placeholder, disabled, className }: MessageInputProps) => {
  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={className}
      suffix={
        <div className="space-x-4 flex">
          <button
            className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} font-semibold px-4 text-black`}
            disabled={disabled}
          >
            {/* * */}
            <FiSend className="text-black h-6 w-6" />
          </button>
        </div>
      }
    />
  );
};
