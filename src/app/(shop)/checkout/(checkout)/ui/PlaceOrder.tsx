"use client";

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { currencyFormat } from '@/utils';
import { useAddressStore, useCartStore } from '@/store';

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    
    const address = useAddressStore( state => state.address );

    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore(state => state.cart)

    useEffect(() => {
        setLoaded(true)
    }, []);

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        // await sleep(2);
        
        const productsToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }));
        
        console.log({address, productsToOrder})
        setIsPlacingOrder(false)
    }
    
    if(!loaded){
        return <p>Cargando...</p>
    }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-xl mb-2 font-bold">Shipping Address</h2>
      <div className="mb-10">
        <p className="text-lg">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.phone}</p>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-0.5 bg-gray-200 mb-10" />

      <h2 className="text-xl mb-2 font-bold">Order Summary</h2>

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

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            By confirming your order, you agree to our{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>
            .
          </span>
        </p>

        {/* <p className='text-red-500'>Error creación</p> */}

        <button 
            className={
                clsx({
                    'btn-primary': !isPlacingOrder,
                    'btn-disabled': isPlacingOrder
                })
            }
            onClick={ onPlaceOrder } 
            // href="/orders/123"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};
