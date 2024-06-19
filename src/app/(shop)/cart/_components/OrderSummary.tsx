'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

export const OrderSummary = () => {
    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())

    useEffect(() => {
      setLoaded(true);
    }, [])

    useEffect(() => {
        if ( itemsInCart === 0 && loaded === true )   {
        router.replace('/empty')
        }
    },[ itemsInCart, loaded ])
    
    if(!loaded) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-2">
        <span>Products</span>
        <span className="text-right">{ itemsInCart === 1 ? '1 item' : `${ itemsInCart } items`}</span>        
    
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        
        <span>Sales tax</span>
        <span className="text-right">{currencyFormat(tax)}</span>
    
        <span className="text-xl mt-5">Total</span>
        <span className="text-xl mt-5 text-right">{currencyFormat(total)}</span>
    </div>
  )
}
