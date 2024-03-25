import mongoose from 'mongoose';
import server from './server';
import DataBase from './database/connectDB';
import serverConfig from './config/config';

class App {
  private port: number = Number(serverConfig.SERVER_PORT);

  constructor() {
    new DataBase(mongoose, serverConfig.MONGO_URI!).connect();
    this.start();
  }

  private start() {
    server.listen(this.port, () => {
      console.log(`server is listening at ${this.port} port!`);
    });
  }
}

new App();