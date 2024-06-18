export const revalidate = 604800; //7days

import { getProductBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { AddToCart } from './_components/AddToCart';

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  return {
    title: product?.title,
    description: product?.description ?? '',
    openGraph: {
      title: product?.title,
      description: product?.description ?? '',
      images: [`/products/${ product?.Images[1] }`],
    },
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug)

  if( !product ) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      
      <div className='col-span-1 md:col-span-2'>
        {/* MOBILE VERSION */}
        <ProductMobileSlideShow 
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />

        {/* DESKTOP VERSION */}
        <ProductSlideShow 
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />
      </div>
      {/* DETAIL */}
      <div className='col-span-1 px-5'>
        <StockLabel  slug={product.slug} />
        
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-4'>${product.price}</p>

      <AddToCart product={product} />

      {/* DESCRIPTION */}
      <h3 className='font-bold text-sm'>Description</h3>
      <p className='font-light'>{ product.description }</p>

      </div>
    </div>
  );
}