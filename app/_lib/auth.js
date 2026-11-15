import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { getGuest, createGuest } from "@/app/_lib/data-service";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3000", process.env.BETTER_AUTH_URL].filter(
    Boolean,
  ),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      guestId: {
        type: "string",
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          try {
            let existingGuest = await getGuest(user.email);

            if (!existingGuest) {
              await createGuest({
                email: user.email,
                fullName: user.name,
              });
              // Re-fetch to guarantee we get the generated Supabase ID
              existingGuest = await getGuest(user.email);
            }

            return {
              data: {
                ...user,
                guestId: existingGuest?.id ? String(existingGuest.id) : null,
              },
            };
          } catch (error) {
            console.error("Supabase guest check failed during signIn:", error);
            throw new Error("Failed to verify guest record");
          }
        },
      },
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      let guestId = user.guestId ?? null;

      // Always ensures guest exists in Supabase & attaches guestId to session.user
      if (!guestId && user.email) {
        try {
          let guest = await getGuest(user.email);

          // Fallback: if user signed in previously before hook was added, create them now
          if (!guest) {
            await createGuest({
              email: user.email,
              fullName: user.name,
            });
            guest = await getGuest(user.email);
          }

          guestId = guest?.id ? String(guest.id) : null;
        } catch (err) {
          console.error("Error fetching guest in customSession:", err);
        }
      }

      return {
        user: {
          ...user,
          guestId,
        },
        session,
      };
    }),
    nextCookies(),
  ],
});
