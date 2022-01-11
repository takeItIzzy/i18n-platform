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
  status: 'success' | 'error';
  code?: keyof typeof StatusCode;
  data?: data;
  constructor({ status, code, data }: ISuccess<data> | IError) {
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export default APIReturnMessage;
