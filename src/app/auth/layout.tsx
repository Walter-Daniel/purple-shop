import { headers } from "next/headers";



export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {


  const heads = headers()
 
  const pathname = heads.get('x-url')

  console.log({pathname}, 'holaaaaaaaaaaaaaaa')
 
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[350px] pyx10">
        {children}
      </div>
    </div>
  );
}