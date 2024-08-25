import { OrderStatus, PaypalButton, Title } from "@/components";
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { currencyFormat } from "@/utils";
import clsx from "clsx";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    redirect("/");
  }

  const address = order.OrderAddress!;
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CHECKOUT */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order.isPaid}/>
            {/* ITEMS */}
            {order.OrderItem.map((item) => (
              <div key={item.product.slug + '-' + item.size} className="flex mb-7">
                <Image
                  src={`/products/${item.product.Images[0].url}`}
                  alt={item.product.title}
                  height={100}
                  width={100}
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                  className="mr-5 rounded"
                />
                <div className="w-full">
                  <p>{item.product.title}</p>
                  <p>${item.price} x {item.quantity}</p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          {/* ORDER SUMMARY */}
          <div className={clsx({
            'bg-white rounded-xl shadow-xl p-7 h-[600px]': order.isPaid,
            'bg-white rounded-xl shadow-xl p-7 h-[665px]': !order.isPaid
          })}>
            
            <h2 className="text-xl mb-2 font-bold">Shipping Address</h2>
            <div className="mb-10">
              <p className="text-lg">{address.firstName} {address.lastName}</p>
              <p>{address.address}</p>
              <p>{address.address2}</p>
              <p>{address.city}, {address.countryId}</p>
              <p>{address.postalCode}</p>
              <p>{address.phone}</p>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-xl mb-2 font-bold">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Products</span>
              <span className="text-right">{ order.itemsInOrder === 1 ? '1 item' : `${ order.itemsInOrder } items`}</span>        
          
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>
              
              <span>Sales tax</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>
          
              <span className="text-xl mt-5">Total</span>
              <span className="text-xl mt-5 text-right">{currencyFormat(order.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {
                order.isPaid ? (
                  <OrderStatus isPaid={order.isPaid}/>
                ):(
                  <PaypalButton 
                    amount={order.total}
                    orderId={order.id}
                  />
                )
              }
              <Link
                href="/"
                className="font-semibold flex justify-end items-center gap-2 text-sm"
              >
                <IoArrowBackCircleOutline size={30} />
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
