export function extractResponse(
  response: any,
  schema: {
    dataset: string[] | null;
  }
) {
  let dataset: Record<string, any>[] = response;

  if (schema.dataset === null) return dataset;

  const data = Array.isArray(response) ? response[0] : response;
  if (!data) throw new Error('Invalid Response Data');

  const extracted = schema.dataset.reduce((acc, curr) => {
    acc = acc[curr];
    return acc;
  }, data);

  if (!extracted) return dataset;

  dataset = Array.isArray(extracted) ? extracted : [extracted];

  return dataset;
}
