"use client";

import Link from "next/link";
import clsx from "clsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/actions";
import { registerValidationSchema } from "@/app/auth/new-account/schema/formValidation";
import { User } from "@/interfaces";

type FormInputs = {
  name: string;
  email: string;
};

export const ProfileForm = (user: User) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    // resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email  } = data;

    console.log({data})
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/********************* PROFILE UPDATE ***********************/}

        {/********************* NAME ***********************/}

        <label htmlFor="name">Name</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": errors.email,
            "border-gray-400": !errors.email,
          })}
          type="text"
          {...register("name")}
        />
        <p role="alert" className="text-red-500">
          {errors.name?.message}
        </p>

        {/********************* EMAIL  ***********************/}

        <label htmlFor="email" className="mt-5">
          Email
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": errors.email,
            "border-gray-400": !errors.email,
          })}
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <p role="alert" className="text-red-500">
          {errors.email?.message}
        </p>

      <button type="submit" className="btn-primary mt-5">
        Save change
      </button>
    </form>
  );
};
