import { Title, Loading } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { Suspense } from "react";

export default function CartPage() {

  return (
    <Suspense fallback={<Loading />}>
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
          {/* CHECKOUT */}
          <div className="flex flex-col mt-5">
            <span>Add items</span>
            <Link href="/" className="underline mb-5">Continue Shopping</Link>
          
          {/* ITEMS */}
          <ProductsInCart />
          </div>
          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-xl mb-2">Order Summary</h2>
            <OrderSummary />
            
            <div className="mt-5 mb-2 w-full">
              <Link 
                className="flex btn-primary justify-center"
                href='/checkout/address' >Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
}