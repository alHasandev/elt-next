import { NextResponse } from 'next/server';
import { z } from 'zod';
import loader from '../loader';
import { handleError } from '../errors';
import { handleRequest } from './request';

export async function POST(request: Request) {
  try {
    return NextResponse.json(await handleRequest(request));
  } catch (error) {
    return NextResponse.json(handleError(error));
  }
}
