'use server';

import prisma from "@/lib/prisma";

export const getUserById = async(id:string) => {
    try {
        const user = await prisma.user.findFirst({  
           where:{
              id: id
            }
        });

        if(!user) return null;

        return user;
    } catch (error) {
        throw new Error('Error al obtener el slug')
    }
}