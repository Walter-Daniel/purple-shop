'use client'

import Image from 'next/image';
import { useCartStore } from '@/store';
import { Pagination, QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPaginatedProductInCart } from '@/actions';
import { useSearchParams } from 'next/navigation'


export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

    
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        const page = searchParams.get('page');
        if (page) {
            setPage(Number(page));
        }
    }, [searchParams]);
    
    const { currentPage, products, totalPages } = getPaginatedProductInCart({productsInCart, page });

    useEffect(() => {
        setLoaded(true)
    }, [])
    
    if(!loaded){
        return <h2>loading...</h2>
    }

    return (
        <>
            {
                products.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-7">
                        <Image
                            src={`/products/${product.image}`}
                            alt={product.title}
                            height={100}
                            width={100}
                            style={{
                                height: '100px',
                                width: '100px'
                            }}
                            className="mr-5 rounded"
                        />
                        <div className="w-full">
                            <Link 
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}
                            >
                                <p>{product.title} - {product.size}</p>
                            </Link>
                            <p>${product.price}</p>
                            <div className="flex justify-between mt-5 items-center">
                                <QuantitySelector
                                    quantity={ product.quantity }
                                    onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
                                />
                                <button 
                                    onClick={() => removeProduct(product)}
                                    className="underline">Remove</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Pagination totalPages={totalPages}/>

        </>
    )
}
