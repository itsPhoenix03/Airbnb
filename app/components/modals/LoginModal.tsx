"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    let safeData = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim(),
    };

    signIn("credentials", {
      ...safeData,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("You are back!");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) toast.error(callback.error);
    });
  };

  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Ah, the pleasure of your presence once more!"
        subtitle="Welcoming you back with open arms and a big smile."
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <span>Didn&#39;t have an account?</span>
          <span
            onClick={toggle}
            className="text-netural-800 cursor-pointer hover:underline underline-offset-2"
          >
            Create on now!
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Welcome Back"
      actionLabel="Meet the community again"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      body={BodyContent}
      footer={FooterContent}
    />
  );
};

export default LoginModal;
