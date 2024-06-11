'use client'

import { titleFont } from '@/config/fonts'
import { userUiStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
  const isSideMenuOpen = userUiStore( state => state.OpenSideMenu );
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
        {/* LOGO */}
        <div>
            <Link href='/'>
                <span className={`${titleFont.className} antialiased font-bold`}>Purple </span>
                <span>| Shop</span>
            </Link>
        </div>
        {/* Center Menu */}
        <div className='hiden sm:block'>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/men'>Men</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/women'>Women</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/kid'>Kids</Link>
        </div>

        {/* End menu */}
        <div className='flex items-center'>
          <Link href='/search' className='mx-2'>
              <IoSearchOutline className='w-5 h-5'/>
          </Link>
          <Link href='/cart' className='mx-2'>
            <div className='relative'>
              <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-purple-700 text-white'>
                3
              </span>
              <IoCartOutline className='w-5 h-5'/>
            </div>
          </Link>
          <button
            className='m-2 p-2 transition-all hover:bg-gray-100' 
            onClick={isSideMenuOpen}
            >
              Menu
          </button>
        </div>
    </nav>
  )
}
