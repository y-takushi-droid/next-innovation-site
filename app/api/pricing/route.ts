import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

type Plan = {
  id: string;
  service: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  recommended: boolean;
};

export async function GET() {
  return NextResponse.json(await readData<Plan[]>('pricing.json'));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const plans = await readData<Plan[]>('pricing.json');
  const newPlan = { ...body, id: Date.now().toString() };
  await writeData('pricing.json', [...plans, newPlan]);
  return NextResponse.json(newPlan, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const plans = await readData<Plan[]>('pricing.json');
  await writeData('pricing.json', plans.map((p) => (p.id === body.id ? body : p)));
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const plans = await readData<Plan[]>('pricing.json');
  await writeData('pricing.json', plans.filter((p) => p.id !== id));
  return NextResponse.json({ success: true });
}
