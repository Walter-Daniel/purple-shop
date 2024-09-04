import { Title } from "@/components";
import { ProfileForm } from "./ui/ProfileForm";
import { getUserById } from "@/actions";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "./ui/ChangePasswordForm";

interface ParamsProps {
  params: {
    id: string
  }
}

export default async function UpdateProfilePage({params}:ParamsProps) {

  const user = await getUserById(params.id);

  if(!user){
    redirect('/profile')
  }

  return (

    <div className="flex flex-col min-h-screen sm:pt-32 md:pt-12 fade-in">
      <Title title="Update profile" />
      <div className="grid md:grid-cols-2 gap-10">
        <ProfileForm user={user ?? {}}/>
        <ChangePasswordForm />
      </div>
    </div>
  );
}