import mongoose from 'mongoose';
import serverConfig from '../config/config';
import InternalServerError from '../errors/internalServerError';
import IORM from './interfaces/ORM';

class DataBase {
  private URL: string;
  private ORM: IORM;

  constructor(ORM: IORM, URL: string) {
    this.URL = URL;
    this.ORM = ORM;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URL);
    } catch (error) {
      await this.ORM.disconnect();
      throw new InternalServerError('Can not connect to database');
    }
  }
}

export default new DataBase(mongoose, serverConfig.MONGO_URI!);