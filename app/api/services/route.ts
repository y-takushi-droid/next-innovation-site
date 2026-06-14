import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
};

export async function GET() {
  return NextResponse.json(readData<Service[]>('services.json'));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const services = readData<Service[]>('services.json');
  const newService = { ...body, id: Date.now().toString() };
  writeData('services.json', [...services, newService]);
  return NextResponse.json(newService, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const services = readData<Service[]>('services.json');
  const updated = services.map((s) => (s.id === body.id ? body : s));
  writeData('services.json', updated);
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const services = readData<Service[]>('services.json');
  writeData('services.json', services.filter((s) => s.id !== id));
  return NextResponse.json({ success: true });
}
