import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

export default function Home() {

  const products = initialData.products;

  return (
    <>
      <Title
        title="Shop"
        subtitle="All products"
        className="mb-2"
      />

      <ProductsGrid
        products={products}
      />
    </>
  );
}
