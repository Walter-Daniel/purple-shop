"use client";

import clsx from "clsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/interfaces";
import { updateUserProfile } from "@/actions";
import { profileValidationSchema } from "../schema/profile.schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  user: Omit<User, 'password' | 'emailVerified'| 'role'>
}

type FormInputs = {
  name: string;
  email: string;
  image?: string;
};

export const UpdateProfileForm = ({ user }: Props) => {

  const { data: session, update } = useSession();
  const route = useRouter()


  const defaultValues = {
    name: user?.name,
    email: user?.email,
    image: undefined,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormInputs>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data:FormInputs) => {
    const formData = new FormData();
    
    const { image, ...userToSave } = data;
    
    formData.append("id", user.id!);
    formData.append("name", userToSave.name);
    formData.append("email", userToSave.email);

    if(image){
        formData.append("image", image);
    }
    const resp = await updateUserProfile(formData);
    
    if (!resp.ok) {
      toast.error(resp.message);
    } else {
      await update({
        ...session,
        user: {
          ...session?.user,
          name: resp.user!.name,
          email: resp.user!.email,
          image: resp.user!.image,
        },
      });
      toast.success(resp.message);
      route.refresh();


    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div></div>

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

      
      {/********************* IMAGE ***********************/}
      <label htmlFor="image" className="mt-5">Image</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.email,
          "border-gray-400": !errors.email,
        })}
        type="text"
        {...register("image")}
        placeholder="https://image.example.com"
      />
      <p role="alert" className="text-red-500">
        {errors.image?.message}
      </p>

     
      <button
        type="submit"
        className="btn-primary w-full mt-5"
      >
        Save changes
      </button>
    </form>
  );
};
