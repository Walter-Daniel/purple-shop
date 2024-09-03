'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Data {
    name: string;
    email: string;
    image: string;
    password: string;
};

export const updateUserProfile = async(userId: string, data: Data) => {

    const session = await auth();

    if( session?.user.role !== 'user'){
        return {
            ok: false,
            message: 'Authentication is required.'
        }
    }

    const findId = userId === session.user.id;

    if(!findId){
        return {
            ok: false,
            message: 'You dont have permission to update user data.'
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: data.name,
                email: data.email,
                image: data.image,
                password: data.password
            }
        });
        
        return {
            ok: true,
            message: 'User update successfully.'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'User update error'
        }
    }

}