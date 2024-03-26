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
    if (error instanceof ApiError) {
      const { name, message, status } = error;
      const success: boolean = false;

      res.status(status).json({ error: name, message, status, success });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.name, msg: error.message });
    }
  }

}

export default ErrorHandlingMiddleware;