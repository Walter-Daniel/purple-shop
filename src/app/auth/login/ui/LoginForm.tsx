'use client';

import Link from "next/link";
import { authenticate } from '@/actions';
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect } from "react";

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);


  useEffect(() => {
    
    if (state === "Success") {
      // if(!!params) return window.location.replace(params)
      window.location.replace("/")
    }
    
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border border-gray-400 bg-gray-200 rounded mb-5"
          type="email"
          name="email" 
          defaultValue="maria@email.com"
          />

        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border border-gray-400 bg-gray-200 rounded mb-5"
          type="password" 
          name="password"
          defaultValue="123456"
          />


        <LoginButton />

          {state === 'Invalid credentials.' && (
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
                  <IoInformationCircle className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{state}</p>
            </div>
          )}

        {/* divisor line */ }
        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Create new account
        </Link>

    </form>
  )
}


function LoginButton() {
    const { pending } = useFormStatus();

    return (

        <button
            type="submit" 
            className={ clsx({
                "btn-primary" : !pending,
                "btn-disabled": pending
            })}
            disabled={ pending }
            >
            Log in 
        </button>

    );
}