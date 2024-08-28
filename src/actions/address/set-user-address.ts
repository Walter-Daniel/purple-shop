'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async(address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress( address, userId )

        return {
            ok: true,
            address: newAddress
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Failed to save the address'
        }
    }

}

const createOrReplaceAddress = async(address: Address, userId: string) => {

    try {
         
        const storeAddress = await prisma.userAddress.findFirst({
            where:{ userId }
        });

        const addressToSave = {
            userId: userId,
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            phone: address.phone,
            postalCode: address.postalCode
        }

        if(!storeAddress){
            const newStoreAddress = await prisma.userAddress.create({
                data: addressToSave
            });
            return newStoreAddress;
        }

        const updateAddress = await prisma.userAddress.update({
            where:{userId},
            data: addressToSave
        })

        return updateAddress;

    } catch (error) {
        throw new Error('Failed to save the address')
    }

} 