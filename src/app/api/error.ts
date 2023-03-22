export function handleError(error: any) {
  const err = error as Error;

  if (err.name === 'SyntaxError') {
    return {
      error: {
        code: 422,
        name: 'UnprocessableContent',
        messsage: 'Your request data is invalid',
        cause: 'client',
      },
      status: 422,
    };
  }

  return {
    error: {
      code: 500,
      name: err.name,
      messsage: err.message,
      cause: err.cause,
    },
    status: 500,
  };
}
