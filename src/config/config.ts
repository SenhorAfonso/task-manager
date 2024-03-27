import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGO_URI: process.env.MONGO_URI,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY
};

export default serverConfig;