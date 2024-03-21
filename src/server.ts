import express from 'express';
import taskRouter from './routes'

class Server {
  public server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', taskRouter);
  }
}

export default new Server().server;
