'use client';

import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const Modal = ({children, title}: Props) => {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="fade-in p-8 border w-96 shadow-lg rounded-md bg-white relative ">
            <MdCancel
            height={30}
            onClick={router.back}
            className="text-3xl absolute top-0 right-0 cursor-pointer m-2"/>
        <div className="">
          <h3 className="text-2xl font-bold text-gray-900 text-center">{title}</h3>
          <div className="mt-2 px-7 py-3">
            {children}
          </div>
         
        </div>
      </div>
    </div>
  );
}