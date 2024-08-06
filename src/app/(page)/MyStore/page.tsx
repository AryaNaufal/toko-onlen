import { auth } from "@clerk/nextjs/server";
import AuthPage from "@/src/components/Fragments/UserStore";

export default function MyShop() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return null;

  return (
    <div>
      <AuthPage userId={userId} />
    </div>
  );
}
