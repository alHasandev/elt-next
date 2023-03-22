import { ZodFormattedError, z } from 'zod';
import { extractResponse } from './extract';
import loader from '../loader';

export const RequestData = z.object({
  schema: z.record(z.string().min(1), z.string()),
  request: z.object({
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
    url: z.string(),
    schema: z.object({
      dataset: z.array(z.string().min(1)).nullable(),
    }),
    body: z.record(z.string().min(1), z.any()).or(z.undefined()),
    headers: z.record(z.string().min(1), z.any()).or(z.undefined()),
  }),
});

export type TRequestData = z.TypeOf<typeof RequestData>;

type HandleRequestResponse =
  | {
      error: ZodFormattedError<TRequestData>;
      schema: null;
      dataset: null;
    }
  | {
      error?: null;
      schema: TRequestData['schema'];
      dataset: Record<string, any>[];
    };

export async function handleRequest(
  request: Request
): Promise<HandleRequestResponse> {
  const req = await request.json();
  const parsed = RequestData.safeParse(req);

  if (!parsed.success)
    return {
      error: parsed.error.format(),
      schema: null,
      dataset: null,
    };

  const reqData = parsed.data;

  const loaded = await loadRequest(reqData);

  return {
    schema: reqData.schema,
    dataset: loaded,
  };
}

export async function loadRequest(reqData: TRequestData) {
  const response = await fetch(reqData.request.url, {
    method: reqData.request.method,
    body: reqData.request.body
      ? JSON.stringify(reqData.request.body)
      : undefined,
    headers: reqData.request.headers,
  }).then((res) => res.json());

  const dataset = extractResponse(response, reqData.request.schema);

  const loaded = loader(dataset, reqData.schema);

  return loaded;
}
