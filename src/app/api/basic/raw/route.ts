import { NextResponse } from 'next/server';
import loader from '../../loader';
import { handleError } from '../../error';
import { handleRequest } from '../request';

export async function POST(request: Request) {
  try {
    const response = await handleRequest(request);

    if (response.error) {
      return NextResponse.json(response.error);
    }

    return NextResponse.json(response.dataset);
  } catch (error) {
    return NextResponse.json(handleError(error));
  }
}
