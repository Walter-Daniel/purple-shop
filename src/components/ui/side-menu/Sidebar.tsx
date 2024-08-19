'use client'

import { userUiStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { IoCloseOutline, IoLogOutOutline, IoSearchOutline } from 'react-icons/io5';
import { userLinks, adminLinks } from './Links';
import { logout } from '@/actions';

export const Sidebar = () => {

    const isSideMenuOpen = userUiStore( state => state.isSideMenuOpen );
    const closeSideMenu = userUiStore( state => state.CloseSideMenu);

  return (
    <div className=''>
        {/* BACKGROUND */}
        {
            isSideMenuOpen && (
                <div 
                    className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-20'
                />
            )
        }

        {/* BLUR */}
        {
            isSideMenuOpen && (
                <div 
                    onClick={() => closeSideMenu()}
                    className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm backdrop-filter'
                />
            )
        }

        {/* SIDEBAR */}
        <nav 
            className={
                clsx(
                    'fixed p-5 right-0 top-0 w-[375px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                    {
                        'translate-x-full': !isSideMenuOpen
                    }
                )
            }>
            <IoCloseOutline 
                size={30}
                className='absolute top-5 right-5 cursor-pointer'
                onClick={() => closeSideMenu()}
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

            {
                userLinks.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.url}
                        onClick={() => closeSideMenu()}
                        className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        {item.icon}
                        <span className='ml-3'>{item.title}</span>
                    </Link>
                ))
            }
            
            <button 
                onClick={() => logout()}
                className='flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoLogOutOutline />
                <span className='ml-3'>Logout</span>    
                </button>

            {/* Line separatos */}
            <div className='w-full h-px bg-gray-200 my-5'/>

            {
                adminLinks.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.url}
                        className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        {item.icon}
                        <span className='ml-3'>{item.title}</span>
                    </Link>
                ))
            }
        </nav>
    </div>
  )
}
