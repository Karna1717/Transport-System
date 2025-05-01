import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { verifyAuth } from '@/lib/auth';

// Generate a random tracking number
function generateTrackingNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Calculate estimated delivery date based on package type
function calculateEstimatedDeliveryDate(packageType: string) {
  const today = new Date();
  let daysToAdd = 3; // Default for standard delivery
  
  switch (packageType) {
    case 'express':
      daysToAdd = 1;
      break;
    case 'fragile':
      daysToAdd = 4;
      break;
    case 'large':
      daysToAdd = 5;
      break;
    default:
      daysToAdd = 3;
  }
  
  const estimatedDate = new Date(today);
  estimatedDate.setDate(today.getDate() + daysToAdd);
  return estimatedDate;
}

// Calculate price based on package type and weight
function calculatePrice(packageType: string, weight: number) {
  let basePrice = 10;
  
  switch (packageType) {
    case 'express':
      basePrice = 25;
      break;
    case 'fragile':
      basePrice = 20;
      break;
    case 'large':
      basePrice = 15;
      break;
    default:
      basePrice = 10;
  }
  
  // Add weight factor (higher weight = higher price)
  const weightFactor = weight * 2;
  
  return basePrice + weightFactor;
}

// GET all bookings for the authenticated user
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Get token from authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = await verifyAuth(token);
    
    // Find all bookings for the user
    const bookings = await Booking.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST a new booking
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    // Get token from authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = await verifyAuth(token);
    
    // Get request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.pickupAddress || !body.deliveryAddress || !body.packageWeight || !body.packageDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate price and estimated delivery date
    const price = calculatePrice(body.packageType || 'standard', parseFloat(body.packageWeight));
    const estimatedDeliveryDate = calculateEstimatedDeliveryDate(body.packageType || 'standard');
    
    // Parse addresses into required format
    const parseAddress = (address: string) => {
      const [street, city, state, zipCode, country] = address.split(',').map(part => part.trim());
      return {
        street: street || '',
        city: city || '',
        state: state || '',
        zipCode: zipCode || '',
        country: country || 'USA'
      };
    };
    
    // Create new booking
    const booking = new Booking({
      customer: decoded.userId,
      pickupAddress: parseAddress(body.pickupAddress),
      deliveryAddress: parseAddress(body.deliveryAddress),
      packageType: body.packageType || 'standard',
      weight: parseFloat(body.packageWeight),
      packageDescription: body.packageDescription,
      specialInstructions: body.specialInstructions || '',
      trackingNumber: generateTrackingNumber(),
      estimatedDeliveryDate,
      price
    });
    
    // Save booking
    await booking.save();
    
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 