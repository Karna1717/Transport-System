import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Route from '@/lib/models/Route';

// GET all routes
export async function GET() {
  try {
    await connectToDatabase();
    const routes = await Route.find({});
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new route
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const route = await Route.create(body);
    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 