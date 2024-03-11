import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "clear" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const variantClasses = {
    base: "rounded-full transition-all",
    primary: "bg-primary text-white",
    secondary:
      "bg-secondary hover:brightness-125 active:brightness-150 text-white",
    clear:
      "bg-white bg-opacity-0 hover:bg-opacity-25 active:bg-opacity-50 rounded uppercase text-secondary",
    outline:
      "bg-transparent text-white border-2 border-primaryLight hover:bg-primaryLight hover:bg-opacity-35 active:bg-primaryLight active:bg-opacity-60",
  };

  const sizeClasses = {
    xs: "px-3 py-1 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-5 text-lg",
  };

  const disabledClasses = "brightness-50 cursor-default";

  return (
    <button
      className={`${variantClasses.base} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${disabled ? disabledClasses : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
