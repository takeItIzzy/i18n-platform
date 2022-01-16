import StatusCode from 'constants/statusCode';
import APIReturnMessage from 'services/APIReturnMessage';
import useFetch from 'services/fetcher';

interface IAuthData {
  email: string;
  password: string;
}
interface IAuthRes {
  token: string;
}
const useAuthSubmit = () => {
  const { loading: loginLoading, onFetch: onFetchLogin } = useFetch<IAuthData, IAuthRes>(
    '/api/login',
    {
      method: 'POST',
    }
  );
  const { loading: registerLoading, onFetch: onFetchRegister } = useFetch<IAuthData, IAuthRes>(
    '/api/register',
    {
      method: 'POST',
    }
  );

  const handleSubmit: (data: IAuthData) => void = async (data) => {
    const res = await onFetchLogin({ data });

    if (new APIReturnMessage().checkSuccess(res)) {
      sessionStorage.setItem('token', res.data.token);
    } else if (
      res.code === 'e_10002' &&
      confirm('email does not exist, will you create a new account?')
    ) {
      await onFetchRegister({ data });
    } else {
      alert(StatusCode[res.code]);
    }
  };

  return {
    loading: loginLoading || registerLoading,
    handleSubmit,
  };
};

export default useAuthSubmit;
