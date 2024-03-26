import Document from 'mongoose';

interface taskDocument extends Document {
  userID: string;
}

export default taskDocument;