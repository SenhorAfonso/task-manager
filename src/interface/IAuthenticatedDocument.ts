import { Document } from 'mongoose';

interface IAuthenticatedDocument extends Document {
  userID: string;
}

export default IAuthenticatedDocument;