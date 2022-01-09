interface ISuccess<data> {
  status: 'success';
  data: data;
  message?: never;
}

interface IError {
  status: 'error';
  message: string;
  data?: never;
}

class APIReturnMessage<data> {
  private status: 'success' | 'error';
  private message?: string;
  private data?: data;
  constructor({ status, message, data }: ISuccess<data> | IError) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default APIReturnMessage;
