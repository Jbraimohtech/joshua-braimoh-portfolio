import { NextRequest, NextResponse } from "next/server";

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_EVENT_TYPE_SLUG =
  process.env.CAL_EVENT_TYPE_SLUG ||
  process.env.CAL_EVENT_TYPE_ID ||
  "30minutes";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const timeZone = searchParams.get("timeZone") || "Africa/Lagos";
    const eventTypeSlug =
      searchParams.get("eventTypeSlug") || CAL_EVENT_TYPE_SLUG;

    if (!start || !end) {
      return NextResponse.json(
        { error: "start and end dates are required" },
        { status: 400 },
      );
    }

    if (!CAL_API_KEY) {
      return NextResponse.json(
        { error: "CAL_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const params = new URLSearchParams({
      username: "joshua-braimoh-i9rrqw",
      eventTypeSlug,
      start,
      end,
      timeZone,
    });

    const response = await fetch(
      `https://api.cal.com/v2/slots?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${CAL_API_KEY}`,
          "cal-api-version": "2024-09-04",
        },
        next: { revalidate: 60 },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cal.com slots error:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Failed to fetch slots" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Slots error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
