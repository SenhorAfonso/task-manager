import { NextFunction, Request, Response } from 'express';
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
    }
  }

}

export default ErrorHandlingMiddleware;