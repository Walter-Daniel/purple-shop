'use server';

import prisma from "@/lib/prisma";

export const getUserById = async(id:string) => {
    try {
        const user = await prisma.user.findFirst({
          include:{
            UserImage: true
          },
           
           where:{
              id: id
            }
        });

        if(!user) return null;

        return {
            ...user,
            image: user.UserImage.map( image => image.url )
        }
    } catch (error) {
        throw new Error('Error al obtener el slug')
    }
}