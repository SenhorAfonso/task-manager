import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGO_URI: process.env.MONGO_URI,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY,
  TEST_TOKEN_1: process.env.TEST_TOKEN_1,
  TEST_TOKEN_2: process.env.TEST_TOKEN_2
};

export default serverConfig;