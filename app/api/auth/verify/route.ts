import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'educore-super-secret-key-2026'
    );

    return NextResponse.json({ 
      authenticated: true,
      user: decoded 
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}
