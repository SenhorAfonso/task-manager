import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userID: string
  };
};

export default AuthenticatedRequest;