'use server';

import { auth } from "@/auth";
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Data {
    name: string;
    email: string;
    role: 'admin' | 'user';
};

export const updateUserData = async(userId: string, data: Data) => {

    const session = await auth();

    if( session?.user.role !== 'admin'){
        return {
            ok: false,
            message: 'Authentication is required.'
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
                role: data.role,
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