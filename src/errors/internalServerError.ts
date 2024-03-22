import { StatusCodes } from 'http-status-codes';
import ApiError from './apiError';

class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'Internal Server Error';
  }
}

export default InternalServerError;