import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Guest Area",
  description: "Manage your account settings and personal information",
};

export default async function Account() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Hello, {session?.user?.name || "Guest"}!
    </h2>
  );
}
