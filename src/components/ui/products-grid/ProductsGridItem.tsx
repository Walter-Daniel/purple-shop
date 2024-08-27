import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Product } from '@/interfaces'
import Link from 'next/link';

interface Props {
    product: Product;
}

export const ProductsGridItem = ( { product } : Props ) => {
  return (
    <div className='flex flex-col'>
        <div className='rounded-md  fade-in overflow-hidden min-h-[80%] shadow-sm'>
            <Link href={`/product/${product.slug}`} className=' overflow-hidden'>
                <ProductImage
                    src={ product.images[0]}
                    alt={ product.title } 
                    className='w-full object-cover rounded  transition duration-300 hover:scale-110 h-full'
                    width={500}
                    height={500}
                />
            </Link>    
        </div>
        <div className='p-4 flex flex-col'>
            <Link href={`/product/${product.slug}`} className='hover:text-purple-600'>
                {product.title}
            </Link>
            <span className='font-bold'>${ product.price }</span>
        </div>
    </div>
  )
}
