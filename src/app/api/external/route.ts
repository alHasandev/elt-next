import { NextResponse } from 'next/server';
import { handleRequest } from './request';
import { handleError } from '../error';

export async function POST(request: Request) {
  try {
    const response = await handleRequest(request);

    return NextResponse.json(response);
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, {
      status: err.status,
    });
  }
}
