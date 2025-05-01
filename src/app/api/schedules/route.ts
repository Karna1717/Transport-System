import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Schedule from '@/lib/models/Schedule';

// GET all schedules
export async function GET() {
  try {
    await connectToDatabase();
    const schedules = await Schedule.find({})
      .populate('route')
      .populate('vehicle')
      .populate('driver', 'name email');
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new schedule
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const schedule = await Schedule.create(body);
    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 