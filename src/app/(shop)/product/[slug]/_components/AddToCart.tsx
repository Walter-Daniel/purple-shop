'use client'

import React, { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size} from '@/interfaces'

interface Props {
    product: Product;
}

export const AddToCart = ({product}:Props) => {

    const [size, setsize] = useState<Size | undefined>();
    const [quantity, setquantity] = useState<number>(1);
    const [posted, setposted] = useState(false)

    const addToCart = () => {
        setposted(true);
        if(!size) return
        console.log({size, quantity})
    }

  return (
    <>
        {
            posted && !size && (
                <span className='mt-2 text-red-600 text-sm fade-in'>
                    Please select a size*
                </span>
            )
        }

        {/* SIZE SELECTOR */}
        <SizeSelector 
        availableSizes={product.sizes} 
        selectedSize={size}
        onSizeChange={ setsize } 
        />
        {/* AMOUNT SELECTOR */}
        <QuantitySelector 
          quantity={quantity}
          onQuantityChange={ setquantity }
        />
        {/* BUTTON */}
        <button 
            onClick={addToCart}
            className='btn-primary my-5'
        >
            Add to cart
        </button>
    </>
  )
}
