'use server';

import prisma from "@/lib/prisma";

export const getCategories = async() => {
    try {
        const categories = await prisma.category.findMany()
        return {
            ok: true,
            message: 'Fetch categories successfully',
            categories: categories
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo obtener categorías.'
        }
    }
}