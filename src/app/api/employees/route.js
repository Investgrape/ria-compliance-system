import { NextResponse } from 'next/server';

export async function GET() {
  const mockEmployees = [
    {
      id: 1,
      name: 'Jane Cooper',
      role: 'Investment Advisor',
      email: 'jane.cooper@example.com',
      phone: '(555) 123-4567',
      startDate: '2023-01-15',
      licenses: ['Series 7', 'Series 66'],
      certifications: ['CFP'],
      complianceStatus: 'Compliant',
      alerts: []
    },
    {
      id: 2,
      name: 'Robert Fox',
      role: 'Senior Advisor',
      email: 'robert.fox@example.com',
      phone: '(555) 234-5678',
      startDate: '2022-06-01',
      licenses: ['Series 7', 'Series 66', 'Series 24'],
      certifications: ['CFA'],
      complianceStatus: 'Review Required',
      alerts: ['CE Credits Due', 'License Renewal Required']
    }
  ];

  return NextResponse.json(mockEmployees);
}

export async function POST(request) {
  try {
    const data = await request.json();
    // TODO: Implement employee creation logic
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create employee record' },
      { status: 400 }
    );
  }
}