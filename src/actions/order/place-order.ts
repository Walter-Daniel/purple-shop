'use server';

import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size:Size;
}

export const placeOrder = async( productIds: ProductToOrder[], addres: Address ) => {

    const session = await auth();
    const userId = session?.user.id;

    //user verification
    if(!userId){
        return {
            ok: false,
            message: 'Not found user'
        }
    }

    //find id products in productIds
    const products = await prisma.product.findMany({
        where:{
            id: {
                in: productIds.map( item => item.productId )
            }
        }
    });

    //Calculate the amounts

    const itemsInOrder = productIds.reduce((count , p)=> count + p.quantity, 0);

    //Calculate tax, subtotal and total
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId )

        if(!product) throw new Error(`${item.productId} not found - 500`);
        
        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, {subTotal: 0, tax: 0, total: 0});

    //Create a transaction in the db

    try {
        const prismaTx = await prisma.$transaction( async(tx) => {

            //1. Stock products update
            const updatedProductsPromises = products.map((product) => {
    
                //Accumulate values
                const productQuantity = productIds.filter(p => p.productId == product.id).reduce(( acc, item ) => item.quantity + acc, 0)
    
                if( productQuantity === 0 ){
                    throw new Error(`${product.id} does not have a defined quantity.`)
                }
    
                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });
    
            const updatedProducts = await Promise.all(updatedProductsPromises);
    
            //Verify that the inStock quantity didn't go below zero
            updatedProducts.forEach( product => {
                if(product.inStock < 0){
                    throw new Error(`${ product.title } is out of Stock`);
                }
            });
    
            //2. Create Order - header - Detail
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
    
                    OrderItem: {
                        createMany:{
                            data: productIds.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });
    
            //3. Verify that the orders's price is greater than zero
            // throw new Error('hola')
    
            //4. Create Order Address
            const{country, ...restAddress} = addres;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            })
    
            return{
                order: order,
                updateProducts: updatedProducts,
                orderAddress: orderAddress
            }
    
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }
    } catch (error:any) {
        return {
            ok: false,
            message: error?.message,
        }
    }

}