import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }){
      if(user){
        token.data = user;
      }
      return token;
    },

    session({ session, token, user }) {
      console.log({session, token, user})

      session.user = token.data as any;

      return session;
    }

  },
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

            if( !parsedCredentials.success ) return null;

            const { email, password } = parsedCredentials.data;

            //Find user by email
            const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } });
            if( !user ) return null;

            //Compare passwords
            if( !bcrypt.compareSync( password, user.password ) ) return null;

            //Return user without password
            const { password: _, ...rest } = user;

            return rest;
        },
      }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth( authConfig );