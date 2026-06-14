import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

type Work = {
  id: string;
  category: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  date: string;
};

export async function GET() {
  return NextResponse.json(readData<Work[]>('works.json'));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const works = readData<Work[]>('works.json');
  const newWork = { ...body, id: Date.now().toString() };
  writeData('works.json', [newWork, ...works]);
  return NextResponse.json(newWork, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const works = readData<Work[]>('works.json');
  writeData('works.json', works.map((w) => (w.id === body.id ? body : w)));
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const works = readData<Work[]>('works.json');
  writeData('works.json', works.filter((w) => w.id !== id));
  return NextResponse.json({ success: true });
}
