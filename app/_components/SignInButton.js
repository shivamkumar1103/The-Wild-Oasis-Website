"use client";

import { signIn } from "@/app/_lib/auth-client";

function SignInButton() {
  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <button
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      onClick={handleSignIn}
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
