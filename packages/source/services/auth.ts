const fetchAuth = (data, type: 'login' | 'register') =>
  fetch(`/api/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data }),
  }).then((res) => {
    return res.json();
  });

export default fetchAuth;
