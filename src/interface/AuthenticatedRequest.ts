import { Request } from 'express';

interface AuthenticateRequest extends Request {
  user?: {
    userID: string | undefined
  };
};

export default AuthenticateRequest;