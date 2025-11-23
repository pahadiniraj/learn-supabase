import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type TextInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>; // <- use Path<TFormValues> here
  label?: string;
  type?: "text" | "email" | "password";
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export function TextInput<TFormValues extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  errors,
  placeholder,
  className,
}: TextInputProps<TFormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-3 relative">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <div className="relative">
        <Input
          id={name as string}
          type={inputType}
          placeholder={placeholder || label}
          className={className}
          {...register(name)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
