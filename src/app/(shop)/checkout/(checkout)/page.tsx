import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className="flex flex-col w-[1000px]">
        <Title title="Check order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CHECKOUT */}
          <div className="flex flex-col mt-5">
            <span>Need to edit your products? Click here:</span>
            <Link href="/cart" className="underline mb-5">Edit cart</Link>
          
          {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* ORDER SUMMARY */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}