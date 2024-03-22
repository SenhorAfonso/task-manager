import StatusCodes from 'http-status-codes';
import ApiError from './apiError';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class BadRequestError extends ApiError {
  constructor(message: string = ApiErrorMessage.BadRequestError) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = ApiErrorName.BadRequestError;
  }
}

export default BadRequestError;