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
      res.status(error.status).json({ error: error.name });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

}

export default ErrorHandlingMiddleware;