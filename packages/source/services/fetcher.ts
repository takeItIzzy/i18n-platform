const fetcher = (...args) => fetch.apply(null, args).then((res) => res.json());

export default fetcher;
