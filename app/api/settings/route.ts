import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

type Settings = {
  instagram: string;
  twitter: string;
  facebook: string;
  line: string;
};

export async function GET() {
  return NextResponse.json(readData<Settings>('settings.json'));
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  writeData('settings.json', body);
  return NextResponse.json(body);
}
