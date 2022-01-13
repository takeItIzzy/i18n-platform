import * as React from 'react';
import fetchAuth from 'services/auth';
import StatusCode from 'constants/statusCode';
import APIReturnMessage from 'services/APIReturnMessage';

const useAuthSubmit = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const res = await fetchAuth(data, 'login');
    setLoading(false);

    if (new APIReturnMessage().checkSuccess(res)) {
      sessionStorage.setItem('token', res.data.token);
    } else if (
      res.code === 'e_10002' &&
      confirm('username does not exist, will you create a new account?')
    ) {
      setLoading(true);
      await fetchAuth(data, 'register');
      setLoading(false);
    } else {
      alert(StatusCode[res.code]);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};

export default useAuthSubmit;
