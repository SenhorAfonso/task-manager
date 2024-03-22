import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";

class ErrorHandlingMiddleware {

  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

}

export default ErrorHandlingMiddleware;