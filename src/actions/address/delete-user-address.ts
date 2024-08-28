'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async(userId: string) => {
    try {

        const deleteAddress = await prisma.userAddress.delete({
            where:{userId}
        })

        return {
            ok: true,
            message: 'Address deleted successfully.'
        }
        
    } catch (error) {
        return {
            ok: false,
            message: 'Error deleting address'
        }
    }
}