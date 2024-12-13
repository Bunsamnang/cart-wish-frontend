import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { User } from "lucide-react";
import TextInputField from "./TextInputField";
import { useForm } from "react-hook-form";
import { SignupCredentials } from "./AuthModel";
import { useState } from "react";

interface SignupModalProps {
  openModal: boolean;
  onCloseModal: () => void;
}

const SignupModal = ({ openModal, onCloseModal }: SignupModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>();
  const onSubmit = (formData: SignupCredentials) => {
    console.log(formData);

    reset();
  };

  const [profilePic, setProfilePic] = useState<File | null>(null);

  console.log(profilePic);

  const passwordValidation = (value: string) => {
    if (!value) {
      return "Password is required"; // First rule: required
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long"; // Second rule: minLength
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter"; // Third rule: uppercase
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number"; // Fourth rule: number
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return "Password must contain at least one special character"; // Fifth rule: special character
    }
    return true; // If all conditions are met, validation passes
  };

  return (
    <Modal show={openModal} onClose={onCloseModal} dismissible>
      <ModalHeader>Sign up</ModalHeader>

      <ModalBody>
        <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-2">
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                className="w-28 h-28 object-cover rounded-full"
              />
            ) : (
              <User className="bg-slate-900 w-28 h-28 rounded-full p-2 text-white" />
            )}
            <input
              type="file"
              accept="image/*"
              id="inputFile"
              className="hidden"
              onChange={(e) => {
                // check if it exists first
                if (e.target.files && e.target.files[0]) {
                  setProfilePic(e.target.files[0]);
                }
              }}
            />
            <label
              htmlFor="inputFile"
              className="bg-slate-900 px-4 py-2 text-white mt-2 rounded cursor-pointer hover:bg-slate-950 transition-all"
            >
              Upload Image
            </label>
          </div>
          <div className="md:flex gap-2 md:mb-2">
            <div className="md:flex-1">
              <TextInputField
                id="username"
                type="text"
                errors={errors}
                label="Name"
                placeholder="Enter your name"
                register={register}
                validationRules={{
                  required: "Username required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters long",
                  },
                }}
              />
            </div>
            <div className="md:flex-1">
              <TextInputField
                id="email"
                type="email"
                errors={errors}
                label="Email"
                placeholder="Enter your email"
                register={register}
                validationRules={{ required: "Email required" }}
              />
            </div>
          </div>
          <div className="md:flex gap-2 md:mb-2">
            <div className="md:flex-1">
              <TextInputField
                id="password"
                type="password"
                errors={errors}
                label="Password"
                placeholder="Enter your password"
                register={register}
                validationRules={{ validate: passwordValidation }}
              />
            </div>
            <div className="md:flex-1">
              <TextInputField
                id="confirmPassword"
                type="password"
                errors={errors}
                label="Confirm Password"
                placeholder="Enter confirm password"
                register={register}
                validationRules={{ required: "Required" }}
              />
            </div>
          </div>
          <TextInputField
            id="deliveryAddress"
            isTextArea
            errors={errors}
            label="Delivery Address"
            placeholder="Enter delivery address"
            register={register}
            validationRules={{ required: "Required" }}
          />
        </form>
      </ModalBody>

      <ModalFooter>
        <button
          type="submit"
          form="signupForm"
          disabled={isSubmitting}
          className="w-full py-2 bg-black text-white rounded-md border border-white transition duration-300 ease-in-out hover:opacity-85"
        >
          {isSubmitting ? "Signing up" : "Sign up"}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SignupModal;
