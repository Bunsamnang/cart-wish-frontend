import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextInputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  id: Path<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;
  type?: "text" | "email" | "password";
  isTextArea?: boolean;
}

const TextInputField = <T extends FieldValues>({
  register,
  id,
  label,
  errors,
  placeholder,
  type,
  isTextArea,
}: TextInputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type for password toggle
  const inputType = type === "password" && showPassword ? "text" : type;

  // Extract error message for the current field
  const fieldError = errors[id]?.message as string | undefined;

  return (
    <>
      {isTextArea ? (
        <div className="space-y-1">
          <Label value={label} htmlFor={id} />
          <Textarea
            rows={4}
            id={id}
            placeholder={placeholder}
            shadow
            {...register(id)}
            color={fieldError ? "failure" : undefined}
            helperText={fieldError && <span>{fieldError}</span>}
          />
        </div>
      ) : (
        <div className="space-y-1 relative">
          <Label htmlFor={id} value={label} />
          <TextInput
            id={id}
            placeholder={placeholder}
            shadow
            type={inputType}
            {...register(id)}
            color={fieldError ? "failure" : undefined}
            helperText={fieldError && <span>{fieldError}</span>}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-[2.3rem] text-gray-500 hover:text-black transition-all duration-300 ease-in-out"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TextInputField;
