'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, SubmitHandler } from 'react-hook-form';
import { registerUser } from '@/actions';
import { registerValidationSchema } from '../schema/formValidation';

type FormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<FormInputs>({
        resolver: yupResolver(registerValidationSchema),
      });

    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
        const { name, email, password } = data;

        //server action
        const resp = await registerUser( name, email, password );

        if(!resp.ok){
            toast.error(resp.message)
            return;
        }else {
          toast.success(resp.message)
          reset();
        }

    }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        {/********************* NAME ***********************/}

        <label htmlFor="name">Name</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded",
                { 
                  'border-red-500': errors.email,
                  'border-gray-400': !errors.email,
                }
            )}
          type="text"
          { ...register('name') }
          />
         <p role="alert" className='text-red-500'>{errors.name?.message}</p>
       
        {/********************* EMAIL  ***********************/}

        <label htmlFor="email" className='mt-5'>Email</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded",
                { 
                  'border-red-500': errors.email,
                  'border-gray-400': !errors.email,
                }
            )}
          type="email" 
          { ...register('email') }
          aria-invalid={errors.email ? "true" : "false"}
          />
         <p role="alert" className='text-red-500'>{errors.email?.message}</p>

        {/********************* PASSWORD  ***********************/}

        <label htmlFor="password" className='mt-5'>Password</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded",
                { 
                  'border-red-500': errors.password,
                  'border-gray-400': !errors.password,
                }
            )}
          type="password"
          { ...register('password') }
          />
         <p role="alert" className='text-red-500'>{errors.password?.message}</p>

          {/********************* CONFIRM PASSWORD  ***********************/}

          <label htmlFor="confirmPassword" className='mt-5'>Confirm Password</label>
          <input
            className={
              clsx(
                  "px-5 py-2 border bg-gray-200 rounded",
                  { 
                    'border-red-500': errors.confirmPassword,
                    'border-gray-400': !errors.confirmPassword,
                  }
              )}
            type="password"
            { ...register('confirmPassword') }
            />
          <p role="alert" className='text-red-500'>{errors.confirmPassword?.message}</p>

        <button
          type='submit'
          className="btn-primary mt-5">
          Sign Up
        </button>

        {/* divisor line */ }
        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Sign in
        </Link>

    </form>
  )
}
