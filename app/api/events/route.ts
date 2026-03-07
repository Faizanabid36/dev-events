import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/libs/db";
import Event, { IEvent } from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    let event: IEvent = {} as IEvent;

    await connectDB();

    const formData = await req.formData();

    event = Object.fromEntries(formData.entries()) as unknown as IEvent;

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 },
      );
    }

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
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

export async function GET() {
  try {
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
