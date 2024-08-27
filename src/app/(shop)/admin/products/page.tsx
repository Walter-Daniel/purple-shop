import { getPaginatedOrders, getPaginatedProductWithImages } from '@/actions';
import { Pagination, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';

import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function ProductsPage({searchParams}:Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products , currentPage, totalPages} = await getPaginatedProductWithImages({page});

  return (
    <>
      <Title title="Products" />

      <div className='flex justify-end mb-5 '>
        <Link href="/admin/product/new" className='btn-primary'>
          Add product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full mb-5">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Sizes
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map( product => (
                <tr key={product.id} 
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/product/${product.slug}`}>
                      <Image 
                        src={`/products/${product.Images[0].url}`}
                        width={80}
                        height={80}
                        alt={product.title}
                        className='w-20 h-20 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id.split('-').at(-1)}</td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/product/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}              
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-bold px-6 ">
                    {currencyFormat(product.price)}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {product.sizes}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {product.inStock}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}