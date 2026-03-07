"use server";

import Booking from "@/database/booking.model";
import connectDB from "../db";
import { createBookingSchema } from "../validation/booking.schema";

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

    // Validate input
    const parsed = createBookingSchema.safeParse({ eventId, slug, email });
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    await Booking.create(parsed.data);

    return { success: true };
  } catch (e) {
    console.error("failed to create booking", e);

    // Handle duplicate booking error
    if (e instanceof Error && e.message.includes("uniq_event_email")) {
      return {
        success: false,
        message: "You have already booked this event",
      };
    }

    // Handle event not found error
    if (e instanceof Error && e.message.includes("does not exist")) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    return { success: false, message: "Failed to create booking" };
  }
};
