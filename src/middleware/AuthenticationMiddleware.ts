import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';
import IJwtPayload from '../interface/AuthMiddleware/IJwtPayload';
import AuthenticateRequest from '../interface/AuthenticatedRequest';
import UnauthorizedAccessError from '../errors/unauthorizedAccessError';

class AuthenticationMiddleware{

  static AuthenticateToken (
    req: AuthenticateRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      throw new UnauthorizedAccessError('Unauthenticated!');
    }

    const token = authHeader!.split(' ')[1];

    try {
      const { userID } = jwt.verify(token, serverConfig.JWT_SECRETE_KEY!) as IJwtPayload;
      req.user = { userID };
      next();
    } catch (error) {
      throw new Error('Unauthenticated!');
    }

  }

  static authHeaderIsNotValid(authHeader: string | undefined): boolean {
    return !authHeader || !authHeader.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;