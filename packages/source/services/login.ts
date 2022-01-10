const fetchLogin = (data) =>
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.code === 200) {
        console.log(res);
      } else {
        alert(res.message);
      }
    });

export default fetchLogin;
