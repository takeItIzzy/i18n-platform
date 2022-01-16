import StatusCode from 'constants/statusCode';

interface ISuccess<data> {
  status: 'success';
  data: data;
  message?: never;
  code?: never;
}

interface IError {
  status: 'error';
  code: keyof typeof StatusCode;
  message: string;
  data?: never;
}

export type IAPIReturnMessage<data> = ISuccess<data> | IError;
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
      message: StatusCode[code],
    };
  }
  checkSuccess(res: IAPIReturnMessage<data>) {
    return res.status === 'success';
  }
}

export default APIReturnMessage;
