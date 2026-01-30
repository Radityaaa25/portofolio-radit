import { getProfile } from "@/actions/profile";
import ProfileForm from "./ProfileForm";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Profile & SEO</h1>
      </div>
      
      {/* Panggil Client Component yang ada Toast-nya */}
      <ProfileForm initialData={profile} />
    </div>
  );
}