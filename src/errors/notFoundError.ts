import { StatusCodes } from 'http-status-codes';
import ApiError from './apiError';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class NotFoundError extends ApiError {
  constructor(message: string = ApiErrorMessage.NotFoundError) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.name = ApiErrorName.NotFoundError;
  }
}

export default NotFoundError;