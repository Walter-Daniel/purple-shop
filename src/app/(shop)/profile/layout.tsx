
export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

  return (
    <div className="flex justify-center items-center">
      <div className="w-[350px] md:w-[800px]">
        {children}
      </div>
    </div>
  );
}