import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGO_URI: process.env.MONGO_URI
};

export default serverConfig;