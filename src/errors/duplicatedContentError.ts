import StatusCodes from 'http-status-codes';
import ApiError from './apiError';
import ApiErrorMessage from './enum/apiErrorMessage';
import ApiErrorName from './enum/apiErrorName';

class DuplicatedContentError extends ApiError {
  constructor(message: string = ApiErrorMessage.DuplicatedContentError) {
    super(message);
    this.name = ApiErrorName.DuplicatedContentError;
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export default DuplicatedContentError;