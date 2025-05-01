import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Vehicle from '@/lib/models/Vehicle';

// GET all vehicles
export async function GET() {
  try {
    await connectToDatabase();
    const vehicles = await Vehicle.find({}).populate('driver', 'name email');
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new vehicle
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const vehicle = await Vehicle.create(body);
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 