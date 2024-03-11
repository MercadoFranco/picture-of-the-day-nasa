import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ value, onChange, className = "", ...rest }: InputProps) => {
  return (
    <input
      className={`bg-primaryLight border-b border-white ${className}`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
