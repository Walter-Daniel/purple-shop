import { ProductsGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
  params: {
      id: string;
  }
}

const products = initialData.products;

export default function CategoryPage({ params }: Props ) {
  const {id} = params;

  // if(id === 'kids'){
  //   notFound();
  // }

  const productsByCategory = products.filter(product => product.gender === id);

  return (
    <>
      <Title
        title={`${id}'s Clothing`}
        subtitle={`Discover the Latest in ${id}'s Fashion`}
        className="mb-2 capitalize"
      />
      <ProductsGrid products={productsByCategory} />
    </>
  );
}