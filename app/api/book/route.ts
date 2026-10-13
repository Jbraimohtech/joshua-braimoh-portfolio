import { NextRequest, NextResponse } from "next/server";

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_EVENT_TYPE_SLUG =
  process.env.CAL_EVENT_TYPE_SLUG ||
  process.env.CAL_EVENT_TYPE_ID ||
  "30minutes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, notes, start, timeZone = "Africa/Lagos" } = body;

    if (!name || !email || !start) {
      return NextResponse.json(
        { error: "Name, email and start time are required" },
        { status: 400 },
      );
    }

    if (!CAL_API_KEY) {
      return NextResponse.json(
        { error: "CAL_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CAL_API_KEY}`,
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify({
        username: "joshua-braimoh-i9rrqw",
        eventTypeSlug: CAL_EVENT_TYPE_SLUG,
        start,
        attendee: {
          name,
          email,
          timeZone,
          language: "en",
        },
        bookingFieldsResponses: {
          notes: notes || "",
        },
        metadata: {
          source: "portfolio-website",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cal.com error:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Failed to create booking" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, booking: data.data });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
