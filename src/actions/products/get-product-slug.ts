'use server'

import prisma from "@/lib/prisma";


export const getProductBySlug = async(slug:string)=> {
    try {
        const product = await prisma.product.findFirst({
            include:{
                Images: true 
            },
            where:{
                slug: slug
            }
        })

        if(!product) return null;
        return {
            ...product,
            images: product.Images.map( image => image.url )
        }

    } catch (error) {
        throw new Error('Error al obtener el slug')
    }
}