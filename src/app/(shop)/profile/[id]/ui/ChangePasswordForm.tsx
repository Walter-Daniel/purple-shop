"use client";

import clsx from "clsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { changePasswordSchema } from "../schema/changePassword.schema";

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(changePasswordSchema)
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { newPassword, oldPassword } = data;

    console.log({ data });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/********************* Old PASSWORD  ***********************/}
      <label htmlFor="oldPassword">Old Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.oldPassword,
          "border-gray-400": !errors.oldPassword,
        })}
        type="password"
        {...register("oldPassword")}
      />
      <p role="alert" className="text-red-500">
        {errors.oldPassword?.message}
      </p>

      {/********************* PASSWORD  ***********************/}
      <label htmlFor="newPassword" className="mt-5">
        New password
      </label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.newPassword,
          "border-gray-400": !errors.newPassword,
        })}
        type="password"
        {...register("newPassword")}
      />
      <p role="alert" className="text-red-500">
        {errors.newPassword?.message}
      </p>

      {/********************* CONFIRM PASSWORD  ***********************/}
      <label htmlFor="confirmPassword" className="mt-5">
        Confirm Password
      </label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.confirmNewPassword,
          "border-gray-400": !errors.confirmNewPassword,
        })}
        type="password"
        {...register("confirmNewPassword")}
      />
      <p role="alert" className="text-red-500">
        {errors.confirmNewPassword?.message}
      </p>

      <button type="submit" className="btn-primary mt-5">
        Change password
      </button>
    </form>
  );
};
