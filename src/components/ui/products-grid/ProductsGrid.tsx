import { Product } from '@/interfaces';
import { ProductsGridItem } from './ProductsGridItem';

interface Props {
    products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10'>
        {
            products.map((product, index) => (
                <ProductsGridItem 
                    product={product} 
                    key={index} 
                />
            ))
        }
    </div>
  )
}
