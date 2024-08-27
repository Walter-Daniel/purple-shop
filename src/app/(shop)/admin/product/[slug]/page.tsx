import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductPage({params}:Props) {
    const { slug } = params;
    const product =  await getProductBySlug(slug);
    if(!product && slug !=='new'){
        redirect('/admin/products')
    };
    const {categories, ok} = await getCategories();
    if(!ok || !categories){
     throw new Error('Category Error');
    }
    const title = (slug === 'new') ? 'New product' : 'Update product';

  return (
    <>
      <Title title={title}/>
      <ProductForm product={product ?? {}} categories={categories}/>
    </>
  );
}