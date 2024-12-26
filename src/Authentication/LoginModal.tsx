import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import TextInputField from "./TextInputField";
import { useForm } from "react-hook-form";
import { LoginCredentials, User } from "./AuthModel";
import { login } from "../components/services/userServices";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface LoginModalProps {
  openModal: boolean;
  onCloseModal: () => void;
}

const LoginModal = ({ onCloseModal, openModal }: LoginModalProps) => {
  const [formError, setFormError] = useState("");
  const { setUser } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (formData: LoginCredentials) => {
    try {
      const res = await login(formData);

      // update state of user to logged in
      setUser(jwtDecode<User>(res.token));

      reset();
      onCloseModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // Backend responded with an error
        console.error(error.response.data.message); // Log the actual backend message
        setFormError(error.response.data.message); // Optionally show it to the user
      } else {
        // Handle other errors (e.g., network issues)
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={onCloseModal} dismissible>
        <ModalHeader>Log in</ModalHeader>

        <ModalBody>
          <form
            id="loginForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <TextInputField
              register={register}
              placeholder=""
              label="Email"
              errors={errors}
              id="email"
              type="email"
              validationRules={{ required: "Email required" }}
            />
            <TextInputField
              register={register}
              placeholder=""
              label="Password"
              errors={errors}
              id="password"
              type="password"
              validationRules={{ required: "Password required" }}
            />
            {formError && (
              <div>
                <em className="text-red-500 ">{formError}</em>
              </div>
            )}
          </form>
        </ModalBody>

        <ModalFooter>
          <button
            type="submit"
            form="loginForm"
            disabled={isSubmitting}
            className="w-full py-2 bg-black text-white rounded-md border border-white transition duration-300 ease-in-out hover:opacity-85"
          >
            {isSubmitting ? "Loggin in" : "Log in"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginModal;
