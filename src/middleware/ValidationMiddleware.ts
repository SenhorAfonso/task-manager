import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import BadRequestError from '../errors/badRequestError';

class ValidationMiddleware {

  static ValidatePayload(
    JoiValidationObject: Joi.ObjectSchema,
    target: 'body' | 'query' | 'params'
  ) {

    return (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {

      const { error } = JoiValidationObject.validate(req[target], {
        abortEarly: false
      });

      if (error) {
        throw new BadRequestError();
      }

      return next();

    };

  }

}

export default ValidationMiddleware;