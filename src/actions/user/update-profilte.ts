'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255),
    email: z.string().email(),
    image: z.string().optional()
  });


export const updateUserProfile = async(formData:FormData) => {

    const data = Object.fromEntries( formData );
    const userParsed = userSchema.safeParse( data );

    if ( !userParsed.success) {
        return {
          ok: false,
          message: 'Failed to update profile.'
         }
      }

    const user = userParsed.data;
    const { id, ...rest } = user;

    const session = await auth();

    if( session?.user.role !== 'user'){
        return {
            ok: false,
            message: 'Authentication is required.'
        }
    }

    const findId = id === session.user.id;
    
    console.log({findId})

    if(!findId){
        return {
            ok: false,
            message: 'You dont have permission to update user data.'
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...rest
            }
        });
        revalidatePath('/profile');
        return {
            ok: true,
            user: user,
            message: 'User update successfully.'
        }
    } catch (error) {
        console.log({error})
        return {
            ok: false,
            message: 'User update error'
        }
    }

}