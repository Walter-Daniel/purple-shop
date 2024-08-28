'use client'

import React, { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size} from '@/interfaces'
import { useCartStore } from '@/store';

interface Props {
    product: Product;
}

export const AddToCart = ({product}:Props) => {

    const addProductToCart = useCartStore( state => state.AddProductToCart );

    const [size, setsize] = useState<Size | undefined>();
    const [quantity, setquantity] = useState<number>(1);
    const [posted, setposted] = useState(false);

    const addToCart = () => {
        setposted(true);
        if(!size) return

        const cartProduct: CartProduct = {
            id: product.id,
            image: product.images[0],
            price: product.price,
            quantity: quantity,
            size: size,
            slug: product.slug,
            title: product.title
        }

        addProductToCart(cartProduct);
        setposted(false);
        setquantity(1);
        setsize(undefined);
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
