'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );



const userSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(255),
    email: z.string().email(),
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

        revalidatePath(`/profile/${id}`);
        revalidatePath(`/profile`);
        revalidatePath(`/`);


        const imageFile = formData.get('image') as File;

        if (imageFile) {
          const image = await uploadImage(imageFile);
          if (!image) {
            throw new Error('Failed to load the image');
          }
          await prisma.userImage.create({
              data: {
                  url: image,
                  userId: id
              }
          })
        }


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

const uploadImage = async (image: File) => {
    try {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');
      
      const uploadedImage = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
      return uploadedImage.secure_url;
    } catch (error) {
      return null;
    }
  };
  