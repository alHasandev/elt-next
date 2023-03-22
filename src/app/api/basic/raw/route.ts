import { NextResponse } from 'next/server';
import loader from '../loader';
import { RequestData } from '../route';

export async function POST(request: Request) {
  const res = await request.json();
  const parsed = RequestData.safeParse(res);

  if (!parsed.success) return NextResponse.json(parsed.error.format());

  const reqData = parsed.data;

  const dataset = loader(reqData.dataset, reqData.schema);
  return NextResponse.json(dataset);
}
