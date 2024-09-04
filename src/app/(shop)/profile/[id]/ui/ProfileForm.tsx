"use client";

import clsx from "clsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { User, UserImage as UserWithImage } from "@/interfaces";
import { profileValidationSchema } from "../schema/profile.schema";
import { updateUserProfile } from "@/actions";
import { useSession } from "next-auth/react";
import { ProductImage } from "@/components";

interface Props {
  user: Partial<User> & { UserImage?: UserWithImage[] };
}

type FormInputs = {
  name: string;
  email: string;
  image?: FileList;
};

export const ProfileForm = ({ user }: Props) => {
  const { update } = useSession();
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
      formData.append("image", image[0]);
    }

    const resp = await updateUserProfile(formData);
    

    
    // if (!resp.ok) {
    //   toast.error(resp.message);
    // } else {
    //   toast.success(resp.message);
    //   if (update) {
    //     await update({
    //       user: {
    //         name,
    //         email,
    //       },
    //     });
    //   }
    // }
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

      <div className="flex flex-col mt-5">
        <label htmlFor="image">Images</label>
        <input
          type="file"
          id="image"
          {...register("image")}
          className="p-2 border rounded-md bg-gray-200 border-gray-400"
          accept="image/png, image/jpeg, image/avif"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {user.UserImage?.map((image) => (
          <div key={image.id}>
            <ProductImage
              alt={user.name ?? ""}
              src={image.url}
              width={300}
              height={300}
              className="rounded shadow-md"
            />
            <button
              type="button"
              // onClick={() => deleteProductImage(image.id, image.url)}
              className="btn-danger w-full rounded-b-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        // className={clsx("w-full mt-8", {
        //   "btn-primary": isChanged,
        //   "btn-disabled": !isChanged,
        // })}
        // disabled={!isChanged}
        className="btn-primary w-full mt-5"
      >
        Save changes
      </button>
    </form>
  );
};
