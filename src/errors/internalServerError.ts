import { StatusCodes } from 'http-status-codes';
import ApiError from './apiError';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class InternalServerError extends ApiError {
  constructor(message: string = ApiErrorMessage.InternalServerError) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = ApiErrorName.InternalServerError;
  }
}

export default InternalServerError;