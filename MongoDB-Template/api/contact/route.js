import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db/mongodb';
import Contact from '@/app/lib/models/Contact';

// POST endpoint to create a new contact
export async function POST(request) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    // Create contact
    const contact = await Contact.create({ name, email, message });

    return NextResponse.json(
      { message: 'Message saved successfully', data: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save contact' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all contacts
export async function GET(request) {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { count: contacts.length, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
