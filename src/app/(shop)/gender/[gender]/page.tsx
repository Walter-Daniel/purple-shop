export const revalidate = 60;

import { getPaginatedProductWithImages } from '@/actions';
import { Pagination, ProductsGrid, Title } from '@/components';
import { Gender } from '@prisma/client';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  }
  params: {
    gender: Gender
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const gender = params.gender

  let title;
  if(gender === 'kid'){
    title = "Kid's Clothing"
  }else if( gender === 'men' ) {
    title = "Men's Clothing"
  }else {
    title = "Women's Clothing"
  }
 
  return {
    title: title
  }
}



export default async function CategoryPage({ searchParams, params }: Props ) {

  const gender = params.gender;
  if(!Object.values(Gender).includes(gender)){
    notFound();
  }
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, totalPages } = await getPaginatedProductWithImages({page, gender});

  return (
    <>
      <Title
        title={`${gender}'s Clothing`}
        subtitle={`Discover the Latest in ${gender}'s Fashion`}
        className="mb-2 capitalize"
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages}/>

    </>
  );
}