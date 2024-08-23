"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <h2>loading...</h2>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-7">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            height={100}
            width={100}
            style={{
              height: "100px",
              width: "100px",
            }}
            className="mr-5 rounded"
          />
          <div className="w-full">
            <span>
              <p>
                {product.title} - {product.size} ({ product.quantity })
              </p>
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
           
          </div>
        </div>
      ))}
    </>
  );
};
