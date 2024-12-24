import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { LoginCredentials, SignupCredentials } from "./AuthModel";
import { Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputTypes = LoginCredentials | SignupCredentials;

interface TextInputFieldProps<T extends InputTypes> {
  register: UseFormRegister<T>;
  validationRules?: object;
  id: Path<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors;
  type?: "text" | "email" | "password";
  isTextArea?: boolean;
}

const TextInputField = <T extends InputTypes>({
  register,
  validationRules,
  id,
  label,
  errors,
  placeholder,
  type,
  isTextArea,
}: TextInputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldError = errors[id];

  // for toggling password to text and backward
  const inputType = type === "password" && showPassword ? "text" : type;

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
            helperText={
              fieldError && (
                <span>
                  {typeof fieldError.message === "string"
                    ? fieldError.message
                    : ""}
                </span>
              )
            }
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
            {...register(id, validationRules)}
            color={fieldError ? "failure" : undefined}
            helperText={
              fieldError && (
                <span>
                  {typeof fieldError.message === "string"
                    ? fieldError.message
                    : ""}
                </span>
              )
            }
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
