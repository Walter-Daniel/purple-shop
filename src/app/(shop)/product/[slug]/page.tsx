import { QuantitySelector, SizeSelector } from '@/components';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  }
}
export default function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = initialData.products.find( product => product.slug === slug );

  if( !product ) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      
      <div className='col-span-1 md:col-span-2 bg-red-600'>
        hola
      </div>
      {/* DETAIL */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-4'>${product.price}</p>
      {/* SIZE SELECTOR */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />
      {/* AMOUNT SELECTOR */}
        <QuantitySelector 
          quantity={2}
        />

      {/* BUTTON */}
      <button className='btn-primary my-5'>
        Add to cart
      </button>

      {/* DESCRIPTION */}
      <h3 className='font-bold text-sm'>Description</h3>
      <p className='font-light'>{ product.description }</p>

      </div>
    </div>
  );
}