import { z } from 'zod';
import loader from '../loader';

export const RequestData = z.object({
  schema: z.record(z.string().min(1), z.string()),
  dataset: z.record(z.string().min(1), z.any()).array(),
});

export async function handleRequest(request: Request) {
  const res = await request.json();
  const parsed = RequestData.safeParse(res);

  if (!parsed.success)
    return {
      error: parsed.error.format(),
    };

  const reqData = parsed.data;

  const dataset = loader(reqData.dataset, reqData.schema);
  return {
    schema: reqData.schema,
    dataset: dataset,
  };
}
