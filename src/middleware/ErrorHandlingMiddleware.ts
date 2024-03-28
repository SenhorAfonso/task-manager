import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import ApiError from '../errors/apiError';

class ErrorHandlingMiddleware {

  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const success: boolean = false;
    if (error instanceof ApiError) {
      const { name, message, status } = error;

      res.status(status).json({ success, error: { name, message } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success, error: { name: error.name, message: error.message } });
    }
  }

}

export default ErrorHandlingMiddleware;