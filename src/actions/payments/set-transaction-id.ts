'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const setTransactionId = async(transactionId: string, orderId: string) => {
    const session = await auth();

    if(!session?.user) {
        return {
            ok: false,
            message: 'Authentication is required.'
        }
    }

    try {
        const updateOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId: transactionId
            }
        })

        if(!updateOrder){
            return {
                ok: false,
                message: `Orden not found with ID #${orderId}`
            }
        }

        return {
            ok: true,
            message: 'Transaction completed.'
        }
        
    } catch (error) {
        return {
            ok: false,
            message: 'The transaction could not be completed.'
        }
    }


}