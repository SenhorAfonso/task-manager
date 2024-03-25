import StatusCodes from 'http-status-codes';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class ApiError extends Error{
  public status: number;

  constructor(message: string = ApiErrorMessage.InternalServerError) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = ApiErrorName.InternalServerError;
  }
}

export default ApiError;