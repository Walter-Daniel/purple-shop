'use server';

import { auth } from "@/auth";
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserData = async(userId: string, data: User) => {

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
                password: data.password
            }
        });

        // revalidatePath('/admin/users');
        // revalidatePath('http://localhost:3000/admin/users?show=true');
        
        return {
            ok: true,
            message: 'User update successfully.'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'User update error'
        }
    }

}