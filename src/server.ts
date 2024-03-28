import 'express-async-errors';
import express from 'express';
import taskRouter from './task/taskRoutes';
import userRouter from './user/userRoutes';
import categoryRoute from './category/categoryRoutes';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
import DataBase from './database/connectDB';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.database();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', taskRouter);
    this.server.use('/api/v1/', userRouter);
    this.server.use('/api/v1/', categoryRoute);
    this.server.use(ErrorHandlingMiddleware.errorHandler);
  }

  async database() {
    await DataBase.connect();
  }

}

export default new Server().server;
