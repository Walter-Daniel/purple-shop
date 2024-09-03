"use client";

import clsx from "clsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/interfaces";
import { profileValidationSchema } from "../schema/profile.schema";
import { updateUserProfile } from "@/actions";
import { useSession } from "next-auth/react";

type FormInputs = {
  name: string;
  email: string;
};

export const ProfileForm = (user: User) => {
  const {update} = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email  } = data;

    const resp = await updateUserProfile(user.id, {name, email});
    if(!resp.ok){
      toast.error(resp.message)
    }else{
      toast.success(resp.message)
      if (update) {
        await update({
          user: {
            name, email
          }
        });
      }
    }

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

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
