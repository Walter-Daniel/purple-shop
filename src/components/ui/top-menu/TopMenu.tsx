'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useCartStore, userUiStore } from '@/store';
import { titleFont } from '@/config/fonts';

export const TopMenu = () => {
  const isSideMenuOpen = userUiStore( state => state.OpenSideMenu );
  const getTotalItems = useCartStore( state => state.getTotalItems() );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])
  
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
        <div className='hidden sm:block'>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/men'>Men</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/women'>Women</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/kid'>Kids</Link>
        </div>

        {/* End menu */}
        <div className='flex items-center'>
          <Link href='/search' className='mx-2'>
              <IoSearchOutline className='w-5 h-5'/>
          </Link>
          <Link href={
            ((getTotalItems === 0) && loaded) 
            ? '/empty'
            : '/cart'
          } className='mx-2'>
            <div className='relative'>
                {( loaded && getTotalItems > 0 ) &&(
                  <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-purple-700 text-white'>
                    {getTotalItems}
                  </span>
                )}
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
