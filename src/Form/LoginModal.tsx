import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import TextInputField from "./TextInputField";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "./AuthModel";

interface LoginModalProps {
  openModal: boolean;
  onCloseModal: () => void;
}

const LoginModal = ({ onCloseModal, openModal }: LoginModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = (formData: LoginCredentials) => {
    console.log(formData);
    reset();
  };

  return (
    <>
      <Modal show={openModal} onClose={onCloseModal} dismissible>
        <ModalHeader>Log in</ModalHeader>

        <ModalBody>
          <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
