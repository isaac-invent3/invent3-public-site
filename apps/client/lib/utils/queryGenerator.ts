const generateQueryStr = (
  baseString: string,
  query: { [name: string]: any }
): string => {
  const queryString: string =
    baseString +
    Object.entries(query)
      .filter(
        // eslint-disable-next-line no-unused-vars
        ([_, value]) => value !== null && value !== '' && value !== undefined
      )
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  return queryString;
};

export { generateQueryStr };
