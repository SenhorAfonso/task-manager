import { JwtPayload } from 'jsonwebtoken';

interface IJwtPayload extends JwtPayload {
  userID: string;
}

export default IJwtPayload;