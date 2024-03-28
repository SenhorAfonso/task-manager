import StatusCodes from 'http-status-codes';
import ApiError from './apiError';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class UnauthorizedAccessError extends ApiError {
  constructor(message: string = ApiErrorMessage.UnauthorizedAccessError) {
    super(message);
    this.name = ApiErrorName.UnauthorizedAccessError;
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedAccessError;