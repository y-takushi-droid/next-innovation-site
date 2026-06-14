import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  active: boolean;
};

export async function GET() {
  return NextResponse.json(readData<Job[]>('jobs.json'));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const jobs = readData<Job[]>('jobs.json');
  const newJob = { ...body, id: Date.now().toString() };
  writeData('jobs.json', [...jobs, newJob]);
  return NextResponse.json(newJob, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const jobs = readData<Job[]>('jobs.json');
  writeData('jobs.json', jobs.map((j) => (j.id === body.id ? body : j)));
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const jobs = readData<Job[]>('jobs.json');
  writeData('jobs.json', jobs.filter((j) => j.id !== id));
  return NextResponse.json({ success: true });
}
