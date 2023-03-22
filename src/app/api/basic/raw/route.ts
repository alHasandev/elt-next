import { NextResponse } from 'next/server';
import loader from '../loader';
import { RequestData } from '../route';

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const parsed = RequestData.safeParse(res);

    if (!parsed.success) return NextResponse.json(parsed.error.format());

    const reqData = parsed.data;

    const dataset = loader(reqData.dataset, reqData.schema);
    return NextResponse.json(dataset);
  } catch (error) {
    const err = error as Error;

    if (err.name === 'SyntaxError') {
      return NextResponse.json(
        {
          error: {
            code: 422,
            name: 'UnprocessableContent',
            messsage: 'Your request data is invalid',
          },
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(
      {
        error: {
          code: 500,
          name: err.name,
          messsage: err.message,
          cause: err.cause,
        },
      },
      {
        status: 500,
      }
    );
  }
}
