"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "@/app/_lib/auth-client";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // Redirect to home
          router.refresh(); // Clears Next.js server component cache
        },
      },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
