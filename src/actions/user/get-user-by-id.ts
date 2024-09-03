'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getUserById = async(id:string) => {
    const session = await auth();

    if( session?.user.id !== id){
        return {
            ok: false,
            message: 'Authentication is required.'
        }
    }

    try {
        const user = await prisma.user.findFirst({
           where:{
                id: id
           }
        });

        if(!user){
            throw new Error('User not found')
        }
    
        return {
            ok: true,
            user: user
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error fetching user.'
        }
    }
}