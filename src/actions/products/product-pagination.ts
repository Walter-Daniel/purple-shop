'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginatioOption {
    page?: number;
    take?: number;
    gender?: Gender;
}


export const getPaginatedProductWithImages = async({ 
    page = 1,
    take = 12,
    gender
 }:PaginatioOption) => {

    if( isNaN( Number(page) ) ) page = 1;
    if ( page < 1 ) page = 1;

    try {
        const products = await prisma.product.findMany({
            include: {
                Images: {
                    take: 2,
                    select:{
                        url: true
                    }
                }
            },
            take: take,
            skip: ( page - 1 ) * take,

            //find by gender
            where: {
                gender: gender
            }
        })

        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        });
        const totalPages = Math.ceil( totalCount / take )

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.Images.map( image => image.url )
            }))
        };
    } catch (error) {
        throw new Error('error al cargar')
    }

}