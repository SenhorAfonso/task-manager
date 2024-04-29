import 'express-async-errors';
import express from 'express';
import SwaggerUi from 'swagger-ui-express';
import taskRouter from './task/taskRoutes';
import userRouter from './user/userRoutes';
import categoryRoute from './category/categoryRoutes';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
import swaggerDocs from '../swagger.json';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', taskRouter);
    this.server.use('/api/v1/', userRouter);
    this.server.use('/api/v1/', categoryRoute);
    this.server.use('/api/v1/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
    this.server.use(ErrorHandlingMiddleware.errorHandler);
  }

}

export default new Server().server;
