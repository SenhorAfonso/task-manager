import express from 'express';

class Server {
  public server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', (req, res) => {
      res.send('Server is up');
    });
  }
}

export default new Server().server;
