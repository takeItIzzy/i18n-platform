import StatusCode from 'constants/statusCode';

interface ISuccess<data> {
  status: 'success';
  data: data;
  code?: never;
}

interface IError {
  status: 'error';
  code: keyof typeof StatusCode;
  data?: never;
}

class APIReturnMessage<data> {
  success(data): ISuccess<data> {
    return {
      status: 'success',
      data,
    };
  }
  error(code: keyof typeof StatusCode): IError {
    return {
      status: 'error',
      code,
    };
  }
}

export default APIReturnMessage;
