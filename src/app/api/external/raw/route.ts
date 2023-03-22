import { NextResponse } from 'next/server';
import { handleRequest } from '../request';
import { handleError } from '../../errors';

export async function POST(request: Request) {
  try {
    const response = await handleRequest(request);

    if (response.error) {
      return NextResponse.json(response.error);
    }

    return NextResponse.json(response.dataset);
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, {
      status: err.status,
    });
  }
}
