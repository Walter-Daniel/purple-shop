
export default async function ProfileLayout({
 children
}: {
 children: React.ReactNode;
}) {

  return (
    <div className="flex justify-center items-center">
      <div className="sm:w-[350px] md:w-[800px]">
        {children}
      </div>
    </div>
  );
}