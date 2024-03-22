import StatusCodes from 'http-status-codes';

class ApiError extends Error{
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'Internal Server Error';
  }
}

export default ApiError;