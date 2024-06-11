import type { Size } from '@/interfaces';
import clsx from 'clsx';
import React from 'react';

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {



  return (
    <div className='my-5'>
        <h3 className='font-bold mb-4'>Size</h3>
        <div className='flex'>
            {
                availableSizes.map( ( size, index ) => (
                    <button 
                        className={
                            clsx(
                                'mx-2 hover:underline text-kg',
                                {
                                    'underline': size === selectedSize
                                }
                            )
                        } 
                        key={index}
                    >
                        { size }
                    </button>
                ))
            }
        </div>
    </div>
  )
}
