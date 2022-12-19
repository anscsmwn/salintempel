export const formattedParams = (isSortNew: boolean, isSortPopular: boolean) => {
  const params: {
    [key: string]: string;
  } = {
    sort: isSortNew ? 'new' : '',
    type: isSortPopular ? 'popular' : '',
  };

  // if params key is empty, return empty string and if not return params in format of query string
  return Object.keys(params).length === 0
    ? ''
    : `?${new URLSearchParams(params)}`;
};
