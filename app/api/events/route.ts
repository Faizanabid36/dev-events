import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/libs/db";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const eventData = Object.fromEntries(formData.entries());

    const createdEvent = await Event.create(eventData);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Event created successfully",
        event: createdEvent,
      }),
      { status: 201 },
    );
  } catch (e) {
    console.error("Error creating event:", e);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to create event" }),
      { status: 500 },
    );
  }
}
