import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement database connection
  const mockAgreements = [
    {
      id: 1,
      clientName: "John Smith",
      type: "Wrap Fee Agreement",
      status: "Pending Signature",
      created: "2024-01-20",
      feeAmount: "1.25%",
      isRollover: true
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      type: "Wrap Fee Agreement",
      status: "Signed",
      created: "2024-01-15",
      feeAmount: "1%",
      isRollover: false
    }
  ];

  return NextResponse.json(mockAgreements);
}

export async function POST(request) {
  try {
    const data = await request.json();
    // TODO: Validate data with Zod and save to database
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create agreement' },
      { status: 400 }
    );
  }
}