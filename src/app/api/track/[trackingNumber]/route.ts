import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";

export async function GET(
  request: Request,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    await connectToDatabase();

    const booking = await Booking.findOne({ trackingNumber: params.trackingNumber })
      .select("-__v")
      .lean();

    if (!booking) {
      return NextResponse.json(
        { message: "No booking found with this tracking number" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching tracking information:", error);
    return NextResponse.json(
      { message: "Failed to fetch tracking information" },
      { status: 500 }
    );
  }
} 