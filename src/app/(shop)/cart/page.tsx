import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function CartPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CHECKOUT */}
          <div className="flex flex-col mt-5">
            <span>Add items</span>
            <Link href="/" className="underline mb-5">Buy</Link>
          
          {/* ITEMS */}
          {
            productsInCart.map(product => (
              <div key={product.slug} className="flex mb-7">
                <Image 
                  src={`/products/${ product.images[0] }`}
                  alt={product.title}
                  height={ 100 }
                  width={ 100 }
                  style={{
                    height: '100px',
                    width: '100px'
                  }}
                  className="mr-5 rounded"
                />
                <div className="w-full">
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <div className="flex justify-between mt-1">
                    <QuantitySelector quantity={2}/>
                    <button className="underline">Remove</button>

                  </div>
                </div>
              </div>
            ))
          }
          </div>
          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Products</span>
              <span className="text-right">3 items</span>        
          
              <span>Subtotal</span>
              <span className="text-right">$100</span>
               
              <span>Sales tax</span>
              <span className="text-right">$100</span>
           
              <span className="text-xl mt-5">Total</span>
              <span className="text-xl mt-5 text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link 
                className="flex btn-primary justify-center"
                href='/checkout/address' >Checkout</Link>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}