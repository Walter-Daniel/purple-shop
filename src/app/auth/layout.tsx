
export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-full sm:w-[350px]">
        {children}
      </div>
    </div>
  );
}