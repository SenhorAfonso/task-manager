import 'express-async-errors';
import express from 'express';
import taskRouter from './task/taskRoutes';
import userRouter from './user/userRoutes';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';

class Server {
  public server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', taskRouter);
    this.server.use('/api/v1/', userRouter);
    this.server.use(ErrorHandlingMiddleware.errorHandler);
  }
}

export default new Server().server;
