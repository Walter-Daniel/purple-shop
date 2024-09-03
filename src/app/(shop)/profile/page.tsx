import { auth } from "@/auth";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardProfile } from "./[id]/ui/CardProfile";

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

      <CardProfile />
    </div>
  );
}
