import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/libs/db";
import Event from "@/database/event.model";
import { createEventSchema } from "@/libs/validation/event.schema";
import { createRequestsMinuteLimiter } from "@/libs/rate-limit";

const limiter = createRequestsMinuteLimiter(2);

export async function POST(req: NextRequest) {
  try {
    const { isLimited, response } = limiter.check(req);
    if (isLimited) {
      return response!;
    }
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 },
      );
    }

    // Parse JSON array fields sent as strings
    let tags: unknown, agenda: unknown;
    try {
      tags = JSON.parse(formData.get("tags") as string);
      agenda = JSON.parse(formData.get("agenda") as string);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid tags or agenda format" },
        { status: 400 },
      );
    }

    // Validate all text fields against the schema
    const parsed = createEventSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      organizer: formData.get("organizer"),
      audience: formData.get("audience"),
      tags,
      agenda,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "DevEvent" },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result as { secure_url: string });
            },
          )
          .end(buffer);
      },
    );

    const createdEvent = await Event.create({
      ...parsed.data,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("Error creating event:", e);
    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const isRateLimited = limiter.check(req);
    if (isRateLimited.isLimited) {
      console.log({ isRateLimited });
      return isRateLimited.response!;
    }
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Event fetching failed", error: e },
      { status: 500 },
    );
  }
}
