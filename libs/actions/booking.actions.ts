"use server";

import Booking from "@/database/booking.model";
import connectDB from "../db";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (e) {
    console.error("failed to create booking", e);
    return { success: false };
  }
};
