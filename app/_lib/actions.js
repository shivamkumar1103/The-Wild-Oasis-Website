"use server";

import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export async function signInAction() {
  const res = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
  });

  if (res.url) {
    redirect(res.url); // Sends the user to Google's OAuth consent screen
  }
}
