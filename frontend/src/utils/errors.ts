// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractErrorMessage = (err: any) => {
  const errMessage = err.graphQLErrors[0].extensions?.originalError?.message;
  
  if (Array.isArray(errMessage)) {
    return errMessage[0];
  } else {
    return errMessage;
  }
};

export { extractErrorMessage };
