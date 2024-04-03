import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Joi from 'joi';
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
    } else if (error instanceof Joi.ValidationError) {
      const { type, errors } = ErrorHandlingMiddleware.formatJoiValidationErrors(error);

      res.status(StatusCodes.BAD_REQUEST).json({ success, type, errors });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success, error: { name: error.name, message: error.message } });
    }
  }

  static formatJoiValidationErrors(error: Joi.ValidationError) {
    const type = error.name;
    let errors: Array<{
      resource: string,
      message: string
    }> = [];

    errors = error.details.map(element => ({
      resource: element.path.toString(),
      message: element.message
    }));

    return { type, errors };
  }

}

export default ErrorHandlingMiddleware;