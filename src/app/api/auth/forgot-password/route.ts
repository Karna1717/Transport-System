import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    // Find user
    const user = await User.findOne({ email });
    
    // Don't reveal if user exists or not
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive password reset instructions.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = await generateToken({ 
      userId: user._id,
      purpose: 'password-reset'
    });

    // Store reset token and expiry
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Error processing password reset' },
      { status: 500 }
    );
  }
} 