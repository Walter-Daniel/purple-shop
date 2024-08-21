import NextAuth from 'next-auth';
import { authConfig } from './auth';
 
export default NextAuth(authConfig).auth;

export const config = {
  //https://clerk.com/docs/references/nextjs/auth-middleware#usage
  matcher: '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
}