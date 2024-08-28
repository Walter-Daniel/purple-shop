'use client';

import { useEffect, useState } from 'react';
import { titleFont } from '@/config/fonts';
import { getStockBySlug } from '@/actions';

interface Props {
    slug: string
}

export const StockLabel = ({slug}:Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getStock = async() => {
            const stock = await getStockBySlug(slug);
            setStock(stock);
            setIsLoading(false)
        }

        getStock()
    }, [slug])

    

  return (
    <>
        {
            isLoading ? (
                <h1 className="w-32 h-7 rounded-lg bg-gray-300 animate-pulse"></h1>

            ) :(
                <span className={`${titleFont.className} antialiased font-bold text-lg`}>
                    Stock: {stock}
                </span>
            )
        }
    </>
  )
}
