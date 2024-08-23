'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderById = async(orderId: string) => {

    const session = await auth();

    if(!session){
        return {
            ok: false,
            message: 'Authentication is required.'
        }
    }

    try {
        const getOrder = await prisma.order.findFirst({
            where:{id: orderId},
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,

                                Images: {
                                    select:{
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if(!getOrder) throw `${orderId} not found`;

        if(session.user.role === 'user'){
            if( session.user.id !== getOrder.userId ){
                throw `User does not correspond to the order: ${orderId}.`
            }
        }
    
        return {
            ok: true,
            order: getOrder,
        }
        
    } catch (error) {

        return {
            ok: false,
            message: 'Order not found'
        }
        
    }

    

    




}