import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import TextInputField from "./TextInputField";
import { useForm } from "react-hook-form";
import { LoginCredentials, loginSchema } from "./AuthModel";
import { login as loginAPI } from "../services/userServices";

import setAuthToken from "../utils/setAuthToken";
import { useOpen } from "../hooks/useOpen";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import useAuth2 from "../hooks/useAuth2";

interface LoginModalProps {
  openModal: boolean;
  onCloseModal: () => void;
}

const LoginModal = ({ onCloseModal, openModal }: LoginModalProps) => {
  // const { setUser } = useAuth();

  const { login } = useAuth2();

  const { redirectFrom } = useOpen();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginCredentials) => {
    try {
      const res = await loginAPI(formData);

      // update state of user to logged in
      // setUser(jwtDecode<User>(res.token));
      login(res.token);
      setAuthToken(res.token);

      reset();
      onCloseModal();

      if (redirectFrom) {
        window.location.href = redirectFrom;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // Backend responded with an error
        console.error(error.response.data.message); // Log the actual backend message
        setError("root", {
          type: "manual",
          message:
            error.response.data.message || "An unexpected error occurred",
        }); // Optionally show it to the user
      } else {
        // Handle other errors (e.g., network issues)
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={onCloseModal}
        dismissible
        data-aos="zoom-out"
        data-aos-duration="1000"
      >
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
            />
            <TextInputField
              register={register}
              placeholder=""
              label="Password"
              errors={errors}
              id="password"
              type="password"
            />
            {errors && (
              <div>
                <em className="text-red-500 ">{errors.root?.message}</em>
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
            {isSubmitting ? "Logging in" : "Log in"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginModal;
