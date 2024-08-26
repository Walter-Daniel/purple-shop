'use server';

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export const registerUser = async( name:string, email:string, password:string ) => {

    try {

        const userExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(userExist){
            return { 
                ok: false,
                message: "User with this email already exist" 
            }
        }

        const user= await prisma.user.create({
            data: {
                name: name,
                email: email.toLocaleLowerCase(),
                password: bcrypt.hashSync(password)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return {
            ok: true,
            message: 'Registration successful.',
            user: user
        }
        
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }

}