import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};

export function ActionButton({
  onClick,
  children,
  className = "",
  disabled = false,
  isLoading = false,
  type = "button",
}: ButtonProps) {
  return (
    <Button
      type={type}
      
      onClick={onClick}
      className={`${className} cursor-pointer`}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
}
