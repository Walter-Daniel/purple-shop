"use client";

import { updateUserData } from "@/actions/user/update-user-data";
import { Modal } from "@/components";
import { User } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userValidationSchema } from "../schema/updateValidation";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export const UserForm = (user:User) => {
  const router = useRouter();
  const defaultValues = {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    id: user.id
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormInputs>({
    resolver: yupResolver(userValidationSchema),
    defaultValues
  });

  const currentValues = watch();
  const id = user.id

  let isChanged = (Object.keys(defaultValues) as (keyof FormInputs)[]).some(
    (key) => defaultValues[key] !== currentValues[key]
  );

  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('se hizo el submit')

    const newData = {
      ...data,
      id
    }
    const resp = await updateUserData( id, newData );
    // if(resp.ok){
    //   router.refresh();
    // }
   if(resp.ok){
    !!isChanged;
    router.refresh();
   }

  
  };

  return (
    <div>
      <Modal title="Update User">
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

          {/********************* PASSWORD  ***********************/}

          <label htmlFor="password" className="mt-5">
            Password
          </label>
          <input
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": errors.password,
              "border-gray-400": !errors.password,
            })}
            type="password"
            {...register("password")}
          />
          <p role="alert" className="text-red-500">
            {errors.password?.message}
          </p>

          {/********************* ROLE  ***********************/}

          <label htmlFor="role" className="mt-5">
            Role
          </label>
          <input
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": errors.role,
              "border-gray-400": !errors.role,
            })}
            type="text"
            {...register("role")}
          />
          <p role="alert" className="text-red-500">
            {errors.role?.message}
          </p>

         <div>
         <button
                type="submit"
                className={
                  clsx("w-full mt-8", {
                    "btn-primary": isChanged,
                    "btn-disabled": !isChanged
                  })
                }
                disabled={!isChanged}
              >
                Update
              </button>
         </div>
              <div>
              </div>
        </form>
              <button
                onClick={router.back}
                className="btn-secondary w-full mt-2"
              >
                Close
              </button>
      </Modal>
    </div>
  );
};
