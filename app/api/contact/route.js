import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { fullname, email, message } = body;

    // Validation
    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      fullname,
      email,
      message,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);

    return NextResponse.json(
      {
        success: true,
        count: contacts.length,
        data: contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
