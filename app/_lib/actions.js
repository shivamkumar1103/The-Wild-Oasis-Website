"use server";

import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { supabase } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "@/app/_lib/data-service";

export async function updateGuest(formData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User is not authenticated");
  }
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const bookings = await getBookings(session.user.guestId);

  const bookingToDelete = bookings.find((booking) => booking.id === bookingId);

  if (!bookingToDelete) {
    throw new Error("Booking not found");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(bookingId, formData) {
  bookingId = +bookingId; // Convert bookingId to a number
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const bookings = await getBookings(session.user.guestId);

  const bookingToDelete = bookings.find((booking) => booking.id === bookingId);

  if (!bookingToDelete) {
    throw new Error("Booking not found");
  }

  const updatedFields = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

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
