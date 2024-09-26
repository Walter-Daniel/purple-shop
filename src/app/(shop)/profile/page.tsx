import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import Image from "next/image";
import { UpdateProfileForm } from "./ui/FormUpdateProfile";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnToperfil');
    redirect("/");
  }
  const { user } = session;
  console.log(user)
  return (
    <div className="min-h-screen">
      <Title title="Profile" />

      <div className="grid grid-cols-2 gap-x-4">
        <div className="border rounded-md shadow-md p-2 flex flex-col items-center gap-y-4">
          <Image 
            src={(user.image === null  || !user.image )? "/images/user.webp" : user.image! }
            alt="user image"
            width={300}
            height={300}
            className="h-auto w-auto object-cover"
          />
          <div>
            <p>Hello {user.name}!</p>
            <p className="text-gray-500">email: {user.email}</p>
          </div>
        </div>

        <UpdateProfileForm user={user}/>
      </div>
    </div>
  );
}
