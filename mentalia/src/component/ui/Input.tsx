import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Input = ({ placeholder, className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      placeholder={placeholder}
      className={`w-full placeholder:text-gray-400 border-b-2 border-gray-300 focus:border-purple-800 text-sm px-2 py-1 outline-none ${className}`}
    />
  );
};

export default Input;
