import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
        {/* LOGO */}
        <div>
            <Link href='/'>
                <span className={`${titleFont.className} antialiased font-bold`}>Purple</span>
                <span>| Shop</span>
            </Link>
        </div>
        {/* Center Menu */}
        <div className=''></div>
    </nav>
  )
}
