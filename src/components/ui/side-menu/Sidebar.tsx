'use client'

import Link from 'next/link';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const Sidebar = () => {
  return (
    <div className=''>
        {/* BACKGROUND */}
        <div 
            className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-20'
        />

        {/* BLUR */}
        <div 
            className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm backdrop-filter'
        />

        {/* SIDEBAR */}
        <nav 
            className='fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300'>
            <IoCloseOutline 
                size={50}
                className='absolute top-5 right-5 cursor-pointer'
                onClick={() => console.log('click')}
            />

            {/* INPUT */}
            <div className='relative mt-14'>
                <IoSearchOutline size={20} className='absolute top-2 left-2' />
                <input 
                    type="text" 
                    placeholder='Search'
                    className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 border-gray-200 focus:outline-none focus:border-purple-600'
                />
            </div>

            {/* MENU */}

            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPersonOutline size={20} />
                <span className='ml-3'>Profile</span>
            </Link>
            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={20} />
                <span className='ml-3'>Orders</span>
            </Link>
            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoLogInOutline size={20} />
                <span className='ml-3'>Sign in</span>
            </Link>
            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoLogOutOutline size={20} />
                <span className='ml-3'>Logout</span>
            </Link>

            {/* Line separatos */}
            <div className='w-full h-px bg-gray-200 my-5'/>

            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoShirtOutline size={20} />
                <span className='ml-3'>Products</span>
            </Link>
            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={20} />
                <span className='ml-3'>Orders</span>
            </Link>
            <Link 
                href='/'
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPeopleOutline size={20} />
                <span className='ml-3'>Users</span>
            </Link>

        </nav>

    </div>
  )
}
