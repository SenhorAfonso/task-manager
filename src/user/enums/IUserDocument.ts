import { Document } from 'mongoose';

interface IUserDocument extends Document {
  password: string
}

export default IUserDocument;