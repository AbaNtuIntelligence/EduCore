import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Log what we received
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Received username:', username);
    console.log('Received password:', password);

    // Get credentials from environment
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'educore2026';
    const JWT_SECRET = process.env.JWT_SECRET || 'educore-super-secret-key-2026';

    // Log what we're comparing against
    console.log('Expected username from env:', ADMIN_USERNAME);
    console.log('Expected password from env:', ADMIN_PASSWORD);
    console.log('Environment variables loaded:', {
      ADMIN_USERNAME: process.env.ADMIN_USERNAME ? '✅ Yes' : '❌ No',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '✅ Yes' : '❌ No',
      JWT_SECRET: process.env.JWT_SECRET ? '✅ Yes' : '❌ No',
    });

    // Check credentials
    if (username !== ADMIN_USERNAME) {
      console.log('❌ Username mismatch');
      console.log(`Expected "${ADMIN_USERNAME}", got "${username}"`);
      return NextResponse.json(
        { error: `Invalid username or password` },
        { status: 401 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      console.log('❌ Password mismatch');
      return NextResponse.json(
        { error: `Invalid username or password` },
        { status: 401 }
      );
    }

    console.log('✅ Login successful!');

    // Create JWT token
    const token = jwt.sign(
      { 
        username: ADMIN_USERNAME,
        role: 'admin',
        timestamp: Date.now()
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful'
    });

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Login failed: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
