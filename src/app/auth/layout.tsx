import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
 
  const session = await auth();

  if( session?.user ) {
    redirect('/');
  }

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[350px] pyx10">
        {children}
      </div>
    </div>
  );
}