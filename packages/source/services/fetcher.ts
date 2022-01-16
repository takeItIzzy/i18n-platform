import * as React from 'react';
import { IAPIReturnMessage } from './APIReturnMessage';

export const swrFetcher = (...args) => fetch.apply(null, args).then((res) => res.json());

const fetcher = async (path, method, payload) => {
  const { data } = payload;
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(method !== 'GET' && { body: JSON.stringify({ ...data }) }),
  });
  return response.json();
};

const useFetch = <data, res>(
  path,
  fetchParams
): {
  loading: boolean;
  response: IAPIReturnMessage<res>;
  onFetch: (payload: { data: data }) => Promise<IAPIReturnMessage<res>>;
} => {
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState(null);

  const { method } = fetchParams;

  return {
    loading,
    onFetch: React.useCallback(async (payload) => {
      setLoading(true);
      const r = await fetcher(path, method, payload);
      setLoading(false);
      setResponse(r);
      return r;
    }, []),
    response,
  };
};

export default useFetch;
