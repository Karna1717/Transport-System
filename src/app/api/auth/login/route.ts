import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { email, password } = body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json(
      { user: userWithoutPassword, token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error logging in' },
      { status: 500 }
    );
  }
} 